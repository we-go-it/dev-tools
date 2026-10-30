<script setup>
import { CopyIcon } from '@lucide/vue'
import { computed, inject, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { copyText } from '@/lib/copy'

import PayloadTree from './PayloadTree.vue'

// One event: when, where from, its name, and its main parameters inline;
// clicked, its whole payload as a tree, and a copy of it.
const props = defineProps({
  entry: { type: Object, required: true }
})

const root = inject('root')
const open = ref(false)
const copied = ref(false)

const SOURCES = {
  dataLayer: { label: 'dataLayer', class: 'bg-blue-500/15 text-blue-700' },
  ga4: { label: 'GA4', class: 'bg-emerald-500/15 text-emerald-700' },
  cf7: { label: 'CF7', class: 'bg-amber-500/20 text-amber-800' }
}

const pad = (number, size = 2) => String(number).padStart(size, '0')

const time = computed(() => {
  const date = new Date(props.entry.time)

  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`
})

// `form_id: 12 · status: mail_sent`: the first few parameters that are plain values
const summary = computed(() => Object.entries(props.entry.params ?? {})
  .filter(([ , value ]) => value === null || typeof value !== 'object')
  .slice(0, 4)
  .map(([ key, value ]) => `${key}: ${value}`)
  .join(' · '))

const payload = computed(() => (props.entry.target ? { target: props.entry.target, detail: props.entry.params } : props.entry.params))

async function copy () {
  copied.value = await copyText(JSON.stringify({ event: props.entry.name, ...(props.entry.call && { call: props.entry.call }), ...payload.value }, null, 2), root)
  setTimeout(() => { copied.value = false }, 1200)
}
</script>

<template>
  <div class="border-b last:border-b-0" :class="props.entry.previous && 'opacity-60'">
    <button
      type="button"
      class="hover:bg-muted/60 grid w-full grid-cols-[auto_auto_minmax(0,1fr)] items-baseline gap-x-2 px-4 py-1.5 text-left"
      :class="open && 'bg-muted/60'"
      :aria-expanded="open"
      @click="open = !open">
      <span class="text-muted-foreground font-mono text-[10px] tabular-nums">{{ time }}</span>
      <span class="rounded px-1.5 text-[10px] leading-4 font-semibold" :class="SOURCES[props.entry.source].class">{{ SOURCES[props.entry.source].label }}</span>
      <span class="flex min-w-0 items-baseline gap-2">
        <span class="flex-none font-mono text-xs font-semibold">{{ props.entry.name }}</span>
        <span v-if="props.entry.kind === 'gtag'" class="text-muted-foreground flex-none text-[10px]">gtag</span>
        <span v-if="props.entry.early" class="text-muted-foreground flex-none text-[10px]" title="Before the dev tools loaded">early</span>
        <span class="text-muted-foreground min-w-0 truncate font-mono text-[11px]">{{ props.entry.target || summary }}</span>
      </span>
    </button>

    <div v-if="open" class="bg-muted/30 relative px-4 py-2">
      <p v-if="props.entry.call" class="text-muted-foreground mb-1 font-mono text-[11px]">{{ props.entry.call }}</p>
      <p v-if="props.entry.url" class="text-muted-foreground mb-1 truncate pr-6 font-mono text-[10px]" :title="props.entry.url">{{ props.entry.url }}</p>
      <PayloadTree :value="payload" />
      <Button size="icon-xs" variant="ghost" class="absolute top-1.5 right-2" :title="copied ? 'Copied' : 'Copy as JSON'" aria-label="Copy as JSON" @click="copy">
        <CopyIcon />
      </Button>
    </div>
  </div>
</template>
