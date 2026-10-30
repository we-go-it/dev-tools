<script setup>
import { computed, nextTick, ref, watch } from 'vue'

import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

import EasingEditor from './EasingEditor.vue'
import { changeUnit, markMissing, revealToken, setToken, stepToken, store, unitOf, unitsFor, valueAt } from './store'
import { toHex } from './tokens'

// A token's value, in one field, as the browser's devtools edit one. The text
// is what is set, and takes anything; what its kind of value gets sits around
// it: a colour's swatch (the colour picker) or an easing's curve (its editor)
// before it, a length's or a duration's unit after it, converting as it
// switches. ↑ / ↓ step a number (Shift ×10, Alt ×0.1).
//
// Ctrl+Space lists the other tokens matching the `--…` (on its own or in
// `var(--…`) right before the caret — those starting with it first, all of
// them with no fragment there — each with its value on this tab; typing on
// filters it. Picking one puts `var(--name)` in place of the fragment (or at
// the caret), adding the var( and the closing ) where missing, and applies it.
//
// Cmd/Ctrl+click on a --name goes to that token (store.js revealToken).
//
// A var() of a variable nothing defines is struck through. An input's text is
// all one style, so the text is drawn again behind it, struck there, the
// field's own made transparent, and kept scrolled with it.
const props = defineProps({
  token: { type: Object, required: true }
})

const input = ref(null)
const mirror = ref(null)
const open = ref(false)
const items = ref([])
const index = ref(0)
// where the fragment is in the text: [start, end]
let range = null

const value = computed(() => valueAt(props.token).value)
const units = computed(() => (props.token.unit !== null ? unitsFor(props.token) : []))
// what's in the field: Vue sets a bound value again on every render, so bound
// to the token's it would undo what's typed whenever the list opens or moves
const text = ref(value.value)

watch(value, current => { text.value = current })

const runs = computed(() => markMissing(text.value))
const missingTitle = computed(() => runs.value && `Not defined: ${runs.value.filter(run => run.missing).map(run => run.missing).join(', ')}`)

function sync () {
  if (mirror.value) mirror.value.scrollLeft = input.value.scrollLeft
}

watch(runs, sync, { flush: 'post' })

function typed () {
  text.value = input.value.value

  if (open.value) suggest(false)
}

// `all`: with no fragment before the caret, list every token rather than none
function suggest (all) {
  const field = input.value
  const before = field.value.slice(0, field.selectionStart)
  const match = before.match(/(var\(\s*)?(--[\w-]*)$/) ?? (all ? [ '', '', '' ] : null)

  if (!match) return close()

  const fragment = match[2].toLowerCase()
  const seen = new Map()

  store.tokens.forEach(other => {
    if (other.name === props.token.name || seen.has(other.name)) return

    const lower = other.name.toLowerCase()

    if (!lower.includes(fragment)) return

    seen.set(other.name, {
      name: other.name, value: valueAt(other).value, starts: lower.startsWith(fragment)
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

  if (open.value) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      index.value = (index.value + (event.key === 'ArrowDown' ? 1 : -1) + items.value.length) % items.value.length
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      pick(items.value[index.value].name)
    } else if (event.key === 'Escape') {
      // the list goes, not the panel
      event.stopPropagation()
      close()
    }

    return
  }

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    const multiplier = event.shiftKey ? 10 : event.altKey ? 0.1 : 1

    if (stepToken(props.token, event.key === 'ArrowUp' ? 1 : -1, multiplier)) event.preventDefault()
  } else if (event.key === 'Enter') {
    setToken(props.token, input.value.value)
  }
}

function pick (name) {
  const field = input.value
  const [ start, end ] = range
  const after = field.value.slice(end)
  // `var(` typed or not, it goes back as var(--name); a `)` already after it is kept
  const reference = `var(${name}${after.trimStart().startsWith(')') ? '' : ')'}`

  text.value = field.value.slice(0, start) + reference + after
  close()
  setToken(props.token, text.value)
}

// the --name the click landed on, if Cmd or Ctrl was held: its token shown,
// in view and focused
function jump (event) {
  close()

  if (!event.metaKey && !event.ctrlKey) return

  const field = input.value
  const at = field.selectionStart
  const name = [ ...field.value.matchAll(/--[\w-]+/g) ].find(match => match.index <= at && at <= match.index + match[0].length)?.[0]
  const token = name && revealToken(name, props.token.selector)

  if (!token || token === props.token) return

  nextTick(() => {
    const target = field.getRootNode().getElementById(`dev-token${token.id}`)

    target?.scrollIntoView({ block: 'center' })
    target?.focus()
  })
}

function close () {
  open.value = false
}
</script>

<template>
  <div class="relative min-w-0">
    <div
      class="border-input focus-within:border-ring focus-within:ring-ring/50 bg-background flex h-8 items-center rounded-md border shadow-xs focus-within:ring-3">
      <EasingEditor v-if="props.token.type === 'easing'" :token="props.token" class="ml-1" />

      <!-- the swatch is the colour picker, laid over it -->
      <label
        v-if="props.token.type === 'color'"
        class="relative ml-1.5 size-5 flex-none cursor-pointer overflow-hidden rounded-sm border shadow-xs"
        :style="{ background: value }"
        :title="`Pick ${props.token.name}`">
        <input
          type="color"
          class="absolute inset-0 size-full cursor-pointer opacity-0"
          :value="toHex(value)"
          :aria-label="`${props.token.name} colour`"
          @input="setToken(props.token, $event.target.value)">
      </label>

      <div class="relative h-full min-w-0 flex-1">
        <div
          v-if="runs"
          ref="mirror"
          class="pointer-events-none absolute inset-0 flex items-center overflow-hidden px-2 font-mono text-xs whitespace-pre"
          aria-hidden="true">
          <span v-for="(run, i) in runs" :key="i" :class="run.missing && 'text-muted-foreground decoration-destructive line-through'">{{ run.text }}</span>
        </div>

        <input
          :id="`dev-token${props.token.id}`"
          ref="input"
          class="placeholder:text-muted-foreground h-full w-full bg-transparent px-2 font-mono text-xs outline-none"
          :class="runs && 'caret-foreground text-transparent'"
          :title="missingTitle || undefined"
          :value="text"
          role="combobox"
          autocomplete="off"
          aria-autocomplete="list"
          :aria-expanded="open"
          spellcheck="false"
          placeholder="not set"
          @input="typed"
          @click="jump"
          @keydown="key"
          @blur="close"
          @scroll="sync"
          @change="setToken(props.token, $event.target.value)">
      </div>

      <!-- lengths and durations switch unit, converting where they can -->
      <NativeSelect
        v-if="units.length"
        wrapper-class="h-full flex-none"
        icon-class="right-1.5 size-3"
        class="text-muted-foreground h-full rounded-none border-0 border-l bg-transparent py-0 pr-6 pl-2 text-[11px] shadow-none focus-visible:ring-0"
        :model-value="unitOf(props.token)"
        :aria-label="`${props.token.name} unit`"
        @update:model-value="unit => changeUnit(props.token, unit)">
        <NativeSelectOption v-for="unit in units" :key="unit" :value="unit">{{ unit }}</NativeSelectOption>
      </NativeSelect>
    </div>

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
