<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

import { setToken, valueAt } from './store'
import { parseBezier, parseLinear } from './tokens'

// An easing token: its curve as a swatch in the value field, opening the
// editor below it, over the rows that follow; a click outside or Escape closes it. A cubic-bezier's
// two handles drag, in the unit square 100 across, with room above and below
// for handles that overshoot (y from -0.35 to 1.35). A linear() is traced, not
// edited: type over it.
const props = defineProps({
  token: { type: Object, required: true }
})

const editor = ref(null)
const svg = ref(null)
const open = ref(false)
const points = ref(parseBezier(valueAt(props.token).value))
const dragging = ref(null)

const value = computed(() => valueAt(props.token).value)
const traced = computed(() => !!parseLinear(value.value))

watch(value, current => {
  if (dragging.value === null) points.value = parseBezier(current)
})

const px = index => points.value[index] * 100
const py = index => 100 - points.value[index] * 100

// an easing's curve, in the editor's viewBox
function curveOf (easing) {
  const linear = parseLinear(easing)

  if (linear) return 'M' + linear.map(([ x, y ]) => `${x * 100},${100 - y * 100}`).join(' L')

  const [ x1, y1, x2, y2 ] = parseBezier(easing)

  return `M0,100 C${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`
}

const path = computed(() => traced.value
  ? curveOf(value.value)
  : `M0,100 C${px(0)},${py(1)} ${px(2)},${py(3)} 100,0`)

function start (index, event) {
  dragging.value = index
  event.target.setPointerCapture(event.pointerId)
}

function move (event) {
  if (dragging.value === null) return

  // screen to the viewBox (-10 -35 120 170)
  const box = svg.value.getBoundingClientRect()
  const x = ((event.clientX - box.left) / box.width) * 120 - 10
  const y = ((event.clientY - box.top) / box.height) * 170 - 35
  const round = n => Math.round(n * 100) / 100
  const next = [ ...points.value ]

  next[dragging.value] = round(Math.min(1, Math.max(0, x / 100)))
  next[dragging.value + 1] = round(Math.min(1.35, Math.max(-0.35, (100 - y) / 100)))
  points.value = next

  setToken(props.token, `cubic-bezier(${next.join(', ')})`)
}

function end () {
  dragging.value = null
}

// outside: anywhere the event's path does not cross the editor, the page
// included (the path goes into the shadow root)
function onPointerDown (event) {
  if (!event.composedPath().includes(editor.value)) open.value = false
}

watch(open, isOpen => {
  if (isOpen) window.addEventListener('pointerdown', onPointerDown, true)
  else window.removeEventListener('pointerdown', onPointerDown, true)
})

onBeforeUnmount(() => window.removeEventListener('pointerdown', onPointerDown, true))
</script>

<template>
  <div ref="editor" class="relative flex-none" @keydown.escape.stop="open = false">
    <button
      type="button"
      class="hover:bg-muted flex size-6 items-center justify-center rounded-sm"
      :aria-expanded="open"
      :aria-label="`Edit ${props.token.name}`"
      @click="open = !open">
      <svg viewBox="-10 -35 120 170" class="h-5 w-4 overflow-visible" aria-hidden="true">
        <path :d="curveOf(value)" class="fill-none stroke-current" stroke-width="8" />
      </svg>
    </button>

    <div v-if="open" class="bg-popover absolute top-full left-0 z-20 mt-1 flex w-56 flex-col gap-2 rounded-md border p-3 shadow-lg">
      <svg
        ref="svg"
        viewBox="-10 -35 120 170"
        class="w-full touch-none overflow-visible"
        @pointermove="move"
        @pointerup="end"
        @pointercancel="end">
        <rect x="0" y="0" width="100" height="100" class="fill-muted stroke-border" stroke-width="1" />
        <path :d="path" class="stroke-foreground fill-none" stroke-width="2.5" />
        <g v-if="!traced">
          <line :x1="0" :y1="100" :x2="px(0)" :y2="py(1)" class="stroke-highlight" stroke-width="1.5" />
          <line :x1="100" :y1="0" :x2="px(2)" :y2="py(3)" class="stroke-highlight" stroke-width="1.5" />
          <circle r="5" :cx="px(0)" :cy="py(1)" class="fill-highlight cursor-grab" @pointerdown="start(0, $event)" />
          <circle r="5" :cx="px(2)" :cy="py(3)" class="fill-highlight cursor-grab" @pointerdown="start(2, $event)" />
        </g>
      </svg>

      <!-- a dot crossing back and forth with the easing -->
      <span class="bg-muted relative block h-2 overflow-hidden rounded-full" aria-hidden="true">
        <span class="easing-preview bg-foreground absolute top-0 left-0 size-2 rounded-full" :style="{ animationTimingFunction: value }" />
      </span>
    </div>
  </div>
</template>

