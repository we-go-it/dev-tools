import { reactive, watch } from 'vue'

import { readLocal, writeLocal } from './storage'

// What is on, shared by the toolbar, the shortcuts and the tools. The toolbar
// and the grid are remembered per browser (localStorage); the panels open
// shut on each page load, as they hold a reading of the page.

const TOOLBAR_KEY = 'dev-tools-toolbar'
const GRID_KEY = 'dev-grid-visible'

export const state = reactive({
  toolbar: readLocal(TOOLBAR_KEY, false) === true,
  // the grid's key predates the app: '1' or '0' then, true or false now
  grid: readLocal(GRID_KEY, false) === true || readLocal(GRID_KEY, false) === 1,
  tokens: false,
  outline: false,
  form: false,
  events: false,
  seo: false,
  images: false,
  cache: false,
  // events recorded while the events panel was shut, for the toolbar's dot
  eventsUnseen: 0,
  // how many tokens are changed, for the toolbar and the dot shown with it shut
  tokensChanged: 0
})

watch(() => state.toolbar, value => writeLocal(TOOLBAR_KEY, value))
watch(() => state.grid, value => writeLocal(GRID_KEY, value))
