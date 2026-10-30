import { isOwn } from '@/lib/page'
import { ownFetch } from '@/lib/requests'

// The images panel's workings, apart from its UI (ImagesPanel.vue): every
// <img> on the page, read for what decides its weight and its sharpness —
// what it was asked to be (its box, at the screen's density) against what it
// is (its intrinsic size), which srcset candidate the browser took, its
// format and its bytes, how it loads — and what looks wrong with it.
//
// Lazy loading by script is read as the common convention has it (lazysizes
// and the like): the addresses wait in data-src / data-srcset, on the <img>
// and its <picture>'s <source>s, until the image comes into view.

// over this many times the pixels its box needs: oversized; under this, blurry
export const OVERSIZED = 1.5
export const BLURRY = 0.9

const FORMATS = {
  avif: 'avif', webp: 'webp', jpg: 'jpg', jpeg: 'jpg', png: 'png', gif: 'gif', svg: 'svg'
}

// the format from the address: its extension, or a data URI's type
export function formatOf (src) {
  if (!src) return null

  const data = src.match(/^data:image\/([\w+.-]+)/)

  if (data) return FORMATS[data[1].replace('svg+xml', 'svg')] ?? data[1]

  try {
    const extension = new URL(src, location.href).pathname.match(/\.(\w+)$/)?.[1].toLowerCase()

    return FORMATS[extension] ?? extension ?? null
  } catch {
    return null
  }
}

// the file name, for the list
export const fileOf = src => {
  if (!src) return ''
  if (src.startsWith('data:')) return 'data URI'

  try {
    return decodeURIComponent(new URL(src, location.href).pathname.split('/').pop())
  } catch {
    return src
  }
}

const srcsetOf = element => element.getAttribute('srcset') || element.dataset.srcset || ''

// Every candidate it has: its <picture>'s sources' (each with its type and
// media), then its own; { url, descriptor, type, media, chosen }. Within a
// format, smallest first: by `w`, or by `x`
function candidatesOf (image) {
  const picture = image.parentElement?.localName === 'picture' ? image.parentElement : null
  const sources = [ ...(picture ? picture.querySelectorAll('source') : []), image ]
  const formats = []

  const candidates = sources.flatMap(source => srcsetOf(source).split(/,\s+(?=\S)/).map(part => part.trim()).filter(Boolean).map(part => {
    const [ url, descriptor = '' ] = part.split(/\s+/)
    let absolute = url

    try {
      absolute = new URL(url, location.href).href
    } catch {}

    return {
      url: absolute,
      descriptor,
      type: source.getAttribute('type')?.replace('image/', '') ?? null,
      media: source.getAttribute('media'),
      chosen: absolute === image.currentSrc
    }
  }))

  // the formats in the order they first come, which is the browser's
  candidates.forEach(candidate => formats.includes(candidate.type) || formats.push(candidate.type))

  return candidates.sort((a, b) => formats.indexOf(a.type) - formats.indexOf(b.type) || (parseFloat(a.descriptor) || 1) - (parseFloat(b.descriptor) || 1))
}

