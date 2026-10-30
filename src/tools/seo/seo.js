import { isOwn } from '@/lib/page'
import { isOwnRequest, ownFetch } from '@/lib/requests'

import { richResults } from './rich-results'

// The SEO panel's workings, apart from its UI (SeoPanel.vue): a page read for
// what a search engine and an SEO analyst look at first — indexing, canonical,
// title and description, hreflang, headings, social cards, structured data,
// links and images — with what looks wrong collected as issues.
//
// The page is read one of two ways: as the server sends it (fetched again:
// what a crawler gets, with the status and the X-Robots-Tag header, and right
// after a client-side navigation, where the live <head> may still be the first
// page's), or as it is now in the browser (its elements can then be outlined).

// What was read, kept while the page lives, so the panel opens on it again
// without fetching: the reports by source and address ({ report, alternates,
// at }), robots.txt, and the sitemaps' entries. Refresh reads again.
export const cache = {
  reports: new Map(),
  robotsTxt: null,
  sitemaps: null
}

// the usual guides, in characters
export const TITLE_LENGTH = [ 30, 60 ]
export const DESCRIPTION_LENGTH = [ 70, 160 ]

// `en`, `en-US`, `zh-Hant-TW`, `x-default`
const LANG_CODE = /^(x-default|[a-z]{2,3}(-[A-Za-z]{4})?(-([A-Z]{2}|\d{3}))?)$/

export const text = element => element?.textContent.replace(/\s+/g, ' ').trim() ?? ''

export const HEADINGS = 'h1, h2, h3, h4, h5, h6'
export const HREFLANG = 'link[rel="alternate" i][hreflang]'
const meta = (doc, attribute, name) => doc.querySelector(`meta[${attribute}="${name}" i]`)?.getAttribute('content')?.trim() ?? null

// the address without its fragment, for comparing
const normalise = (href, base) => {
  try {
    const url = new URL(href, base)

    url.hash = ''

    return url.href
  } catch {
    return href
  }
}

/* -------------------------------------------------------------------------- */
/* Reading                                                                    */
/* -------------------------------------------------------------------------- */

// The page's address as a crawler has it: without the params the site said
// are its own (init({ seo: { ignoreParams } }): its dev tools' switch, say,
// which would make the page noindex), nor the fragment
export function pageUrl (ignoreParams = []) {
  const url = new URL(location.href)

  ignoreParams.forEach(param => url.searchParams.delete(param))
  url.hash = ''

  return url.href
}

// The page as the server sends it, or as it is: { doc, url, status, headers,
// redirected, live }; { error } when the fetch fails. Fetched, and compared
// with its canonical, at its address without the params to ignore.
export async function readPage (source, ignoreParams = []) {
  const url = pageUrl(ignoreParams)

  if (source === 'rendered') return {
    doc: document, url, status: null, headers: null, redirected: false, live: true
  }

  try {
    const response = await ownFetch(url, { cache: 'no-store', credentials: 'same-origin' })
    const doc = new DOMParser().parseFromString(await response.text(), 'text/html')

    return {
      doc,
      url: response.url || url,
      requested: url,
      status: response.status,
      headers: response.headers,
      redirected: response.redirected,
      live: false
    }
  } catch (error) {
    return { error: error.message || 'The page could not be fetched' }
  }
}

// robots.txt, read once per panel opening: its groups and sitemaps
export async function readRobotsTxt () {
  try {
    const response = await ownFetch('/robots.txt', { cache: 'no-store' })

    if (!response.ok) return {
      found: false, status: response.status, groups: [], sitemaps: []
    }

    return {
      found: true, status: response.status, ...parseRobotsTxt(await response.text())
    }
  } catch {
    return {
      found: false, status: null, groups: [], sitemaps: []
    }
  }
}

// The sitemaps' entries, for the hreflang a site lists there and not in the
// page's head (WPML's SEO add-on, with Yoast's sitemaps, moves it there): each
// address to its alternates and the file listing it, read from the sitemaps
// robots.txt names (else the usual places), an index followed to its files;
// null when none answers
const SITEMAP_FALLBACKS = [ '/sitemap_index.xml', '/wp-sitemap.xml' ]
const XHTML = 'http://www.w3.org/1999/xhtml'
const MAX_SITEMAPS = 200

