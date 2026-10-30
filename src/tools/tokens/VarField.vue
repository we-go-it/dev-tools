<script setup>
import { computed, ref, watch } from 'vue'

import { markMissing, store, valueAt } from './store'

// The Add variable form's value, with the list ValueField.vue opens for
// var(): the tokens matching the `--…` (on its own or in `var(--…`) right
// before the caret — those starting with it first — each with its value on
// this tab. It opens as a `--` is typed; Ctrl+Space lists them all, with no
// fragment there. Picking one puts `var(--name)` in place of the fragment (or
// at the caret), adding the var( and the closing ) where missing. A var() of
// a variable nothing defines is struck through, as in ValueField.vue.
const model = defineModel({ type: String, default: '' })

const input = ref(null)
const mirror = ref(null)
const open = ref(false)
const items = ref([])
const index = ref(0)
// where the fragment is in the text: [start, end]
let range = null

const runs = computed(() => markMissing(model.value))
const missingTitle = computed(() => runs.value && `Not defined: ${runs.value.filter(run => run.missing).map(run => run.missing).join(', ')}`)

function sync () {
  if (mirror.value) mirror.value.scrollLeft = input.value.scrollLeft
}

watch(runs, sync, { flush: 'post' })

// `all`: with no fragment before the caret, list every token rather than none
function suggest (all) {
  const field = input.value
  const before = field.value.slice(0, field.selectionStart)
  const match = before.match(/(var\(\s*)?(--[\w-]*)$/) ?? (all ? [ '', '', '' ] : null)

  if (!match) return close()

  const fragment = match[2].toLowerCase()
  const seen = new Map()

  store.tokens.forEach(token => {
    if (seen.has(token.name)) return

    const lower = token.name.toLowerCase()

    if (!lower.includes(fragment)) return

    seen.set(token.name, {
      name: token.name, value: valueAt(token).value, starts: lower.startsWith(fragment)
    })
  })

  items.value = [ ...seen.values() ]
    .sort((a, b) => (b.starts - a.starts) || a.name.localeCompare(b.name))
    .slice(0, 8)
  range = [ before.length - match[0].length, before.length ]
  index.value = 0
  open.value = items.value.length > 0
}

function key (event) {
  if (event.code === 'Space' && event.ctrlKey) {
    event.preventDefault()

    return suggest(true)
  }

  if (!open.value) return

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    index.value = (index.value + (event.key === 'ArrowDown' ? 1 : -1) + items.value.length) % items.value.length
  } else if (event.key === 'Enter' || event.key === 'Tab') {
    // picked, not the form sent
    event.preventDefault()
    pick(items.value[index.value].name)
  } else if (event.key === 'Escape') {
    // the list goes, not the panel
    event.stopPropagation()
    close()
  }
}

function pick (name) {
  const field = input.value
  const [ start, end ] = range
  const after = field.value.slice(end)
  // `var(` typed or not, it goes back as var(--name); a `)` already after it is kept
  const reference = `var(${name}${after.trimStart().startsWith(')') ? '' : ')'}`
  const caret = start + reference.length

  model.value = field.value.slice(0, start) + reference + after
  close()
  // the caret after what was put in, once the field has it
  requestAnimationFrame(() => field.setSelectionRange(caret, caret))
}

function close () {
  open.value = false
}
</script>

<template>
  <div class="relative min-w-0">
    <div
      v-if="runs"
      ref="mirror"
      class="pointer-events-none absolute inset-x-0 top-0 flex h-8 items-center overflow-hidden rounded-md border border-transparent px-3 font-mono text-xs whitespace-pre"
      aria-hidden="true">
      <span v-for="(run, i) in runs" :key="i" :class="run.missing && 'text-muted-foreground decoration-destructive line-through'">{{ run.text }}</span>
    </div>

    <input
      ref="input"
      v-model="model"
      class="border-input focus-visible:border-ring focus-visible:ring-ring/50 placeholder:text-muted-foreground h-8 w-full min-w-0 rounded-md border bg-transparent px-3 font-mono text-xs shadow-xs outline-none focus-visible:ring-3"
      :class="runs && 'caret-foreground text-transparent'"
      :title="missingTitle || undefined"
      placeholder="value"
      aria-label="Value"
      role="combobox"
      autocomplete="off"
      aria-autocomplete="list"
      :aria-expanded="open"
      spellcheck="false"
      @input="suggest(false)"
      @click="close"
      @keydown="key"
      @scroll="sync"
      @blur="close">

    <ul v-if="open" role="listbox" class="bg-popover absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-md border p-1 shadow-md">
      <li
        v-for="(item, i) in items"
        :key="item.name"
        role="option"
        :aria-selected="i === index"
        class="flex cursor-pointer items-baseline gap-2 rounded-sm px-2 py-1"
        :class="i === index && 'bg-accent'"
        @mousedown.prevent="pick(item.name)"
        @mouseenter="index = i">
        <span class="font-mono text-xs">{{ item.name }}</span>
        <small class="text-muted-foreground ml-auto truncate font-mono text-[10px]">{{ item.value }}</small>
      </li>
    </ul>
  </div>
</template>
