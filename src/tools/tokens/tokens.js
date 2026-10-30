// The tokens panel's workings, apart from its UI (TokensPanel.vue): reading
// the custom properties the page's stylesheets set, per selector and
// breakpoint; writing the overrides as CSS; the editors' value kinds; and
// which elements a token reaches (the hover highlight, Pick).
//
// Overrides go in one unlayered <style> after the page's <body>
// (#dev-tokens-overrides), which beats every layered rule, and the unlayered
// ones of the same specificity, coming after them: under the token's
// own selector (`:root`, or the component's), plain for Base, in
// `@media (min-width: …)` for each breakpoint, in order. Being unlayered, it
// would also beat a value the stylesheets set at a larger breakpoint, so a
// changed token is written out whole — its own values at every breakpoint,
// overrides in place.
//
// sessionStorage: `dev-tokens` holds the overrides, { 'name@selector': {
// width: value } } (width 0 = Base), and `dev-tokens-css` the stylesheet. A
// site can put that back before the page paints with a line of its own
// (README.md); init() puts it back anyway, later. `dev-tokens-editors` holds
// the editors chosen, `dev-tokens-folded` lists the groups folded shut,
// `dev-tokens-width` the panel's width.

import { isOwn } from '@/lib/page'

export const STORAGE_KEY = 'dev-tokens'
export const CSS_KEY = 'dev-tokens-css'
export const FOLDED_KEY = 'dev-tokens-folded'
// the editor chosen for a token, by id, where not Auto
export const EDITORS_KEY = 'dev-tokens-editors'
// the panel's width, dragged from its left edge
export const WIDTH_KEY = 'dev-tokens-width'
export const STYLE_ID = 'dev-tokens-overrides'
export const BASE = 0