export async function readSitemaps (sitemaps = []) {
  const entries = new Map()
  const seen = new Set()
  let found = false

  const read = async (href, depth) => {
    const url = normalise(href, location.href)

    if (seen.has(url) || seen.size >= MAX_SITEMAPS || depth > 2) return

    seen.add(url)

    try {
      const response = await ownFetch(url, { cache: 'no-store', credentials: 'same-origin' })

      if (!response.ok) return

      const doc = new DOMParser().parseFromString(await response.text(), 'application/xml')

      if (doc.querySelector('parsererror')) return

      found = true

      ;[ ...doc.getElementsByTagNameNS('*', 'url') ].forEach(entry => {
        const loc = text(entry.getElementsByTagNameNS('*', 'loc')[0])
        const alternates = [ ...entry.getElementsByTagNameNS(XHTML, 'link') ]
          .filter(link => /\balternate\b/i.test(link.getAttribute('rel') ?? '') && link.hasAttribute('hreflang'))
          .map(link => ({ lang: link.getAttribute('hreflang'), href: normalise(link.getAttribute('href'), url) }))

        if (loc) entries.set(normalise(loc, url), { alternates, sitemap: url })
      })

      // an index: its sitemaps
      const children = [ ...doc.getElementsByTagNameNS('*', 'sitemap') ]
        .map(sitemap => text(sitemap.getElementsByTagNameNS('*', 'loc')[0]))
        .filter(Boolean)

      await Promise.all(children.map(child => read(child, depth + 1)))
    } catch {}
  }

  await Promise.all((sitemaps.length ? sitemaps : SITEMAP_FALLBACKS).map(sitemap => read(sitemap, 0)))

  return found ? entries : null
}

// Its groups: the user agents of each and their Allow / Disallow rules
export function parseRobotsTxt (body) {
  const groups = []
  const sitemaps = []
  let group = null
  let lastWasAgent = false

  body.split(/\r?\n/).forEach(line => {
    const [
      , field,
      value
    ] = line.replace(/#.*/, '').match(/^\s*([\w-]+)\s*:\s*(.*?)\s*$/) ?? []

    if (!field) return

    const name = field.toLowerCase()

    if (name === 'sitemap') {
      sitemaps.push(value)

      return
    }

    if (name === 'user-agent') {
      if (!lastWasAgent) {
        group = { agents: [], rules: [] }
        groups.push(group)
      }

      group.agents.push(value.toLowerCase())
      lastWasAgent = true

      return
    }

    lastWasAgent = false

    if (group && (name === 'allow' || name === 'disallow')) group.rules.push({ allow: name === 'allow', path: value })
  })

  return { groups, sitemaps }
}

// Whether robots.txt keeps `agent` off the path: the group naming it, or *;
// the longest matching rule wins, Allow on a tie (as Google reads it)
export function robotsBlock ({ groups }, path, agent = 'googlebot') {
  const group = groups.find(g => g.agents.includes(agent)) ?? groups.find(g => g.agents.includes('*'))

  if (!group) return null

  const matching = group.rules
    .filter(rule => rule.path !== '' && pathMatches(rule.path, path))
    .sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow))

  return matching[0] && !matching[0].allow ? matching[0] : null
}

