import { computed, reactive } from 'vue'

import { copyText } from '@/lib/copy'
import { clearHighlights, drawHighlights } from '@/lib/highlights'
import { labelOf, pageElementAt } from '@/lib/page'
import { state as tools } from '@/lib/state'
import { readSession, writeSession } from '@/lib/storage'

import {
  applyCss,
  BASE,
  candidatesFor,
  cleanValue,
  convert,
  CSS_KEY,
  declaredProperties,
  describeAs,
  EDITORS_KEY,
  FOLDED_KEY,
  idOf,
  kindOf,
  loadOverrides,
  NUMERIC,
  parseCss,
  probe,
  read,
  resolvedValue,
  ROOT,
  STEPS,
  STORAGE_KEY,
  toCss,
  unitIn,
  usageIndex,
  valueIn,
  write
} from './tokens'

// The tokens panel's state (TokensPanel.vue): the tokens read from the page,
// the tab (a breakpoint, by width), the filters, and the edits. Kept while the
// panel is shut; collect() reads the page again on each opening, as the
// stylesheets can change in between (HMR).

// the element picked, and the picking listeners' remover: page elements stay
// out of Vue's reactivity
let pickedElement = null
let removePicking = null
let usage = { uses: new Map(), dependants: new Map() }

export const store = reactive({
  tokens: [],
  tabs: [ { label: 'Base', width: BASE } ],
  tab: BASE,
  query: '',
  // only the tokens changed, at any breakpoint
  onlyChanged: false,
  // Pick: choosing an element on the page; once picked, its name and the ids
  // of the tokens it and what is inside it use
  picking: false,
  picked: null,
  // the groups folded shut, by name
  folded: readSession(FOLDED_KEY, []),
  // bumped on resize, so the tab for the current width is worked out again
  viewport: 0
})

tools.tokensChanged = Object.values(loadOverrides()).filter(values => Object.keys(values).length).length

window.addEventListener('resize', () => { store.viewport++ }, { passive: true })

/* -------------------------------------------------------------------------- */
/* Reading the page                                                           */
/* -------------------------------------------------------------------------- */

// breakpoints: init()'s, { label: px }
export function collect (breakpoints) {
  const overrides = loadOverrides()
  const editors = read(EDITORS_KEY, {})

  usage = usageIndex()

  store.tokens = declaredProperties().map(({
    id, name, selector, declared
  }) => {
    const base = valueIn(declared, Infinity).value
    const editor = editors[id] ?? ''
    const kind = describeAs(base.includes('var(') ? resolvedValue(name, selector) : base, editor)

    return {
      id, name, selector, ...kind, editor, declared, overrides: overrides[id] || {}, using: null, editing: false
    }
  })

  // the ones added here, no stylesheet declares: only their overrides
  const declaredIds = new Set(store.tokens.map(token => token.id))

  Object.entries(overrides)
    .filter(([ id, values ]) => !declaredIds.has(id) && Object.keys(values).length)
    .forEach(([ id, values ]) => {
      const at = id.indexOf('@')

      store.tokens.push(newToken(id.slice(0, at), id.slice(at + 1), values, editors[id]))
    })

  // Base, the site's breakpoints, and any other a token is set at
  const tabs = new Map([ [ BASE, 'Base' ] ])

  Object.entries(breakpoints).forEach(([ label, width ]) => {
    if (Number(width)) tabs.set(Number(width), label)
  })

  store.tokens.forEach(token => Object.keys(token.declared).map(Number).forEach(width => {
    if (!tabs.has(width)) tabs.set(width, `${width}px`)
  }))

  store.tabs = [ ...tabs ].sort(([ a ], [ b ]) => a - b).map(([ width, label ]) => ({ width, label }))
  // every opening starts on Base; the window's own breakpoint is the dotted tab
  store.tab = BASE

  // the picked element again, or none if a navigation took it away
  if (pickedElement?.isConnected) pick(pickedElement)
  else clearPicked()
}

// the tab for the current window width
export const currentTab = computed(() => {
  void store.viewport

  return store.tabs.filter(tab => window.matchMedia(`(min-width: ${tab.width}px)`).matches).at(-1)?.width ?? BASE
})

export const labelOfTab = width => store.tabs.find(tab => tab.width === width)?.label ?? `${width}px`

/* -------------------------------------------------------------------------- */
/* The list                                                                   */
/* -------------------------------------------------------------------------- */

export const isChanged = token => Object.keys(token.overrides).length > 0
export const isChangedHere = token => store.tab in token.overrides

