import { reactive, watch } from 'vue'

import { labelOf } from '@/lib/page'
import { state as tools } from '@/lib/state'
import {
  readLocal, readSession, writeLocal, writeSession
} from '@/lib/storage'

// The events panel's recording (EventsPanel.vue): what the page pushes to
// Google Tag Manager's dataLayer, what Google Analytics 4 is then sent, and
// Contact Form 7's DOM events, as they happen. It starts with the app, not with the panel, so what happened before
// the panel was opened is there; the last MAX are kept.
//
// - dataLayer: what is in it already is replayed (`early`: GTM's own page
//   load events, pushed before the app came), then every push is recorded.
//   push is wrapped, for the moment it happens; GTM wraps it too, and chains
//   to the one it found. What is read is the array itself, by its length, so
//   a push nobody's wrapper saw still turns up, a moment later.
// - GA4: its hits, read off the requests the browser reports to a
//   PerformanceObserver — what was really sent, not only pushed. A hit is a
//   request to …/g/collect, its event in the query string: `en` its name,
//   `ep.*` / `epn.*` its parameters (text / number), `up.*` user properties,
//   `tid` the measurement id, `dl` the page. Read only, after the fact: no
//   body, so a batch of events sent in one request shows as its first.
//   Buffered, so the hits sent before the app came are there (`early`).
// - CF7: its events fire on the form and bubble (`wpcf7submit`,
//   `wpcf7mailsent`, …), listened for on the document as they go by.
// - the page: a divider whenever the address changes (a full load, or a
//   history-driven one like Barba's), so each page's events sit under it.
//
// With Preserve log on (localStorage `dev-events-preserve`) the log is kept
// for the session (`dev-events-log`) and comes back after a reload.

const MAX = 500
const LOG_KEY = 'dev-events-log'
const PRESERVE_KEY = 'dev-events-preserve'
const HIDE_GTM_KEY = 'dev-events-hide-gtm'

export const CF7_EVENTS = [
  'wpcf7beforesubmit',
  'wpcf7submit',
  'wpcf7invalid',
  'wpcf7unaccepted',
  'wpcf7spam',
  'wpcf7aborted',
  'wpcf7mailsent',
  'wpcf7mailfailed',
  'wpcf7statuschanged'
]

export const log = reactive({
  entries: [],
  recording: true,
  preserve: readLocal(PRESERVE_KEY, false) === true,
  // GTM's own (gtm.js, gtm.dom, gtm.click, timers…) left out of the list
  hideGtm: readLocal(HIDE_GTM_KEY, true) !== false
})

let id = 0

/* -------------------------------------------------------------------------- */
/* A payload, safe to keep                                                    */
/* -------------------------------------------------------------------------- */

// What a push or an event carries, as plain data: elements as a label
// (`a.button-primary`), functions as `ƒ name`, files by name, a FormData as
// its entries; nested no deeper than 6, 100 items a level, cycles cut.
export function snapshot (value, depth = 0, seen = new WeakSet()) {
  if (value === null || [
    'string',
    'number',
    'boolean'
  ].includes(typeof value)) return value
  if (value === undefined) return '(undefined)'
  if (typeof value === 'function') return `ƒ ${value.name || 'anonymous'}`
  if (typeof value !== 'object') return String(value)
  if (value instanceof Element) return `<${labelOf(value)}>`
  if (value === window) return '(window)'
  if (value instanceof Document) return '(document)'
  if (value instanceof Date) return value.toISOString()
  if (typeof File !== 'undefined' && value instanceof File) return `${value.name} (${value.size} B)`
  if (seen.has(value)) return '(circular)'
  if (depth >= 6) return '…'

  seen.add(value)

  if (value instanceof FormData) {
    return Object.fromEntries([ ...value ].map(([ key, item ]) => [ key, snapshot(item, depth + 1, seen) ]))
  }

  if (Array.isArray(value) || Object.prototype.toString.call(value) === '[object Arguments]') {
    return [ ...value ].slice(0, 100).map(item => snapshot(item, depth + 1, seen))
  }

  return Object.fromEntries(Object.entries(value).slice(0, 100).map(([ key, item ]) => [ key, snapshot(item, depth + 1, seen) ]))
}

/* -------------------------------------------------------------------------- */
/* The log                                                                    */
/* -------------------------------------------------------------------------- */

function add (entry) {
  if (!log.recording && entry.source !== 'page') return

  log.entries.push({
    id: ++id, time: Date.now(), ...entry
  })
  if (log.entries.length > MAX) log.entries.splice(0, log.entries.length - MAX)

  if (!tools.events && entry.source !== 'page') tools.eventsUnseen++
}

export function clear () {
  log.entries = []
}

