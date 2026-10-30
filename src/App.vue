<script setup>
import { onBeforeUnmount, onMounted, provide } from 'vue'

import Highlights from '@/components/Highlights.vue'
import Toolbar from '@/components/Toolbar.vue'
import { matches, parseShortcut } from '@/lib/shortcuts'
import { state } from '@/lib/state'
import CachePanel from '@/tools/cache/CachePanel.vue'
import EventsPanel from '@/tools/events/EventsPanel.vue'
import FormPanel from '@/tools/form/FormPanel.vue'
import GridOverlay from '@/tools/grid/GridOverlay.vue'
import ImagesPanel from '@/tools/images/ImagesPanel.vue'
import OutlinePanel from '@/tools/outline/OutlinePanel.vue'
import SeoPanel from '@/tools/seo/SeoPanel.vue'
import TokensPanel from '@/tools/tokens/TokensPanel.vue'

// config: init()'s options, defaults filled in. root: the shadow root, for
// what has to go inside it (the clipboard's fallback textarea).
const props = defineProps({
  config: { type: Object, required: true },
  root: { type: Object, required: true }
})

provide('config', props.config)
provide('root', props.root)

// a tool the site left out (init({ tools })) has no shortcut and never shows,
// whatever state was remembered for it (the grid's, per browser)
const has = name => props.config.tools.includes(name)

const shortcuts = Object.entries(props.config.shortcuts)
  .filter(([ name ]) => name === 'toolbar' || has(name))
  .map(([ name, text ]) => [ name, parseShortcut(text) ])

function onKeydown (event) {
  const match = shortcuts.find(([ , shortcut ]) => matches(event, shortcut))

  if (!match) return

  event.preventDefault()
  state[match[0]] = !state[match[0]]
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <GridOverlay v-if="has('grid') && state.grid" />
  <Highlights />
  <TokensPanel v-if="has('tokens') && state.tokens" @close="state.tokens = false" />
  <OutlinePanel v-if="has('outline') && state.outline" @close="state.outline = false" />
  <FormPanel v-if="has('form') && state.form" @close="state.form = false" />
  <EventsPanel v-if="has('events') && state.events" @close="state.events = false" />
  <SeoPanel v-if="has('seo') && state.seo" @close="state.seo = false" />
  <ImagesPanel v-if="has('images') && state.images" @close="state.images = false" />
  <CachePanel v-if="has('cache') && state.cache" @close="state.cache = false" />
  <Toolbar />
</template>