export const changedCount = computed(() => store.tokens.filter(isChanged).length)
export const changedAt = width => store.tokens.filter(token => width in token.overrides).length

// the filter found in a value, on any tab: a --name typed finds the tokens
// that use it
const valuesHold = (token, query) => Object.values({ ...token.declared, ...token.overrides })
  .some(value => value != null && String(value).toLowerCase().includes(query))

// the root's by the name's first word; a component's by its main class
export const groups = computed(() => {
  const query = store.query.trim().toLowerCase()
  const byName = new Map()

  store.tokens
    .filter(token => !store.onlyChanged || isChanged(token))
    .filter(token => !store.picked || store.picked.ids.includes(token.id))
    .filter(token => !query || token.name.includes(query) || token.selector.toLowerCase().includes(query) || valuesHold(token, query))
    .forEach(token => {
      const group = token.selector === ROOT
        ? token.name.replace(/^--/, '').split('-')[0] || 'other'
        : token.selector.match(/\.[\w-]+/)?.[0] || token.selector

      if (!byName.has(group)) byName.set(group, [])
      byName.get(group).push(token)
    })

  return [ ...byName ].map(([ name, tokens ]) => ({ name, tokens }))
})

export const isFolded = group => store.folded.includes(group.name)

function fold (names) {
  store.folded = names
  writeSession(FOLDED_KEY, names)
}

export function toggleGroup (group) {
  fold(isFolded(group) ? store.folded.filter(name => name !== group.name) : [ ...store.folded, group.name ])
}

// Expand all / Collapse all: the groups showing, others left as they are
export function foldAll (shut) {
  const names = groups.value.map(group => group.name)

  fold(shut ? [ ...new Set([ ...store.folded, ...names ]) ] : store.folded.filter(name => !names.includes(name)))
}

export const allFolded = computed(() => groups.value.every(isFolded))
export const noneFolded = computed(() => !groups.value.some(isFolded))

/* -------------------------------------------------------------------------- */
/* Values                                                                     */
/* -------------------------------------------------------------------------- */

// the token's value in effect on the current tab: { value, from }
export const valueAt = token => valueIn({ ...token.declared, ...token.overrides }, store.tab)

// where the value on this tab comes from
export function sourceOf (token) {
  const { from } = valueAt(token)

  if (from === null) return 'not set'
  if (from !== store.tab) return `from ${labelOfTab(from)}`

  return isChangedHere(token) ? 'changed here' : 'set here'
}

// the unit the value on this tab has (an override may use another than the
// stylesheet's), the ones it can switch to, and its step
export const unitOf = token => unitIn(valueAt(token).value) ?? token.unit
export const unitsFor = token => kindOf(unitOf(token))?.units ?? []
export const stepOf = token => STEPS[unitOf(token)] ?? token.step

// ↑ / ↓ in a value field: a number moves by its unit's step, ×10 with Shift,
// ×0.1 with Alt, as in the browser's devtools. Anything but a plain number
// is left alone: false then.
export function stepToken (token, direction, multiplier = 1) {
  const match = valueAt(token).value.match(NUMERIC)

  if (!match) return false

  const unit = match[2] || ''
  const step = (STEPS[unit] ?? token.step ?? 1) * multiplier
  const next = Math.round((Number(match[1]) + direction * step) * 10000) / 10000

  setToken(token, `${next}${unit}`)

  return true
}

// switching unit converts where a ratio exists: 1rem → 16px, 350ms → 0.35s
export function changeUnit (token, unit) {
  const number = parseFloat(valueAt(token).value)

  setToken(token, (Number.isNaN(number) ? 0 : convert(number, unitOf(token), unit)) + unit)
}

// The editor chosen over the one the value calls for ('' for Auto): kept for
// the session, changes or not
export function setEditor (token, editor) {
  const value = valueAt(token).value

  Object.assign(token, describeAs(value.includes('var(') ? resolvedValue(token.name, token.selector) : value, editor), { editor })
  saveEditors()
}

const saveEditors = () => write(EDITORS_KEY, Object.fromEntries(store.tokens.filter(token => token.editor).map(token => [ token.id, token.editor ])))

// A value's text in runs, each var() of a variable nothing defines marked —
// not a token here, nor set on the root (WordPress's, or one set inline or by
// a script, the list leaves out) — with its name. null when there is none.
// A var() with a fallback is marked only up to its name.
const VAR_USE = /var\(\s*(--[\w-]+)\s*\)?/g
const tokenNames = computed(() => new Set(store.tokens.map(token => token.name)))

export const isDefined = name => tokenNames.value.has(name) || getComputedStyle(document.documentElement).getPropertyValue(name) !== ''