// A `sizes` value in px, as the browser reads it: the first entry whose media
// condition matches, its length resolved by CSS (vw, calc(), …); none, or
// `auto`, is the box's own width
function sizesWidth (sizes, image) {
  const parts = (sizes || '').split(/,(?![^(]*\))/).map(part => part.trim()).filter(Boolean)

  for (const part of parts) {
    const [
      , media,
      length
    ] = part.match(/^(\(.*\))\s+(.+)$/) ?? [
      null,
      null,
      part
    ]

    if (media && !window.matchMedia(media).matches) continue
    if (length === 'auto') break

    const probe = document.createElement('div')

    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${length}`
    document.body.append(probe)

    const width = probe.getBoundingClientRect().width

    probe.remove()

    if (width) return width
  }

  return image.getBoundingClientRect().width || window.innerWidth
}

// What the browser will take for a waiting image, once its addresses are in
// place: its <picture>'s first source whose media matches (else the image),
// and of its candidates the smallest wide enough for `sizes` at the screen's
// density (by `w`), or the density nearest above the screen's (by `x`)
function expectedOf (image) {
  const picture = image.parentElement?.localName === 'picture' ? image.parentElement : null
  const source = [ ...(picture ? picture.querySelectorAll('source') : []) ]
    .find(element => srcsetOf(element) && (!element.media || window.matchMedia(element.media).matches)) ?? image
  const candidates = srcsetOf(source).split(/,\s+(?=\S)/).map(part => part.trim()).filter(Boolean).map(part => {
    const [ url, descriptor = '1x' ] = part.split(/\s+/)

    return {
      url, width: descriptor.endsWith('w') ? parseFloat(descriptor) : null, density: descriptor.endsWith('x') ? parseFloat(descriptor) : null
    }
  })

  if (!candidates.length) return null

  const density = window.devicePixelRatio || 1
  const byWidth = candidates.filter(candidate => candidate.width).sort((a, b) => a.width - b.width)

  if (byWidth.length) {
    const needed = sizesWidth(source.getAttribute('sizes') || image.getAttribute('sizes'), image) * density

    return new URL((byWidth.find(candidate => candidate.width >= needed) ?? byWidth.at(-1)).url, location.href).href
  }

  const byDensity = candidates.filter(candidate => candidate.density).sort((a, b) => a.density - b.density)

  return new URL((byDensity.find(candidate => candidate.density >= density) ?? byDensity.at(-1) ?? candidates[0]).url, location.href).href
}

// waiting for a script to give it its address
const pendingOf = image => !image.currentSrc && !image.getAttribute('src')
  && !!(image.dataset.src || image.dataset.srcset || image.parentElement?.querySelector('source[data-srcset]'))

// bytes, as the browser fetched it: 0 where it cannot say (a cross-origin
// file without Timing-Allow-Origin, one from the memory cache)
function bytesOf (src) {
  if (!src || src.startsWith('data:')) return null

  const url = new URL(src, location.href).href
  const entry = performance.getEntriesByName(url).at(-1)

  return (entry && (entry.encodedBodySize || entry.transferSize)) || headSizes.get(url) || null
}

// What Resource Timing could not say — its list full (250 entries by
// default, soon spent by a dev server's modules), a file from the memory
// cache — asked of the server: a HEAD request's Content-Length, from the
// cache where it can, once per file (null while asked, or when it cannot say).
const headSizes = new Map()

// Fills in the weights missing: a loaded image's file (bytes), and, for one
// still waiting, the file shown for it (expectedBytes: what it would weigh,
// not counted in the page's total). Whether anything changed.
export async function fillSizes (images) {
  const urlOf = image => new URL(image.src, location.href).href
  const wanted = images.filter(image => image.bytes === null && image.src && !image.placeholder)
  const missing = [ ...new Set(wanted.map(urlOf)) ].filter(url => !headSizes.has(url))

  await Promise.all(missing.map(async url => {
    headSizes.set(url, null)

    try {
      const response = await ownFetch(url, {
        method: 'HEAD', cache: 'force-cache', credentials: 'same-origin'
      })
      const length = Number(response.headers.get('content-length'))

      headSizes.set(url, length > 0 ? length : null)
    } catch {}
  }))

  let changed = false

  wanted.forEach(image => {
    const bytes = headSizes.get(urlOf(image))

    if (!bytes) return

    if (image.pending) {
      image.expectedBytes = bytes
    } else {
      image.bytes = bytes
      image.bytesFrom = 'server'
      image.wasted = wastedOf(bytes, image.ratio)
    }

    changed = true
  })

  return changed
}

// roughly what a file sized for its box would weigh less, by area
const wastedOf = (bytes, ratio) => (bytes && ratio > OVERSIZED ? Math.round(bytes * (1 - 1 / (ratio * ratio))) : 0)

export function readImages (lcpElement = null) {
  const density = window.devicePixelRatio || 1

  return [ ...document.querySelectorAll('img') ].filter(image => !isOwn(image)).map((image, index) => {
    const rect = image.getBoundingClientRect()
    const shown = rect.width > 0 && rect.height > 0
    const pending = pendingOf(image)
    // waiting: the candidate the browser will take once it has them
    const src = image.currentSrc || image.src || (pending ? expectedOf(image) || image.dataset.src : '') || ''
    const loaded = image.complete && image.naturalWidth > 0
    const format = formatOf(src)
    const placeholder = src.startsWith('data:')
    const needed = { width: Math.round(rect.width * density), height: Math.round(rect.height * density) }
    // the image's own pixels for its box's: by width, what srcset and sizes decide
    const ratio = loaded && shown && format !== 'svg' ? image.naturalWidth / needed.width : null
    // what this image fetched: nothing yet while it waits
    const bytes = pending ? null : bytesOf(src)
    const aboveFold = shown && rect.top + window.scrollY < window.innerHeight
    const lazy = image.getAttribute('loading') === 'lazy' ? 'lazy' : pending || image.hasAttribute('data-src') || image.hasAttribute('data-srcset') ? 'lazy (script)' : null
    const issues = []

    if (image.complete && !loaded && !pending && src && !placeholder) issues.push({
      key: 'broken', label: 'broken', level: 'error'
    })
    if (ratio !== null && ratio > OVERSIZED && image.naturalWidth - needed.width > 200) issues.push({
      key: 'oversized', label: `oversized ×${ratio.toFixed(1)}`, level: 'warning'
    })
    if (ratio !== null && ratio < BLURRY) issues.push({
      key: 'blurry', label: `blurry ×${ratio.toFixed(2)}`, level: 'warning'
    })
    if (lazy && aboveFold) issues.push({
      key: 'lazy-fold', label: 'lazy above the fold', level: 'warning'
    })
    if (!image.hasAttribute('alt')) issues.push({
      key: 'alt', label: 'no alt', level: 'warning'
    })

    const wasted = wastedOf(bytes, ratio)

    return {
      index,
      element: image,
      src,
      file: fileOf(src),
      format,
      placeholder,
      loaded,
      pending,
      shown,
      natural: { width: image.naturalWidth, height: image.naturalHeight },
      rendered: { width: Math.round(rect.width), height: Math.round(rect.height) },
      needed,
      density,
      ratio,
      bytes,
      wasted,
      lazy,
      aboveFold,
      lcp: image === lcpElement,
      attributes: {
        src: image.getAttribute('src'),
        sizes: image.getAttribute('sizes'),
        loading: image.getAttribute('loading'),
        decoding: image.getAttribute('decoding'),
        fetchpriority: image.getAttribute('fetchpriority'),
        alt: image.getAttribute('alt')
      },
      candidates: candidatesOf(image),
      issues
    }
  })
}

// The page's Largest Contentful Paint element, as the browser reported it
// (buffered: from the page load on). Watched from the app's start, as the
// entries come only while the page has not been interacted with.
let lcpElement = null

export function watchLcp () {
  // room for the page's resources, the images among them, from now on
  try {
    performance.setResourceTimingBufferSize(5000)
  } catch {}

  if (!('PerformanceObserver' in window)) return

  try {
    new PerformanceObserver(list => {
      const last = list.getEntries().at(-1)

      if (last?.element) lcpElement = last.element
    }).observe({ type: 'largest-contentful-paint', buffered: true })
  } catch {}
}

export const lcp = () => lcpElement