export const read = (key, fallback) => {
  try {
    return JSON.parse(sessionStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export const write = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export const ROOT = ':root'

// a token is a variable on a selector
export const idOf = (name, selector) => `${name}@${selector}`

// The overrides, by token id. What earlier versions saved — keyed by name
// alone (on :root), one value per name, or keyed by media text — still loads;
// only Base carries over from those.
export function loadOverrides () {
  const saved = read(STORAGE_KEY, {})

  return Object.fromEntries(Object.entries(saved).map(([ key, value ]) => {
    const id = key.includes('@') ? key : idOf(key, ROOT)

    if (typeof value === 'string') return [ id, { [BASE]: value } ]

    const byWidth = {}

    Object.entries(value).forEach(([ width, v ]) => {
      if (width === '' || /^\d+$/.test(width)) byWidth[width === '' ? BASE : width] = v
    })

    return [ id, byWidth ]
  }))
}

// `''` for no media; `(min-width: 768px)` or sass-mq's `(min-width: 48em)` as
// its px; anything else (max-width, hover, …) null — not a breakpoint
export function widthOf (media) {
  if (media === '') return BASE

  const match = media.match(/^\(min-width:\s*([\d.]+)(px|r?em)\)$/)

  if (!match) return null

  return Math.round(Number(match[1]) * (match[2] === 'px' ? 1 : 16))
}

// A value as it goes in a declaration: on one line, without the semicolons
// someone typed after it, so each declaration ends in exactly one
export const cleanValue = value => value.replace(/\s+/g, ' ').trim().replace(/[\s;]+$/, '')

// [{ selector, name, values: { width: value } }] as CSS: Base first, then the
// breakpoints in order, so the larger wins where it applies; in each, a block
// per selector, :root first
export function toCss (entries) {
  const byWidth = new Map()

  entries.forEach(({
    selector, name, values
  }) => {
    Object.entries(values).forEach(([ width, value ]) => {
      if (!byWidth.has(Number(width))) byWidth.set(Number(width), new Map([ [ ROOT, [] ] ]))

      const bySelector = byWidth.get(Number(width))

      if (!bySelector.has(selector)) bySelector.set(selector, [])
      bySelector.get(selector).push(`${name}: ${cleanValue(value)};`)
    })
  })

  return [ ...byWidth ]
    .sort(([ a ], [ b ]) => a - b)
    .map(([ width, bySelector ]) => {
      const blocks = [ ...bySelector ]
        .filter(([ , lines ]) => lines.length)
        .map(([ selector, lines ]) => `${selector} {\n  ${lines.join('\n  ')}\n}`)
        .join('\n\n')

      return width === BASE ? blocks : `@media (min-width: ${width}px) {\n${blocks.replace(/^/gm, '  ')}\n}`
    })
    .join('\n\n')
}

// Last in the document, after <body>: an unlayered rule of the same
// specificity comes before it then, whatever <head> gets later (Vite's styles
// in development), and a page swap inside <body> leaves it be. One the site
// put back in <head> before the page painted (README.md) is moved there.
export function applyCss (css) {
  let style = document.getElementById(STYLE_ID)

  if (!style) {
    style = document.createElement('style')
    style.id = STYLE_ID
  }

  if (style.parentNode !== document.documentElement || style.compareDocumentPosition(document.body) & Node.DOCUMENT_POSITION_FOLLOWING) document.documentElement.append(style)

  style.textContent = css
}

// `:root`, `html`, or either with more on the same element (`:root:not(…)`,
// `html.-x`), not something inside them
export const isRootSelector = selector => /^(:root|html)(?![\w-])[^\s>+~]*$/.test(selector.trim())

// What Copy changes / Copy all give (toCss), read back: each variable with
// its selector (the root's all as :root), breakpoint and value. The browser
// parses it, so anything it can read goes, comments and all; a media query
// that is not a min-width breakpoint is left out, with what is inside it.
export function parseCss (text) {
  const sheet = new CSSStyleSheet()
  const entries = []

  sheet.replaceSync(text)

  const walk = (rules, width) => {
    for (const rule of rules) {
      if (rule instanceof CSSMediaRule) {
        const ruleWidth = widthOf(rule.conditionText)

        if (ruleWidth !== null) walk(rule.cssRules, Math.max(width, ruleWidth))
        continue
      }

      if (!rule.selectorText || !rule.style) continue

      const selector = rule.selectorText.split(',').some(isRootSelector) ? ROOT : rule.selectorText

      for (const name of rule.style) {
        const value = rule.style.getPropertyValue(name).trim()

        if (name.startsWith('--') && value) entries.push({
          selector, name, width, value
        })
      }
    }
  }

  walk(sheet.cssRules, BASE)

  return entries
}

// Every custom property the stylesheets set, per selector: on the root
// (`:root`, `html`, … all counted as :root) or on any other selector (a
// component's own), each with its value at each breakpoint ({ width: value }).
// Rules nested any way (media, layers, supports, nesting); a declaration
// under any other media is not a breakpoint value and is left out. The later
// declaration wins, as in the cascade. Cross-origin sheets cannot be read.
// Left out: WordPress's own (--wp…), this panel's, and Sass-nested `&` rules.
export function declaredProperties () {
  const properties = new Map()

  const walk = (rules, width) => {
    for (const rule of rules) {
      let context = width

      if (rule instanceof CSSMediaRule) {
        const ruleWidth = widthOf(rule.conditionText)

        context = ruleWidth === null || width === null ? null : Math.max(width, ruleWidth)
      }

      const text = rule.selectorText

      if (context !== null && text && rule.style && !text.includes('&')) {
        const selector = text.split(',').some(isRootSelector) ? ROOT : text

        for (const name of rule.style) {
          if (!name.startsWith('--') || name.startsWith('--wp')) continue

          const id = idOf(name, selector)

          if (!properties.has(id)) properties.set(id, {
            id, name, selector, declared: {}
          })
          properties.get(id).declared[context] = rule.style.getPropertyValue(name).trim()
        }
      }

      if (rule.cssRules) walk(rule.cssRules, context)
    }
  }

  for (const sheet of document.styleSheets) {
    if (sheet.ownerNode?.id === STYLE_ID) continue

    try {
      walk(sheet.cssRules, BASE)
    } catch {}
  }

  // the root's first, then the components' by selector
  return [ ...properties.values() ].sort((a, b) => (a.selector === ROOT) !== (b.selector === ROOT)
    ? (a.selector === ROOT ? -1 : 1)
    : a.selector.localeCompare(b.selector) || a.name.localeCompare(b.name))
}

// the variable's computed value where it is set: on <html>, or on the first
// element the component's selector finds
export function resolvedValue (name, selector) {
  let element = document.documentElement

  if (selector !== ROOT) {
    try {
      element = document.querySelector(selector.split(',')[0].replace(STATEFUL, '').trim())
    } catch {
      element = null
    }
  }

  return element ? getComputedStyle(element).getPropertyValue(name).trim() : ''
}

// the value in effect from `width` up: the largest breakpoint at or below it
export function valueIn (values, width) {
  const from = Object.keys(values).map(Number).filter(w => w <= width).sort((a, b) => a - b).at(-1)

  return from === undefined ? { value: '', from: null } : { value: values[from], from }
}

export const EASINGS = {
  'linear': [
    0,
    0,
    1,
    1
  ],
  'ease': [
    0.25,
    0.1,
    0.25,
    1
  ],
  'ease-in': [
    0.42,
    0,
    1,
    1
  ],
  'ease-out': [
    0,
    0,
    0.58,
    1
  ],
  'ease-in-out': [
    0.42,
    0,
    0.58,
    1
  ]
}

export const parseBezier = value => {
  if (EASINGS[value]) return [ ...EASINGS[value] ]

  const numbers = value.match(/^cubic-bezier\(([^)]+)\)$/)?.[1].split(',').map(Number)

  return numbers?.length === 4 && numbers.every(n => !Number.isNaN(n)) ? numbers : [
    0,
    0,
    1,
    1
  ]
}

// a linear() easing's points as [x, y] pairs, x from 0 to 1: a stop without
// a position goes halfway between its neighbours that have one (per the spec)
export const parseLinear = value => {
  const stops = value.match(/^linear\((.+)\)$/)?.[1].split(',').map(stop => {
    const [ y, ...xs ] = stop.trim().split(/\s+/)

    return { y: Number(y), xs: xs.map(x => parseFloat(x) / 100) }
  })

  if (!stops?.length || stops.some(stop => Number.isNaN(stop.y))) return null

  const points = stops.flatMap(({ y, xs }) => (xs.length ? xs : [ null ]).map(x => [ x, y ]))

  points[0][0] ??= 0
  points.at(-1)[0] ??= 1

  // no going back: a position lower than one before it is raised to it
  points.forEach((point, index) => {
    if (point[0] !== null && index) point[0] = Math.max(point[0], points.slice(0, index).findLast(p => p[0] !== null)[0])
  })

  // runs without a position spread evenly between the positions either side
  points.forEach((point, index) => {
    if (point[0] !== null) return

    const before = index - 1
    const after = points.findIndex((p, i) => i > index && p[0] !== null)

    for (let i = index; i < after; i++) points[i][0] = points[before][0] + ((points[after][0] - points[before][0]) * (i - before)) / (after - before)
  })

  return points
}

export const NUMERIC = /^(-?\d*\.?\d+)(ms|s|px|rem|em|%|vw|vh|dvh|svh)?$/
export const STEPS = {
  'ms': 10, 's': 0.05, 'px': 1, 'rem': 0.125, 'em': 0.125, '%': 1, 'vw': 1, 'vh': 1
}

// the units a number can be switched between, by kind, and each one's size in
// a common base where there is one (px, ms); % / vw / vh have none to convert
// through, so their number is kept as it is
export const UNIT_KINDS = [
  {
    units: [
      'px',
      'rem',
      'em',
      '%',
      'vw',
      'vh'
    ], base: {
      'px': 1, 'rem': 16, 'em': 16
    }
  },
  { units: [ 'ms', 's' ], base: { 'ms': 1, 's': 1000 } }
]

export const kindOf = unit => UNIT_KINDS.find(kind => kind.units.includes(unit))

export const unitIn = value => value.match(NUMERIC)?.[2] ?? null

export function convert (number, from, to) {
  const { base } = kindOf(from) || {}

  if (!base?.[from] || !base?.[to]) return number

  return Math.round(((number * base[from]) / base[to]) * 10000) / 10000
}

// Which editor a value gets. A number with a unit also gets a stepper.
export function describe (value) {
  const numeric = value.match(NUMERIC)

  if (/^cubic-bezier\(|^(linear|ease|ease-in|ease-out|ease-in-out)$/.test(value) || parseLinear(value)) return { type: 'easing', unit: null }
  if (numeric) return {
    type: 'number', unit: numeric[2] || '', step: STEPS[numeric[2] || ''] ?? 0.05
  }
  if (value && CSS.supports('color', value)) return { type: 'color', unit: null }

  return { type: 'text', unit: null }
}

// The editors one can choose for a token over the one its value calls for
// (Auto): a value made of var() reads as text, say, where a colour picker is
// wanted. Those with a unit start on it, or on the value's own if of its kind.
export const EDITORS = [
  { value: '', label: 'Auto' },
  { value: 'color', label: 'Colour' },
  { value: 'easing', label: 'Bezier' },
  {
    value: 'length', label: 'Length', unit: 'px'
  },
  {
    value: 'duration', label: 'Duration', unit: 'ms'
  },
  {
    value: 'number', label: 'Number', unit: ''
  },
  { value: 'text', label: 'Text' }
]

export function describeAs (value, editor) {
  const chosen = EDITORS.find(item => item.value === editor)

  if (!chosen?.value) return describe(value)
  if (chosen.unit === undefined) return { type: chosen.value, unit: null }

  const own = unitIn(value)
  const unit = chosen.unit && kindOf(chosen.unit).units.includes(own) ? own : chosen.unit

  return {
    type: 'number', unit, step: STEPS[unit] ?? 0.05
  }
}

export const numberOf = value => {
  const number = parseFloat(value)

  return Number.isNaN(number) ? '' : number
}

// the colour input only takes #rrggbb; the canvas normalises anything it can draw
let canvas = null

export function toHex (value) {
  canvas ??= document.createElement('canvas').getContext('2d')
  canvas.fillStyle = '#000000'
  canvas.fillStyle = value

  const normalised = canvas.fillStyle

  if (normalised.startsWith('#')) return normalised

  const [
    r,
    g,
    b
  ] = normalised.match(/[\d.]+/g) || []

  return r === undefined ? '#000000' : '#' + [
    r,
    g,
    b
  ].map(n => Math.round(n).toString(16).padStart(2, '0')).join('')
}

/* -------------------------------------------------------------------------- */
/* Where a variable is used (for the hover highlight)                          */
/* -------------------------------------------------------------------------- */

const VAR_REFERENCE = /var\(\s*(--[\w-]+)/g
const DECLARATION = /(?:^|;)\s*([\w-]+)\s*:\s*([^;]*)/g

// dynamic states and pseudo-elements left out of a selector, so the element
// is found; the probe below then says whether the rule really applies now
export const STATEFUL = /::?(before|after|placeholder|selection|marker|backdrop|file-selector-button|-webkit-[\w-]+|-moz-[\w-]+)(\([^)]*\))?|:(hover|focus-visible|focus-within|focus|active|visited|target)(?![\w-])/g

// The stylesheets read once per opening: for each variable, the rules using
// it — selector and property — and which variables are defined from it
// (`--a: var(--b)` makes --a a dependant of --b). Rules under a media query
// that does not match now are left out. Declarations are read from the text,
// not rule.style: a shorthand holding var() (`transition: transform
// var(--x)`) keeps it on the shorthand, and its longhands read empty.
export function usageIndex () {
  const uses = new Map()
  const dependants = new Map()
  const add = (map, key, value) => {
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(value)
  }

  const walk = rules => {
    for (const rule of rules) {
      if (rule instanceof CSSMediaRule && !window.matchMedia(rule.conditionText).matches) continue

      if (rule.selectorText && rule.style && !rule.selectorText.includes('&')) {
        const isRoot = rule.selectorText.split(',').every(isRootSelector)

        for (const [
          , property,
          value
        ] of rule.style.cssText.matchAll(DECLARATION)) {
          for (const [ , name ] of value.matchAll(VAR_REFERENCE)) {
            if (property.startsWith('--')) add(dependants, name, property)
            else if (!isRoot) add(uses, name, { selector: rule.selectorText, property })
          }
        }
      }

      if (rule.cssRules) walk(rule.cssRules)
    }
  }

  for (const sheet of document.styleSheets) {
    if (sheet.ownerNode?.id === STYLE_ID) continue

    try {
      walk(sheet.cssRules)
    } catch {}
  }

  return { uses, dependants }
}

// The elements whose rules name `name` — directly, or through a variable
// defined from it — each with the properties those rules set through it;
// with `within`, only that element and those inside it. Candidates only:
// whether the value actually reaches them is probed below.
export function candidatesFor (name, { uses, dependants }, within = null) {
  const names = new Set([ name ])

  for (const current of names) {
    dependants.get(current)?.forEach(dependant => names.add(dependant))
  }

  const candidates = new Map()

  names.forEach(current => uses.get(current)?.forEach(({ selector: selectorText, property }) => {
    selectorText.split(',').forEach(selector => {
      const plain = selector.replace(STATEFUL, '').trim()

      if (!plain) return

      try {
        const found = within
          ? [ ...(within.matches(plain) ? [ within ] : []), ...within.querySelectorAll(plain) ]
          : document.querySelectorAll(plain)

        found.forEach(element => {
          if (isOwn(element)) return
          if (!candidates.has(element)) candidates.set(element, new Set())
          candidates.get(element).add(property)
        })
      } catch {}
    })
  }))

  return candidates
}

const PSEUDOS = [
  null,
  '::before',
  '::after'
]

const snapshot = (element, properties) => PSEUDOS.map(pseudo => {
  const style = getComputedStyle(element, pseudo)

  return [ ...properties ].map(property => style.getPropertyValue(property)).join('|')
}).join('||')

// Which candidates the variable really reaches now: its value where it is
// set (the root, or the component's selector) is made invalid for a moment (`initial`, so every var() of it fails), and those
// whose computed style changes — on the element or its ::before / ::after —
// are the ones using it. A rule another overrides, a variable redefined
// closer to the element, a :hover not happening, all leave the style as it
// was. Transitions are held off meanwhile, and until the style is back, so
// nothing on the page animates to the probe value and back.
export function probe (name, selector, candidates) {
  const hold = document.createElement('style')
  const invalid = document.createElement('style')

  hold.textContent = '*, *::before, *::after { transition-property: none !important; }'
  // where the token is set: the root, or the component's selector
  invalid.textContent = `${selector} { ${name}: initial !important; }`

  document.head.append(hold)

  const before = new Map([ ...candidates ].map(([ element, properties ]) => [ element, snapshot(element, properties) ]))

  document.head.append(invalid)

  const using = [ ...candidates ].filter(([ element, properties ]) => snapshot(element, properties) !== before.get(element)).map(([ element ]) => element)

  invalid.remove()
  getComputedStyle(document.body).color // the style back, with transitions still held
  hold.remove()

  return using
}
