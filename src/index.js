import { createApp } from 'vue'

import App from './App.vue'
import { HOST_TAG, setIgnore } from './lib/page'
import css from './styles.css?inline'
import { startCapture } from './tools/events/capture'
import { watchLcp } from './tools/images/images'
import {
  applyCss, CSS_KEY, read
} from './tools/tokens/tokens'

// The dev tools: a floating toolbar (its own shortcut) over eight tools — the
// column grid, the tokens panel, the outline, the form inspector, the events
// (dataLayer, GA4 and Contact Form 7), the SEO overview, the images, the cache
// tags the server gives the page — each
// also on a shortcut of its own. The site decides when they load, and imports this only then:
//
//   import('@we-go/dev-tools').then(({ init }) => init({ … }))
//
// The app lives in a shadow root on a <we-go-dev-tools> element after <body>,
// so the page's CSS and the app's never meet, and a page swap inside <body>
// (Barba and the like) leaves it be.

// The tools, in the toolbar's order: init({ tools }) keeps any of them
export const TOOLS = [
  'grid',
  'tokens',
  'outline',
  'form',
  'events',
  'seo',
  'images',
  'cache'
]

const DEFAULTS = {
  // the tools this site has, of TOOLS: the others get no button, no shortcut,
  // and nothing of theirs runs (the events' recording, the LCP watch, the
  // token overrides put back)
  tools: TOOLS,
  // the page's grid, as CSS values: var()s of the site's own are read live,
  // breakpoints and all
  grid: {
    columns: '12',
    gap: '24px',
    margin: '24px',
    maxWidth: 'none'
  },
  // the site's min-width breakpoints, { label: px }, for the tokens panel's tabs
  breakpoints: {},
  // a selector for what on the page is not its content (the site's own dev
  // tools, an admin bar): left out of the outline, and of Pick
  ignore: '',
  // the form inspector: which forms, and what the site knows of one beyond
  // its FormData (tools/form/form.js)
  forms: {
    selector: 'form',
    read: null
  },
  // the SEO panel: query params of the site's own, left out of the address
  // the page is read and compared at (its dev tools' switch, say, which
  // would make it noindex)
  seo: {
    ignoreParams: []
  },
  // the site's own tools, on the toolbar after these (Toolbar.vue):
  // [{ name, label, icon, shortcut, pressed: () => bool | text, run: () => {} }]
  actions: [],
  shortcuts: {
    toolbar: 'ctrl+.',
    grid: 'ctrl+g',
    tokens: 'ctrl+d',
    outline: 'ctrl+o',
    form: 'ctrl+y',
    events: 'ctrl+e',
    seo: 'ctrl+k',
    images: 'ctrl+b',
    cache: 'ctrl+m'
  }
}

// Tailwind registers its own variables with @property, which a shadow root
// ignores: without them a shadow, a ring or a transform reads nothing and
// drops. Registered on the page instead; they are all --tw-*, which nothing
// of the page's uses.
function registerProperties () {
  const rules = css.match(/@property\s+--tw-[\w-]+\s*\{[^}]*\}/g)

  if (!rules || document.getElementById(`${HOST_TAG}-properties`)) return

  const style = document.createElement('style')

  style.id = `${HOST_TAG}-properties`
  style.textContent = rules.join('\n')
  document.head.append(style)
}

let mounted = null

export function init (options = {}) {
  if (mounted) return mounted

  const config = {
    tools: options.tools ? TOOLS.filter(tool => options.tools.includes(tool)) : DEFAULTS.tools,
    grid: { ...DEFAULTS.grid, ...options.grid },
    breakpoints: options.breakpoints || DEFAULTS.breakpoints,
    ignore: options.ignore || DEFAULTS.ignore,
    forms: { ...DEFAULTS.forms, ...options.forms },
    actions: options.actions || DEFAULTS.actions,
    seo: { ...DEFAULTS.seo, ...options.seo },
    shortcuts: { ...DEFAULTS.shortcuts, ...options.shortcuts }
  }

  setIgnore(config.ignore)

  // the token overrides of this session, or the ones the site put back before
  // the page painted (README.md) moved after <body>, past every stylesheet
  if (config.tools.includes('tokens')) applyCss(read(CSS_KEY, ''))

  registerProperties()

  // the events panel records from now on, open or not; the images panel's
  // LCP is known only to who listened from the start
  if (config.tools.includes('events')) startCapture()
  if (config.tools.includes('images')) watchLcp()

  const host = document.createElement(HOST_TAG)
  const root = host.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  const container = document.createElement('div')

  // the wheel over a panel scrolls the panel, not a smooth-scroll library's page
  host.setAttribute('data-lenis-prevent', '')
  style.textContent = css
  root.append(style, container)
  document.documentElement.append(host)

  const app = createApp(App, { config, root })

  app.mount(container)

  mounted = {
    destroy () {
      app.unmount()
      host.remove()
      mounted = null
    }
  }

  return mounted
}
