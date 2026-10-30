<script setup>
import {
  ActivityIcon,
  BracesIcon,
  BugIcon,
  CodeIcon,
  DatabaseIcon,
  EyeIcon,
  Grid3x3Icon,
  ImageIcon,
  ImagesIcon,
  LanguagesIcon,
  LayersIcon,
  ListTreeIcon,
  SearchCheckIcon,
  SwatchBookIcon,
  TextCursorInputIcon,
  WrenchIcon,
  XIcon
} from '@lucide/vue'
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { labelOfShortcut } from '@/lib/shortcuts'
import { state } from '@/lib/state'

// The floating toolbar: each tool as a button, on or off, with its shortcut in
// the title. Its own shortcut shows and hides it. While it is hidden, a dot in
// the window's corner says the page has changed tokens, so it is not mistaken
// for the real thing; a click opens the tokens panel. Not while a panel is open
// on that side: it would sit on it, and the tokens panel says as much itself.
const config = inject('config')
const key = name => labelOfShortcut(config.shortcuts[name])

// those the site has (init({ tools })), in this order
const tools = [
  { name: 'grid', label: 'Grid', icon: Grid3x3Icon },
  { name: 'tokens', label: 'Tokens', icon: SwatchBookIcon },
  { name: 'outline', label: 'Outline', icon: ListTreeIcon },
  { name: 'form', label: 'Form', icon: TextCursorInputIcon },
  { name: 'events', label: 'Events', icon: ActivityIcon },
  { name: 'seo', label: 'SEO', icon: SearchCheckIcon },
  { name: 'images', label: 'Images', icon: ImagesIcon },
  { name: 'cache', label: 'Cache', icon: DatabaseIcon }
].filter(tool => config.tools.includes(tool.name))

// The site's own tools (init({ actions })), after these: the toolbar only
// shows them and calls their run(); they live in the site, keys and all. Their
// state is the site's, so it is read again as it may change: after a click,
// after any key (the site's own shortcuts), and every second while showing.
const ICONS = {
  braces: BracesIcon,
  bug: BugIcon,
  code: CodeIcon,
  database: DatabaseIcon,
  eye: EyeIcon,
  image: ImageIcon,
  languages: LanguagesIcon,
  layers: LayersIcon
}

const actions = config.actions
const pressed = ref([])

function readActions () {
  pressed.value = actions.map(action => {
    try {
      return action.pressed?.() ?? false
    } catch {
      return false
    }
  })
}

function run (action) {
  action.run()
  readActions()
}

// a key the site listens for has run by the time the frame after it comes
const onKey = () => requestAnimationFrame(readActions)
let timer = null

watch(() => state.toolbar, showing => {
  clearInterval(timer)

  if (showing && actions.length) {
    readActions()
    timer = setInterval(readActions, 1000)
  }
}, { immediate: true })

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div
    v-if="state.toolbar"
    data-panel
    role="toolbar"
    aria-label="Dev tools"
    class="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border p-1 shadow-lg">
    <span class="text-muted-foreground flex items-center px-2" :title="`Dev tools (${key('toolbar')})`">
      <WrenchIcon class="size-4" />
    </span>

    <Toggle
      v-for="tool in tools"
      :key="tool.name"
      v-model="state[tool.name]"
      size="sm"
      class="relative rounded-full"
      :title="`${tool.label} (${key(tool.name)})`">
      <component :is="tool.icon" />
      {{ tool.label }}
      <span
        v-if="tool.name === 'tokens' && state.tokensChanged"
        class="bg-changed text-foreground rounded-full px-1.5 text-[10px] leading-4 font-semibold"
        :title="`${state.tokensChanged} changed`">{{ state.tokensChanged }}</span>
      <span
        v-if="tool.name === 'events' && state.eventsUnseen && !state.events"
        class="bg-highlight absolute top-1 right-1 size-2 rounded-full"
        :title="`${state.eventsUnseen} new`" />
    </Toggle>

    <template v-if="actions.length">
      <Separator orientation="vertical" class="mx-1 !h-5" />

      <Toggle
        v-for="(action, index) in actions"
        :key="action.name ?? action.label"
        :model-value="!!pressed[index]"
        size="sm"
        class="rounded-full"
        :title="action.shortcut ? `${action.label} (${labelOfShortcut(action.shortcut)})` : action.label"
        @update:model-value="run(action)">
        <component :is="ICONS[action.icon]" v-if="ICONS[action.icon]" />
        {{ action.label }}
        <span
          v-if="typeof pressed[index] === 'string'"
          class="bg-foreground text-background rounded-full px-1.5 text-[10px] leading-4 font-semibold">{{ pressed[index] }}</span>
      </Toggle>
    </template>

    <Separator orientation="vertical" class="mx-1 !h-5" />

    <button
      type="button"
      class="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-full"
      :title="`Hide (${key('toolbar')})`"
      aria-label="Hide the dev tools"
      @click="state.toolbar = false">
      <XIcon class="size-4" />
    </button>
  </div>

  <button
    v-else-if="config.tools.includes('tokens') && state.tokensChanged && !state.tokens && !state.form"
    data-panel
    type="button"
    class="bg-changed text-foreground fixed top-3 right-3 flex size-6 items-center justify-center rounded-full text-xs font-bold shadow-md"
    :title="`${state.tokensChanged} token${state.tokensChanged === 1 ? '' : 's'} changed (${key('tokens')})`"
    :aria-label="`${state.tokensChanged} tokens changed: open the tokens panel`"
    @click="state.tokens = true">!</button>
</template>