export function markMissing (text) {
  const runs = []
  let last = 0

  for (const match of text.matchAll(VAR_USE)) {
    if (isDefined(match[1])) continue

    runs.push({ text: text.slice(last, match.index) }, { text: match[0], missing: match[1] })
    last = match.index + match[0].length
  }

  if (!runs.length) return null

  runs.push({ text: text.slice(last) })

  return runs
}

/* -------------------------------------------------------------------------- */
/* Editing                                                                    */
/* -------------------------------------------------------------------------- */

// on the current tab, unless given a breakpoint (Import); `save` false
// leaves saving to the caller, after many
export function setToken (token, value, width = store.tab, save = true) {
  const overrides = { ...token.overrides }
  const others = { ...token.declared, ...overrides }

  value = cleanValue(value)
  delete overrides[width]
  delete others[width]

  // what the stylesheets give here: set at this breakpoint, or carried up
  // with the other overrides in place. An override only where it differs.
  const stylesheet = token.declared[width] ?? valueIn(others, width).value

  if (value !== '' && value !== stylesheet) overrides[width] = value

  token.overrides = overrides
  if (save) saveAll()
}

export function resetToken (token) {
  const overrides = { ...token.overrides }

  delete overrides[store.tab]
  token.overrides = overrides
  // an added one goes with its last value
  if (token.added && !isChanged(token)) store.tokens = store.tokens.filter(t => t !== token)
  saveAll()
}

export function resetAll () {
  store.tokens = store.tokens.filter(token => !token.added)
  store.tokens.forEach(token => { token.overrides = {} })
  saveAll()
}

// a variable no stylesheet declares, set only by its overrides
export function newToken (name, selector, overrides, editor = '') {
  const value = valueIn(overrides, Infinity).value

  return {
    id: idOf(name, selector),
    name,
    selector,
    ...describeAs(value.includes('var(') ? '' : value, editor),
    editor,
    declared: {},
    overrides,
    added: true,
    using: null,
    editing: false
  }
}

// Adds a variable on the current tab, like an edit there. An existing one is
// not added again: the filter shows it instead. The error, or the new token.
export function addToken ({
  name, selector, value, editor
}) {
  name = name.trim()
  selector = selector.trim() || ROOT
  value = value.trim()

  if (!/^--[a-zA-Z_][\w-]*$/.test(name)) return { error: 'A name like --my-variable' }
  if (!value) return { error: 'A value too' }
  if (!CSS.supports(`selector(${selector})`)) return { error: 'Not a valid selector' }

  if (store.tokens.some(token => token.id === idOf(name, selector))) {
    store.query = name

    return { error: `${name} is already there on ${selector}` }
  }

  const token = newToken(name, selector, { [store.tab]: value }, editor)

  store.tokens.push(token)
  saveAll()
  store.query = ''
  // with an element picked, nothing uses it yet: let through all the same
  if (store.picked) store.picked.ids.push(token.id)

  // its group unfolded, to show it
  const group = groups.value.find(g => g.tokens.some(t => t.id === token.id))

  if (group && isFolded(group)) toggleGroup(group)

  return { token }
}

// Cmd/Ctrl+click on a var(--name) in a value: the token it points at shown —
// the one on the same selector as the value's, else :root's, else any — the
// filters cleared if they hide it, its group unfolded. The token, or null.
export function revealToken (name, selector) {
  const named = store.tokens.filter(token => token.name === name)
  const token = named.find(t => t.selector === selector) ?? named.find(t => t.selector === ROOT) ?? named[0]

  if (!token) return null

  if (!groups.value.some(g => g.tokens.includes(token))) {
    store.query = ''
    store.onlyChanged = false
    store.picked = null
  }

  const group = groups.value.find(g => g.tokens.includes(token))

  if (group && isFolded(group)) toggleGroup(group)

  return token
}

// Import: each variable set at its breakpoint as an edit there would be, so a
// value the stylesheets already give changes nothing (Copy all comes back as
// only its differences). One neither the stylesheets nor the panel has is
// added, on its selector. With replace, the changes there are go first. A
// note on what came of it, and whether it failed.
export function importCss (text, replace) {
  let entries = []

  try {
    entries = parseCss(text)
  } catch {}

  if (!entries.length) return { error: true, note: 'No variables found in that.' }

  if (replace) {
    store.tokens = store.tokens.filter(token => !token.added)
    store.tokens.forEach(token => { token.overrides = {} })
  }

  let added = 0

  entries.forEach(({
    selector, name, width, value
  }) => {
    const token = store.tokens.find(t => t.id === idOf(name, selector))

    if (token) return setToken(token, value, width, false)

    store.tokens.push(newToken(name, selector, { [width]: value }))
    added++
  })

  // a breakpoint no tab has yet gets one
  const widths = new Set(store.tabs.map(tab => tab.width))

  entries.forEach(({ width }) => {
    if (!widths.has(width)) {
      widths.add(width)
      store.tabs.push({ width, label: `${width}px` })
    }
  })
  store.tabs.sort((a, b) => a.width - b.width)

  saveAll()

  return {
    error: false,
    note: `${entries.length} values read${added ? `, ${added} new variables` : ''}: ${changedCount.value} tokens changed now.`
  }
}

