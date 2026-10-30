<script setup>
import { EllipsisIcon, RefreshCwIcon } from '@lucide/vue'
import { computed, inject, markRaw, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

import PopMenu from '@/components/PopMenu.vue'
import SidePanel from '@/components/SidePanel.vue'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { copyText } from '@/lib/copy'
import { clearHighlights } from '@/lib/highlights'
import { ownFetch } from '@/lib/requests'
import { readSession, writeSession } from '@/lib/storage'

import { childrenOf, count, toHtml } from './outline'
import OutlineNode from './OutlineNode.vue'

// The page's HTML as a foldable tree (outline.js), built each time the panel
// opens, and again on Refresh. Two sources: Rendered, the page as it is now,
// scripts done; and Initial, the HTML the server sends, fetched again and
// parsed — not laid out, so nothing there is dimmed or outlined on hover. A
// tag with nothing inside is a leaf, one with only text shows it inline, the
// rest fold. Elements that render no box are dimmed, or left out with Hidden
// off (Rendered only: the initial HTML is not laid out).
//
// sessionStorage: `dev-outline-text`, `dev-outline-divs` and
// `dev-outline-hidden`, whether the text, the divs and the hidden elements
// are shown; `dev-outline-source` which source;
// `dev-outline-width` the panel's width.
const emit = defineEmits([ 'close' ])

const root = inject('root')

const SOURCE_KEY = 'dev-outline-source'
const TEXT_KEY = 'dev-outline-text'
const DIVS_KEY = 'dev-outline-divs'
const HIDDEN_KEY = 'dev-outline-hidden'

// the keys predate the app: '1' or '0' then, true or false now
const flag = (key, fallback) => {
  const value = readSession(key, fallback)

  return value === true || value === 1
}

const source = ref(readSession(SOURCE_KEY, 'rendered') === 'initial' ? 'initial' : 'rendered')
const showText = ref(flag(TEXT_KEY, true))
const showDivs = ref(flag(DIVS_KEY, false))
const showHidden = ref(flag(HIDDEN_KEY, true))
// the tree: page elements inside, so out of Vue's reactivity
const tree = shallowRef(null)
const total = ref(0)
// what the count shows while the initial HTML loads, or why it did not
const status = ref('')
// what Copy says for a moment after it ran, in the footer
const flash = ref('')
// bumped to fold or unfold every tag (OutlineNode.vue)
const foldSignal = ref({ shut: false, at: 0 })

// bumped on every refresh: a fetch that comes back after a newer one is dropped
let runs = 0
// the tree drawn: each build is drawn afresh, its nodes read their item once
const version = ref(0)

async function refresh () {
  const run = ++runs
  let body = document.body

  if (source.value === 'initial') {
    status.value = 'Loading…'

    try {
      const response = await ownFetch(window.location.href, { cache: 'no-store', credentials: 'same-origin' })

      body = new DOMParser().parseFromString(await response.text(), 'text/html').body
    } catch {
      if (run === runs) status.value = 'Could not load the initial HTML'

      return
    }

    if (run !== runs) return
  }

  const children = childrenOf(body, showDivs.value, showHidden.value)

  tree.value = markRaw({ tag: 'body', element: body, attributes: [], children })
  version.value++
  total.value = 1 + count(children)
  status.value = ''
}

function setSource (value) {
  if (value === source.value) return

  source.value = value
  writeSession(SOURCE_KEY, value)
  clearHighlights()
  refresh()
}

function toggleText () {
  showText.value = !showText.value
  writeSession(TEXT_KEY, showText.value)
}

// the tree is built again, with or without them
function toggleDivs () {
  showDivs.value = !showDivs.value
  writeSession(DIVS_KEY, showDivs.value)
  refresh()
}

// the tree is built again, with or without them
function toggleHidden () {
  showHidden.value = !showHidden.value
  writeSession(HIDDEN_KEY, showHidden.value)
  refresh()
}

function foldAll (shut) {
  foldSignal.value = { shut, at: Date.now() }
}

async function copyHtml () {
  flash.value = await copyText(toHtml(tree.value) + '\n', root) ? 'Outline copied as HTML' : 'Copy failed'
  setTimeout(() => { flash.value = '' }, 1500)
}

const menu = computed(() => [
  { label: 'Expand all', action: () => foldAll(false), disabled: !tree.value },
  { label: 'Collapse all', action: () => foldAll(true), disabled: !tree.value },
  { separator: true },
  { label: 'Copy as HTML', action: copyHtml, disabled: !tree.value }
])

const sources = [
  { value: 'rendered', label: 'Rendered', title: 'The page as it is now, after scripts' },
  { value: 'initial', label: 'Initial', title: 'The HTML the server sends, before any script runs' }
]

onMounted(refresh)
onBeforeUnmount(clearHighlights)
</script>

<template>
  <SidePanel title="Outline" side="left" width-key="dev-outline-width" @close="emit('close')">
    <template #count>{{ status || total }}</template>

    <template #actions>
      <Button variant="ghost" size="icon-sm" aria-label="Refresh" title="Read the page again" @click="refresh">
        <RefreshCwIcon />
      </Button>
      <PopMenu :items="menu">
        <template #trigger="{ toggle, open }">
          <Button variant="ghost" size="icon-sm" aria-label="More" title="More" :aria-expanded="open" @click="toggle">
            <EllipsisIcon />
          </Button>
        </template>
      </PopMenu>
    </template>

    <template #header>
      <!-- which HTML: the page as it is now, or as the server sent it; and
           what of it to show beside the semantic tags -->
      <div class="flex items-center gap-1.5">
        <div class="bg-muted flex gap-0.5 rounded-md p-0.5" role="tablist" aria-label="Source">
          <button
            v-for="item in sources"
            :key="item.value"
            type="button"
            role="tab"
            :aria-selected="source === item.value"
            class="rounded-sm px-2.5 py-1 text-xs"
            :class="source === item.value ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
            :title="item.title"
            @click="setSource(item.value)">{{ item.label }}</button>
        </div>

        <div class="ml-auto flex gap-1">
          <Toggle size="sm" variant="outline" class="h-7 px-2 text-xs" :model-value="showText" title="The text inside the tags" @update:model-value="toggleText">Text</Toggle>
          <Toggle size="sm" variant="outline" class="h-7 px-2 text-xs" :model-value="showDivs" title="The divs too, to see the page's structure" @update:model-value="toggleDivs">Divs</Toggle>
          <Toggle size="sm" variant="outline" class="h-7 px-2 text-xs" :model-value="showHidden" :disabled="source !== 'rendered'" title="The elements that render no box, dimmed" @update:model-value="toggleHidden">Hidden</Toggle>
        </div>
      </div>
    </template>

    <div class="py-2 pr-3 pl-1 font-mono text-[11px] leading-5" @mouseleave="clearHighlights">
      <ul v-if="tree">
        <OutlineNode :key="version" :item="tree" :show-text="showText" :laid-out="source === 'rendered'" :fold-signal="foldSignal" />
      </ul>
    </div>

    <template v-if="flash" #footer>
      <p class="text-xs">{{ flash }}</p>
    </template>
  </SidePanel>
</template>
