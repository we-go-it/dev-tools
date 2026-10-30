<script setup>
import { XIcon } from '@lucide/vue'
import { onMounted, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { readSession, writeSession } from '@/lib/storage'

// A tool's panel down one side of the window, over the page but not modal:
// the page stays usable beside it. Its inner edge drags to resize it (from
// 280px to all but a strip of the page), a double click puts back the
// default; the width is kept for the session, under widthKey. Escape closes it
// while the focus is in it. The header's sides are inset like the list's
// rows: px-4 by default, `inset` for another (Tokens' groups sit at px-2).
const props = defineProps({
  title: { type: String, required: true },
  side: { type: String, default: 'right' },
  widthKey: { type: String, required: true },
  inset: { type: String, default: 'px-4' }
})

const emit = defineEmits([ 'close' ])

const MIN_WIDTH = 280
const PAGE_STRIP = 40

const panel = ref(null)
const width = ref(Number(readSession(props.widthKey, 0)) || null)
const dragging = ref(false)

function startDrag (event) {
  if (event.button !== 0) return

  event.preventDefault()

  const handle = event.currentTarget

  const move = moved => {
    const fromEdge = props.side === 'right' ? window.innerWidth - moved.clientX : moved.clientX

    width.value = Math.round(Math.min(Math.max(fromEdge, MIN_WIDTH), window.innerWidth - PAGE_STRIP))
  }

  const end = () => {
    handle.removeEventListener('pointermove', move)
    handle.removeEventListener('pointerup', end)
    handle.removeEventListener('pointercancel', end)
    dragging.value = false
    writeSession(props.widthKey, width.value)
  }

  handle.setPointerCapture(event.pointerId)
  dragging.value = true
  handle.addEventListener('pointermove', move)
  handle.addEventListener('pointerup', end)
  handle.addEventListener('pointercancel', end)
}

function resetWidth () {
  width.value = null
  writeSession(props.widthKey, null)
}

// the focus goes in, so Escape and the panel's own keys work at once
onMounted(() => panel.value?.focus({ preventScroll: true }))
</script>

<template>
  <section
    ref="panel"
    data-panel
    role="dialog"
    aria-modal="false"
    :aria-label="title"
    tabindex="-1"
    class="fixed inset-y-0 flex max-w-screen flex-col shadow-2xl outline-none"
    :class="side === 'right' ? 'right-0 border-l' : 'left-0 border-r'"
    :style="{ width: width ? `${width}px` : 'min(28rem, 100vw)' }"
    @keydown.escape="emit('close')">
    <div
      class="hover:bg-highlight/30 absolute inset-y-0 z-20 w-1.5 cursor-ew-resize touch-none"
      :class="[ side === 'right' ? '-left-[3px]' : '-right-[3px]', dragging && 'bg-highlight/30' ]"
      title="Drag to resize, double click to reset"
      aria-hidden="true"
      @pointerdown="startDrag"
      @dblclick="resetWidth" />

    <header class="grid gap-2.5 border-b py-4" :class="inset">
      <div class="flex items-center gap-2">
        <h2 class="text-base font-semibold">{{ title }}</h2>
        <span class="text-muted-foreground text-xs"><slot name="count" /></span>
        <div class="ml-auto flex items-center gap-1">
          <slot name="actions" />
          <Button variant="ghost" size="icon-sm" aria-label="Close" title="Close (Escape)" @click="emit('close')">
            <XIcon />
          </Button>
        </div>
      </div>
      <slot name="header" />
    </header>

    <!-- the list scrolls; an overlay (a sheet over the list) stays put -->
    <div class="relative min-h-0 flex-1">
      <div class="absolute inset-0 overflow-y-auto overscroll-contain">
        <slot />
      </div>
      <slot name="overlay" />
    </div>

    <footer v-if="$slots.footer" class="border-t px-4 py-2.5">
      <slot name="footer" />
    </footer>
  </section>
</template>