function saveAll () {
  const changed = store.tokens.filter(isChanged)
  // each changed token whole, so its larger breakpoints still win above
  const css = toCss(changed.map(({
    selector, name, declared, overrides
  }) => ({
    selector, name, values: { ...declared, ...overrides }
  })))

  write(STORAGE_KEY, Object.fromEntries(changed.map(token => [ token.id, token.overrides ])))
  write(CSS_KEY, css)
  saveEditors()
  applyCss(css)
  tools.tokensChanged = changed.length
}

// only the changes, grouped like a tokens file: :root, then per breakpoint
export const copyChanges = root => copyText(toCss(store.tokens.filter(isChanged).map(({
  selector, name, overrides
}) => ({
  selector, name, values: overrides
}))) + '\n', root)

// every token at every breakpoint, the changes in place, laid out the same
export const copyAll = root => copyText(toCss(store.tokens.map(({
  selector, name, declared, overrides
}) => ({
  selector, name, values: { ...declared, ...overrides }
}))) + '\n', root)

/* -------------------------------------------------------------------------- */
/* Where a token is used                                                      */
/* -------------------------------------------------------------------------- */

// Pick: the pointer outlines the element under it, a click picks it and
// Escape gives up. The click is kept from the page (a link would navigate),
// as are the presses before it.
export function startPicking () {
  if (store.picking) return stopPicking()

  store.picking = true

  const over = event => {
    const element = pageElementAt(event.clientX, event.clientY)

    if (element) drawHighlights([ element ], labelOf(element))
    else clearHighlights()
  }

  const block = event => {
    if (!pageElementAt(event.clientX, event.clientY)) return

    event.preventDefault()
    event.stopImmediatePropagation()
  }

  const click = event => {
    const element = pageElementAt(event.clientX, event.clientY)

    if (!element) return

    block(event)
    stopPicking()
    pick(element)
  }

  const key = event => {
    if (event.key !== 'Escape') return

    event.preventDefault()
    event.stopImmediatePropagation()
    stopPicking()
  }

  const listeners = [
    [ 'pointermove', over ],
    [ 'pointerdown', block ],
    [ 'mousedown', block ],
    [ 'pointerup', block ],
    [ 'mouseup', block ],
    [ 'click', click ],
    [ 'keydown', key ]
  ]

  listeners.forEach(([ type, listener ]) => window.addEventListener(type, listener, true))
  removePicking = () => listeners.forEach(([ type, listener ]) => window.removeEventListener(type, listener, true))
}

export function stopPicking () {
  if (!store.picking) return

  store.picking = false
  removePicking?.()
  removePicking = null
  clearHighlights()
}

// The tokens that reach the element or anything inside it: those whose rules
// find something there, probed as the hover highlight is, so a rule
// overridden or a :hover not happening does not count
function pick (element) {
  pickedElement = element

  const ids = store.tokens
    .filter(token => {
      const candidates = candidatesFor(token.name, usage, element)

      return candidates.size && probe(token.name, token.selector, candidates).length
    })
    .map(token => token.id)

  store.picked = { label: labelOf(element), ids }
}

// one level up, to widen the filter
export function pickParent () {
  const parent = pickedElement?.parentElement

  if (parent) pick(parent)
}

export function clearPicked () {
  pickedElement = null
  store.picked = null
  clearHighlights()
}

// hovering the picked chip outlines the element
export function showPicked () {
  if (pickedElement?.isConnected) drawHighlights([ pickedElement ], store.picked.label)
}

// hovering a token outlines what uses it on the page. Two counts: the
// elements it reaches anywhere in the page (hidden ones too: a closed menu
// panel still has computed styles), and those outlined, in view.
export function highlight (token) {
  const using = probe(token.name, token.selector, candidatesFor(token.name, usage))

  token.using = { page: using.length, screen: drawHighlights(using) }
}

export { clearHighlights as unhighlight }
