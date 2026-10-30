<script setup>
import { ChevronRightIcon } from '@lucide/vue'
import { ref } from 'vue'

// A payload (capture.js's snapshot()) as a foldable tree: an object's or a
// list's keys, each with its value — strings green, numbers and booleans
// blue, the rest muted. The first two levels start open.
const props = defineProps({
  value: { type: null, required: true },
  depth: { type: Number, default: 0 }
})

const isNested = value => value !== null && typeof value === 'object'
const entries = value => (Array.isArray(value) ? value.map((item, index) => [ index, item ]) : Object.entries(value))
const size = value => (Array.isArray(value) ? `[${value.length}]` : `{${Object.keys(value).length}}`)

const open = ref(Object.fromEntries(entries(props.value).map(([ key ]) => [ key, props.depth < 1 ])))
</script>

<template>
  <ul class="font-mono text-[11px] leading-5" :class="props.depth && 'border-border ml-1.5 border-l pl-2'">
    <li v-if="!entries(props.value).length" class="text-muted-foreground">(empty)</li>
    <li v-for="[ key, item ] in entries(props.value)" :key="key">
      <div v-if="isNested(item) && entries(item).length" class="flex items-center gap-1">
        <button
          type="button"
          class="hover:bg-muted -ml-1 flex min-w-0 items-center gap-1 rounded-sm px-1 text-left"
          :aria-expanded="open[key]"
          @click="open[key] = !open[key]">
          <ChevronRightIcon class="text-muted-foreground size-3 flex-none transition-transform" :class="open[key] && 'rotate-90'" />
          <span class="text-foreground">{{ key }}</span>
          <span class="text-muted-foreground">{{ size(item) }}</span>
        </button>
      </div>
      <div v-else class="flex min-w-0 gap-2 pl-4">
        <span class="text-foreground flex-none">{{ key }}</span>
        <span
          class="min-w-0 break-words"
          :class="typeof item === 'string' ? 'text-green-700' : typeof item === 'number' || typeof item === 'boolean' ? 'text-blue-600' : 'text-muted-foreground'">{{ typeof item === 'string' ? `"${item}"` : isNested(item) ? (Array.isArray(item) ? '[]' : '{}') : String(item) }}</span>
      </div>

      <PayloadTree v-if="isNested(item) && entries(item).length && open[key]" :value="item" :depth="props.depth + 1" />
    </li>
  </ul>
</template>
