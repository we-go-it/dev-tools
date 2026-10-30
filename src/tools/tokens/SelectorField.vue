<script setup>
import { ref } from 'vue'

import { isOwn } from '@/lib/page'

import { store } from './store'
import { ROOT } from './tokens'

// The Add variable form's selector, with the list ValueField.vue opens for
// var(): :root, the selectors tokens are on already (with how many), then
// every class on the page's elements (with on how many), read afresh each
// time the field is focused. Typing lists those holding what's typed, those
// starting with it first; Ctrl+Space or ↓ lists them all, to go through.
const model = defineModel({ type: String, default: '' })

const input = ref(null)
const open = ref(false)
const items = ref([])
const index = ref(0)
// [{ selector, note }]: what there is to suggest
let all = []

function read () {
  const tokens = new Map()
  const classes = new Map()

  store.tokens.forEach(token => tokens.set(token.selector, (tokens.get(token.selector) ?? 0) + 1))
  document.querySelectorAll('[class]').forEach(element => {
    if (isOwn(element)) return

    element.classList.forEach(name => {
      const selector = `.${CSS.escape(name)}`

      classes.set(selector, (classes.get(selector) ?? 0) + 1)
    })
  })

  const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`

  all = [
    { selector: ROOT, note: plural(tokens.get(ROOT) ?? 0, 'token') },
    ...[ ...tokens ].filter(([ selector ]) => selector !== ROOT).sort(([ a ], [ b ]) => a.localeCompare(b))
      .map(([ selector, count ]) => ({ selector, note: plural(count, 'token') })),
    ...[ ...classes ].filter(([ selector ]) => !tokens.has(selector)).sort(([ a ], [ b ]) => a.localeCompare(b))
      .map(([ selector, count ]) => ({ selector, note: plural(count, 'element') }))
  ]
}

// `everything`: whatever is typed, list them all
function suggest (everything) {
  const typed = everything ? '' : model.value.trim().toLowerCase()
  const matching = all.filter(item => item.selector.toLowerCase().includes(typed))

  items.value = typed
    ? matching.sort((a, b) => b.selector.toLowerCase().startsWith(typed) - a.selector.toLowerCase().startsWith(typed))
    : matching
  index.value = 0
  open.value = items.value.length > 0
}

function key (event) {
  if ((event.code === 'Space' && event.ctrlKey) || (!open.value && event.key === 'ArrowDown')) {
    event.preventDefault()

    return suggest(true)
  }

  if (!open.value) return

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    index.value = (index.value + (event.key === 'ArrowDown' ? 1 : -1) + items.value.length) % items.value.length
    // the one chosen in view, the list scrolling
    input.value.parentElement.querySelector(`[data-index="${index.value}"]`)?.scrollIntoView({ block: 'nearest' })
  } else if (event.key === 'Enter' || event.key === 'Tab') {
    // picked, not the form sent
    event.preventDefault()
    pick(items.value[index.value].selector)
  } else if (event.key === 'Escape') {
    // the list goes, not the panel
    event.stopPropagation()
    close()
  }
}

function pick (selector) {
  model.value = selector
  close()
}

function close () {
  open.value = false
}
</script>

<template>
  <div class="relative min-w-0">
    <input
      ref="input"
      v-model="model"
      class="border-input focus-visible:border-ring focus-visible:ring-ring/50 placeholder:text-muted-foreground h-8 w-full min-w-0 rounded-md border bg-transparent px-3 font-mono text-xs shadow-xs outline-none focus-visible:ring-3"
      placeholder=":root"
      aria-label="Selector it is set on"
      role="combobox"
      autocomplete="off"
      aria-autocomplete="list"
      :aria-expanded="open"
      spellcheck="false"
      @focus="read"
      @input="suggest(false)"
      @click="close"
      @keydown="key"
      @blur="close">

    <ul v-if="open" role="listbox" class="bg-popover absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-md border p-1 shadow-md">
      <li
        v-for="(item, i) in items"
        :key="item.selector"
        role="option"
        :data-index="i"
        :aria-selected="i === index"
        class="flex cursor-pointer items-baseline gap-2 rounded-sm px-2 py-1"
        :class="i === index && 'bg-accent'"
        @mousedown.prevent="pick(item.selector)"
        @mouseenter="index = i">
        <span class="min-w-0 truncate font-mono text-xs">{{ item.selector }}</span>
        <small class="text-muted-foreground ml-auto flex-none font-mono text-[10px]">{{ item.note }}</small>
      </li>
    </ul>
  </div>
</template>