// `*` any run of characters, a trailing `$` the end
function pathMatches (pattern, path) {
  const source = pattern
    .replace(/[.+?^{}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/\\\$$|\$$/, '$')

  return new RegExp(`^${source}`).test(path)
}

/* -------------------------------------------------------------------------- */
/* The report                                                                 */
/* -------------------------------------------------------------------------- */

export function analyse ({
  doc, url, requested, status, headers, redirected, live
}, robotsTxt, sitemaps = null) {
  const issues = []
  const issue = (level, message) => issues.push({ level, message })
  const absolute = href => normalise(href, url)

  // indexing
  const robotsMeta = meta(doc, 'name', 'robots')
  const googlebotMeta = meta(doc, 'name', 'googlebot')
  const robotsHeader = headers?.get('x-robots-tag') ?? null
  const directives = [
    robotsMeta,
    googlebotMeta,
    robotsHeader
  ].filter(Boolean).join(',').toLowerCase()
  const noindex = /\b(noindex|none)\b/.test(directives)
  const nofollow = /\b(nofollow|none)\b/.test(directives)
  const path = (() => {
    try {
      const parsed = new URL(url)

      return parsed.pathname + parsed.search
    } catch {
      return '/'
    }
  })()
  const blockedBy = robotsTxt?.found ? robotsBlock(robotsTxt, path) : null

  if (status !== null && status !== 200) issue(status >= 400 ? 'error' : 'warning', `The page answers ${status}`)
  if (redirected) issue('warning', `Redirected from ${requested}`)
  if (noindex) issue('error', 'Not indexable: noindex')
  if (nofollow) issue('warning', 'Its links are not followed: nofollow')
  if (blockedBy) issue('error', `Blocked by robots.txt: Disallow ${blockedBy.path}`)

  // canonical
  const canonicals = [ ...doc.querySelectorAll('link[rel="canonical" i]') ].map(link => link.getAttribute('href'))
  const canonical = canonicals[0] ? absolute(canonicals[0]) : null
  const canonicalState = !canonicals.length ? 'missing' : canonicals.length > 1 ? 'multiple' : canonical === normalise(url) ? 'self' : 'other'

  if (canonicalState === 'missing') issue('warning', 'No canonical')
  if (canonicalState === 'multiple') issue('error', `${canonicals.length} canonicals`)
  if (canonicalState === 'other') issue('warning', 'Canonical points to another URL')

  // title and description
  const titles = doc.querySelectorAll('head title')
  const title = text(titles[0])
  const description = meta(doc, 'name', 'description')

  if (!title) issue('error', 'No title')
  else if (title.length > TITLE_LENGTH[1]) issue('warning', `Title is long: ${title.length} characters`)
  else if (title.length < TITLE_LENGTH[0]) issue('warning', `Title is short: ${title.length} characters`)
  if (titles.length > 1) issue('warning', `${titles.length} titles`)

  if (!description) issue('warning', 'No meta description')
  else if (description.length > DESCRIPTION_LENGTH[1]) issue('warning', `Description is long: ${description.length} characters`)
  else if (description.length < DESCRIPTION_LENGTH[0]) issue('warning', `Description is short: ${description.length} characters`)

  // hreflang: the head's, else the sitemap's entry for the page (listed at its canonical)
  const inHead = [ ...doc.querySelectorAll(HREFLANG) ].map(link => ({ lang: link.getAttribute('hreflang'), href: link.getAttribute('href') }))
  const listed = sitemaps?.get(canonical ?? normalise(url)) ?? sitemaps?.get(normalise(url))
  const hreflangFrom = inHead.length ? 'head' : listed?.alternates.length ? 'sitemap' : null
  const hreflang = (hreflangFrom === 'sitemap' ? listed.alternates : inHead).map(alternate => {
    const href = absolute(alternate.href)

    return {
      lang: alternate.lang,
      href,
      self: href === normalise(url) || href === canonical,
      valid: LANG_CODE.test(alternate.lang)
    }
  })

  if (hreflang.length) {
    if (!hreflang.some(alternate => alternate.self)) issue('warning', 'Hreflang does not list this page itself')
    if (!hreflang.some(alternate => alternate.lang === 'x-default')) issue('warning', 'Hreflang has no x-default')
    hreflang.filter(alternate => !alternate.valid).forEach(alternate => issue('warning', `Hreflang code not valid: ${alternate.lang}`))

    const langs = hreflang.map(alternate => alternate.lang.toLowerCase())

    ;[ ...new Set(langs.filter((lang, index) => langs.indexOf(lang) !== index)) ].forEach(lang => issue('warning', `Hreflang ${lang} listed twice`))
  }

  // headings, the page's own (not the app's)
  const headings = [ ...doc.querySelectorAll(HEADINGS) ]
    .filter(element => !live || !isOwn(element))
    .map(element => ({
      level: Number(element.localName[1]), text: text(element), element: live ? element : null
    }))
  const h1s = headings.filter(heading => heading.level === 1)

  if (!h1s.length) issue('error', 'No H1')
  if (h1s.length > 1) issue('warning', `${h1s.length} H1s`)
  headings.forEach((heading, index) => {
    const previous = headings[index - 1]

    heading.skipped = !!previous && heading.level > previous.level + 1
  })
  if (headings.some(heading => heading.skipped)) issue('warning', 'Heading levels are skipped')

  // social
  const og = Object.fromEntries([ ...doc.querySelectorAll('meta[property^="og:"]') ].map(element => [ element.getAttribute('property'), element.getAttribute('content') ]))
  const twitter = Object.fromEntries([ ...doc.querySelectorAll('meta[name^="twitter:"]') ].map(element => [ element.getAttribute('name'), element.getAttribute('content') ]))

  if (!og['og:title']) issue('info', 'No og:title')
  if (!og['og:image']) issue('warning', 'No og:image: shared links show no picture')

  // structured data
  const jsonLd = [ ...doc.querySelectorAll('script[type="application/ld+json"]') ].map(script => {
    try {
      const data = JSON.parse(script.textContent)
      const nodes = [ data, ...(Array.isArray(data['@graph']) ? data['@graph'] : []) ].flat()
      const types = [ ...new Set(nodes.flatMap(node => [].concat(node?.['@type'] ?? []))) ]

      return { data, types }
    } catch (error) {
      issue('error', 'A JSON-LD block does not parse')

      return { error: error.message, source: script.textContent.trim().slice(0, 500) }
    }
  })

  // what Google could make of it
  const lang = doc.documentElement.getAttribute('lang')
  const rich = richResults(jsonLd.filter(block => !block.error).map(block => block.data), {
    doc, url, canonical, lang, og
  })

  rich.issues.forEach(message => issue('warning', message))

  // links and images, in the page's body
  const origin = new URL(url).origin
  const anchors = [ ...doc.querySelectorAll('body a[href]') ].filter(element => !live || !isOwn(element))
  const internal = []
  const external = []
  const nofollowLinks = []

  anchors.forEach(anchor => {
    const href = anchor.getAttribute('href')

    if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return

    const rel = (anchor.getAttribute('rel') ?? '').toLowerCase()

    ;(absolute(href).startsWith(origin) ? internal : external).push(anchor)
    if (/\b(nofollow|ugc|sponsored)\b/.test(rel)) nofollowLinks.push({
      href: absolute(href), rel, text: text(anchor), element: live ? anchor : null
    })
  })

  const images = [ ...doc.querySelectorAll('body img') ].filter(element => !live || !isOwn(element))
  const noAlt = images.filter(image => !image.hasAttribute('alt'))

  if (noAlt.length) issue('warning', `${noAlt.length} image${noAlt.length === 1 ? '' : 's'} without alt`)

  // the rest of the head
  if (!lang) issue('warning', 'No lang on <html>')

  return {
    url,
    status,
    redirected,
    requested,
    live,
    indexing: {
      robotsMeta,
      googlebotMeta,
      robotsHeader,
      noindex,
      nofollow,
      robotsTxt: robotsTxt ? {
        found: robotsTxt.found, blockedBy, sitemaps: robotsTxt.sitemaps
      } : null
    },
    canonical: {
      href: canonical, all: canonicals.map(absolute), state: canonicalState
    },
    title: { value: title, length: title.length },
    description: { value: description, length: description?.length ?? 0 },
    hreflang,
    hreflangSource: {
      from: hreflangFrom, sitemap: hreflangFrom === 'sitemap' ? listed.sitemap : null, sitemapsRead: sitemaps !== null
    },
    headings,
    og,
    twitter,
    jsonLd,
    rich,
    links: {
      internal: internal.length, external: external.length, nofollow: nofollowLinks
    },
    images: {
      total: images.length, noAlt: live ? noAlt : noAlt.map(() => null), emptyAlt: images.filter(image => image.getAttribute('alt') === '').length
    },
    lang,
    viewport: meta(doc, 'name', 'viewport'),
    charset: doc.characterSet || doc.querySelector('meta[charset]')?.getAttribute('charset') || null,
    prev: doc.querySelector('link[rel="prev" i]')?.getAttribute('href') ?? null,
    next: doc.querySelector('link[rel="next" i]')?.getAttribute('href') ?? null,
    issues: issues.sort((a, b) => [
      'error',
      'warning',
      'info'
    ].indexOf(a.level) - [
      'error',
      'warning',
      'info'
    ].indexOf(b.level))
  }
}

/* -------------------------------------------------------------------------- */
/* Weight                                                                     */
/* -------------------------------------------------------------------------- */

// what a file is, from how it was asked for and its extension
const KINDS = [
  { kind: 'fonts', test: (entry, ext) => /^(woff2?|ttf|otf|eot)$/.test(ext) },
  { kind: 'styles', test: (entry, ext) => /^(css|scss|sass|less)$/.test(ext) || (entry.initiatorType === 'link' && !ext) },
  { kind: 'scripts', test: (entry, ext) => entry.initiatorType === 'script' || /^(m?js|ts|vue)$/.test(ext) },
  { kind: 'images', test: (entry, ext) => [ 'img', 'image' ].includes(entry.initiatorType) || /^(avif|webp|jpe?g|png|gif|svg|ico)$/.test(ext) },
  { kind: 'media', test: (entry, ext) => [ 'video', 'audio' ].includes(entry.initiatorType) || /^(mp4|webm|m3u8|ts|mp3|ogg)$/.test(ext) },
  {
    kind: 'data', test: entry => [
      'fetch',
      'xmlhttprequest',
      'beacon'
    ].includes(entry.initiatorType)
  }
]

export const KIND_LABELS = {
  document: 'HTML', scripts: 'Scripts', styles: 'Styles', fonts: 'Fonts', images: 'Images', media: 'Media', data: 'Data', other: 'Other'
}

const kindOf = entry => {
  let ext = ''

  try {
    ext = new URL(entry.name).pathname.match(/\.(\w+)$/)?.[1].toLowerCase() ?? ''
  } catch {}

  return KINDS.find(({ test }) => test(entry, ext))?.kind ?? 'other'
}

// A response's sizes, as Resource Timing has them: over the network (0 from
// the cache), compressed, and uncompressed; nothing for another origin's
// file that does not allow it (Timing-Allow-Origin)
const sizesOf = entry => ({
  transferred: entry?.transferSize ?? 0,
  encoded: entry?.encodedBodySize ?? 0,
  decoded: entry?.decodedBodySize ?? 0
})

// What the page weighs: its HTML — the clean copy fetched for the report
// (`html`) and this load's (`load`, with the dev tools in it) — and every
// file it has downloaded so far, by kind; the dev tools' own left out.
// Lazy files come as the page scrolls: Refresh counts them.
export function readWeight (fetchedUrl = null) {
  const navigation = performance.getEntriesByType('navigation')[0]
  const fetched = fetchedUrl ? performance.getEntriesByName(fetchedUrl).filter(entry => entry.initiatorType === 'fetch').at(-1) : null
  const entries = performance.getEntriesByType('resource').filter(entry => !isOwnRequest(entry.name))
  const kinds = {}
  let unsized = 0
  // answered with an error: still downloaded, often a whole error page
  const failed = []

  entries.forEach(entry => {
    const kind = kindOf(entry)
    const sizes = sizesOf(entry)

    kinds[kind] ??= {
      kind, count: 0, transferred: 0, encoded: 0, files: []
    }
    kinds[kind].count++
    kinds[kind].transferred += sizes.transferred
    kinds[kind].encoded += sizes.encoded
    kinds[kind].files.push({
      url: entry.name, ...sizes, status: entry.responseStatus ?? null
    })

    // another origin's file, its sizes withheld
    if (!sizes.encoded && !sizes.transferred && entry.responseStatus !== 304) unsized++
    if (entry.responseStatus >= 400) failed.push({
      url: entry.name, status: entry.responseStatus, bytes: sizes.encoded
    })
  })

  // the kinds, heaviest first, and in each its files the same way
  const list = Object.values(kinds).sort((a, b) => b.encoded - a.encoded)

  list.forEach(kind => kind.files.sort((a, b) => b.encoded - a.encoded))

  return {
    html: fetched ? sizesOf(fetched) : null,
    load: navigation ? sizesOf(navigation) : null,
    kinds: list,
    total: {
      count: entries.length,
      transferred: list.reduce((sum, kind) => sum + kind.transferred, 0),
      encoded: list.reduce((sum, kind) => sum + kind.encoded, 0)
    },
    unsized,
    failed,
    // the Vite dev server: unbundled, unminified modules, nothing like production
    devServer: entries.some(entry => entry.name.includes('/@vite/client'))
  }
}

// Each alternate fetched: its status, and whether it lists this page back, in
// its head or, the hreflang read from the sitemaps, in its sitemap entry
export async function checkAlternates ({
  hreflang, hreflangSource, url, canonical
}, sitemaps = null) {
  const selves = [ normalise(url), canonical.href ].filter(Boolean)
  const listsBack = hrefs => hrefs.some(href => selves.includes(href))

  return Promise.all(hreflang.map(async alternate => {
    if (alternate.self) return {
      ...alternate, status: 'self', back: true
    }

    try {
      if (new URL(alternate.href).origin !== location.origin) return {
        ...alternate, status: 'other site', back: null
      }

      const response = await ownFetch(alternate.href, { cache: 'no-store', credentials: 'same-origin' })
      const back = hreflangSource.from === 'sitemap'
        ? listsBack((sitemaps?.get(alternate.href)?.alternates ?? []).map(link => link.href))
        : listsBack([ ...new DOMParser().parseFromString(await response.text(), 'text/html').querySelectorAll(HREFLANG) ].map(link => normalise(link.getAttribute('href'), response.url)))

      return {
        ...alternate, status: response.status, back
      }
    } catch {
      return {
        ...alternate, status: 'failed', back: null
      }
    }
  }))
}