// A dataLayer item: gtag()'s `arguments` (`gtag('event', 'x', { … })`), an
// object with an `event`, or one without, which only sets variables
function fromDataLayer (item, early = false) {
  if (Object.prototype.toString.call(item) === '[object Arguments]') {
    const [
      command,
      name,
      params
    ] = item

    return {
      source: 'dataLayer',
      kind: 'gtag',
      name: command === 'event' ? name : `${command}${name !== undefined && typeof name !== 'object' ? ` ${name}` : ''}`,
      call: `gtag('${command}'${name !== undefined && typeof name !== 'object' ? `, '${name}'` : ''})`,
      params: snapshot(typeof name === 'object' ? name : params ?? {}),
      early
    }
  }

  if (item && typeof item === 'object') {
    const { event, ...params } = item

    return {
      source: 'dataLayer',
      kind: 'push',
      name: event ?? '(variables)',
      params: snapshot(params),
      early
    }
  }

  return {
    source: 'dataLayer', kind: 'push', name: String(item), params: {}, early
  }
}

// A GA4 hit, from its request's address: null if it is not one
const GA4_HIT = /\/g\/collect(\?|$)/

export function fromGa4 (url, early = false) {
  let parsed

  try {
    parsed = new URL(url)
  } catch {
    return null
  }

  if (!GA4_HIT.test(parsed.pathname + parsed.search)) return null

  const query = parsed.searchParams
  const params = {}
  const user = {}

  for (const [ key, value ] of query) {
    if (key.startsWith('ep.')) params[key.slice(3)] = value
    else if (key.startsWith('epn.')) params[key.slice(4)] = Number(value)
    else if (key.startsWith('up.')) user[key.slice(3)] = value
    else if (key.startsWith('upn.')) user[key.slice(4)] = Number(value)
  }

  return {
    source: 'ga4',
    kind: 'hit',
    name: query.get('en') ?? '(hit)',
    params: {
      ...params,
      ...(Object.keys(user).length && { user_properties: user }),
      measurement_id: query.get('tid') ?? '',
      page_location: query.get('dl') ?? '',
      ...(query.get('dt') && { page_title: query.get('dt') })
    },
    url,
    early
  }
}

/* -------------------------------------------------------------------------- */
/* Listening                                                                  */
/* -------------------------------------------------------------------------- */

let started = false

export function startCapture () {
  if (started) return

  started = true

  // a log kept from before this load, under a divider of its own
  if (log.preserve) {
    const kept = readSession(LOG_KEY, [])

    if (kept.length) {
      log.entries = kept.map(entry => ({ ...entry, previous: true }))
      id = Math.max(0, ...kept.map(entry => entry.id))
      add({
        source: 'page', name: 'reload', url: location.pathname + location.search
      })
    }
  }

  if (!log.entries.length) add({
    source: 'page', name: 'load', url: location.pathname + location.search
  })

  // dataLayer: what is there, then what comes
  let layer = null
  let seen = 0

  // what was pushed since last read; a dataLayer replaced is wrap()'s
  const read = () => {
    if (window.dataLayer !== layer || !Array.isArray(layer)) return

    for (; seen < layer.length; seen++) add(fromDataLayer(layer[seen], false))
  }

  const wrap = () => {
    window.dataLayer = window.dataLayer || []

    if (window.dataLayer !== layer) {
      layer = window.dataLayer
      // what was pushed before the app came
      layer.forEach(item => add(fromDataLayer(item, true)))
      seen = layer.length
    }

    const push = layer.push

    if (push.wgDevTools) return

    const wrapped = function (...items) {
      const result = push.apply(this, items)

      read()

      return result
    }

    wrapped.wgDevTools = true
    layer.push = wrapped
  }

  wrap()

  // CF7: on the document, before anything on the way can stop it
  CF7_EVENTS.forEach(type => document.addEventListener(type, event => {
    const form = event.target instanceof Element ? event.target : null

    add({
      source: 'cf7',
      kind: 'event',
      name: type,
      target: form ? `<${labelOf(form)}>` : '',
      params: snapshot(event.detail ?? {})
    })
  }, true))

  // GA4: the hits the browser has sent, and those it sends from now on
  if ('PerformanceObserver' in window) {
    let ready = false
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        const hit = fromGa4(entry.name, !ready)

        if (hit) add(hit)
      })
    })

    try {
      observer.observe({ type: 'resource', buffered: true })
    } catch {}

    // the buffered ones come in the first callback, before anything new
    setTimeout(() => { ready = true })
  }

  // the page: a divider on every change of address
  let address = location.pathname + location.search

  const page = () => {
    const current = location.pathname + location.search

    if (current === address) return

    address = current
    add({
      source: 'page', name: 'navigation', url: current
    })
  }

  window.addEventListener('popstate', page)

  // what no wrapper saw: a replaced push or dataLayer, an address changed by
  // a script without an event
  setInterval(() => {
    wrap()
    read()
    page()
  }, 500)
}

watch(() => log.preserve, preserve => {
  writeLocal(PRESERVE_KEY, preserve)
  if (!preserve) writeSession(LOG_KEY, null)
})

watch(() => log.hideGtm, hide => writeLocal(HIDE_GTM_KEY, hide))

// kept for the session while Preserve log is on, at most once a second
let saving = null

watch(() => log.entries.at(-1)?.id, () => {
  if (!log.preserve || saving) return

  saving = setTimeout(() => {
    saving = null
    writeSession(LOG_KEY, log.entries)
  }, 1000)
})
