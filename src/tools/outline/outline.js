// The outline's workings, apart from its UI (OutlinePanel.vue): the page's
// HTML as a tree. Only the tags that say something about the content are kept
// (SEMANTIC); the others — div, span, custom elements, … — are skipped, their
// children hoisted into the nearest kept ancestor. Every tag is shown bare,
// but for the attributes in KEPT, on the tags they are listed for. Text is
// kept, whitespace collapsed; script, style and the like are left out whole,
// as are aria-hidden elements, the app itself and what the site said to leave
// out (init({ ignore })). The Divs toggle keeps the divs too; the Hidden one
// the elements that render no box.

import { isOwn } from '@/lib/page'

// the elements folded shut in the panel, kept across refreshes and openings
export const folded = new WeakSet()

const tags = list => new Set(list.trim().split(/\s+/))

export const SEMANTIC = tags(`
  body
  header nav main footer aside section article search address hgroup
  h1 h2 h3 h4 h5 h6
  p blockquote figure figcaption hr pre ul ol li dl dt dd details summary dialog menu
  a em strong small s cite q dfn abbr time code kbd samp var sub sup mark del ins br
  img picture video audio iframe svg canvas object
  table caption thead tbody tfoot tr th td
  form fieldset legend label input button select option optgroup textarea output progress meter
`)

// left out with everything inside
export const IGNORED = tags('script style template noscript link meta source track')

// shown as a leaf: what is inside is not the page's content. Not picture:
// its <img> is (its <source>s are IGNORED)
export const OPAQUE = tags('svg canvas iframe object video audio select textarea')

// the attributes kept, by tag; `*` on every tag
export const KEPT = {
  '*': [ 'aria-label' ],
  'a': [ 'href' ],
  'img': [ 'alt' ]
}

// [[name, value]]: the element's attributes in KEPT, those it has
const attributesOf = (element, tag) => [ ...KEPT['*'], ...(KEPT[tag] || []) ]
  .filter(name => element.hasAttribute(name))
  .map(name => [ name, element.getAttribute(name) ])

// `<tag name="value">`, quotes in values escaped
export const openTag = item => `<${item.tag}${item.attributes.map(([ name, value ]) => ` ${name}="${value.replaceAll('"', '&quot;')}"`).join('')}>`

const collapse = text => text.replace(/\s+/g, ' ')

// renders no box: display: none, or inside something that is. Only the page's
// own elements are laid out: the initial HTML's would all count
export const isHidden = element => element.ownerDocument === document && !element.getClientRects().length

// [{ tag, element, children }, { text }]: what an element holds, skipped
// tags flattened away, adjacent text merged; divs kept with withDivs, the
// elements that render no box with withHidden
export function childrenOf (element, withDivs, withHidden = true) {
  const items = []

  const push = item => {
    const last = items[items.length - 1]

    // hoisted text comes trimmed: a space keeps `foo<span>bar</span>` two words
    if (item.text !== undefined && last?.text !== undefined) last.text = collapse(`${last.text} ${item.text}`)
    else items.push(item)
  }

  for (const child of element.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      push({ text: collapse(child.textContent) })
      continue
    }

    if (child.nodeType !== Node.ELEMENT_NODE) continue

    const tag = child.localName

    // aria-hidden: not there for assistive tech, so not in the outline either,
    // with everything inside. Any value but "false" counts: a bare
    // `aria-hidden` (Twig's `aria-hidden=""`) is plainly meant as true
    if (IGNORED.has(tag) || isOwn(child) || (child.hasAttribute('aria-hidden') && child.getAttribute('aria-hidden') !== 'false')) continue

    // no box: left out with everything inside, but for display: contents,
    // whose children do render — skipped like a div, they are hoisted
    const hiddenOut = !withHidden && isHidden(child)

    if (hiddenOut && getComputedStyle(child).display !== 'contents') continue

    if (!hiddenOut && (SEMANTIC.has(tag) || (withDivs && tag === 'div'))) {
      const children = OPAQUE.has(tag) ? [] : childrenOf(child, withDivs, withHidden)

      push({
        tag, element: child, attributes: attributesOf(child, tag), children
      })
    } else {
      childrenOf(child, withDivs, withHidden).forEach(push)
    }
  }

  // whitespace between tags is not text
  return items
    .map(item => (item.text === undefined ? item : { text: item.text.trim() }))
    .filter(item => item.text !== '')
}

// all the text inside, joined
export const textOf = items => items
  .map(item => (item.text !== undefined ? item.text : textOf(item.children)))
  .filter(Boolean)
  .join(' ')

export const count = items => items.reduce((sum, item) => sum + (item.tag ? 1 + count(item.children) : 0), 0)

// the tree as indented HTML, for Copy
export function toHtml (item, depth = 0) {
  const indent = '  '.repeat(depth)

  if (item.text !== undefined) return indent + item.text
  if (!item.children.length) return indent + openTag(item)

  const [ only ] = item.children

  if (item.children.length === 1 && only.text !== undefined) return `${indent}${openTag(item)}${only.text}</${item.tag}>`

  return [
    indent + openTag(item),
    ...item.children.map(child => toHtml(child, depth + 1)),
    `${indent}</${item.tag}>`
  ].join('\n')
}
