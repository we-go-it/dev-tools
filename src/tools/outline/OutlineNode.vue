<script setup>
import { ChevronRightIcon } from '@lucide/vue'
import { computed, ref, watch } from 'vue'

import { clearHighlights, drawHighlights } from '@/lib/highlights'

import { count, folded, isHidden, textOf } from './outline'

// One item of the outline (outline.js): text, a leaf tag, a tag holding only
// text (shown inline), or a tag that folds, with the count of the tags inside
// it. Hovering a row outlines its element on the page — not the initial
// HTML's, which is not on it. Dimmed: renders no box. Yellow: needs a look.
const props = defineProps({
  item: { type: Object, required: true },
  showText: { type: Boolean, default: true },
  // the page's own elements: laid out, so they can be dimmed and outlined
  laidOut: { type: Boolean, default: true },
  foldSignal: { type: Object, required: true }
})

const item = props.item
const isText = item.text !== undefined
const onlyText = !isText && item.children.length === 1 && item.children[0].text !== undefined
const folds = !isText && item.children.length > 0 && !onlyText

const open = ref(folds && !folded.has(item.element))

watch(() => props.foldSignal, ({ shut }) => { open.value = !shut })

watch(open, isOpen => {
  if (!folds) return
  if (isOpen) folded.delete(item.element)
  else folded.add(item.element)
})

// renders no box: display: none, or inside something that is
const hidden = computed(() => props.laidOut && !isText && isHidden(item.element))
// needs a look: an svg with no name (the aria-hidden ones are not here at all)
const warning = !isText && item.tag === 'svg' && !item.element.hasAttribute('aria-label')

function highlight () {
  if (props.laidOut && item.element.ownerDocument === document) drawHighlights([ item.element ])
  else clearHighlights()
}
</script>

<template>
  <li
    v-if="isText"
    class="text-muted-foreground truncate rounded-sm pr-1 pl-5 font-sans"
    :class="!props.showText && 'hidden'">{{ item.text }}</li>

  <li v-else>
    <!-- the whole row: hovering it outlines the element, clicking a folding
         one folds it -->
    <div
      class="flex min-w-0 items-center gap-1 rounded-sm pr-1"
      :class="[
        props.laidOut ? 'hover:bg-highlight/10' : 'hover:bg-muted/60',
        folds && 'cursor-pointer',
        warning && 'bg-changed/25'
      ]"
      :title="warning ? 'svg with neither aria-label nor aria-hidden' : undefined"
      @mouseenter="highlight"
      @click="folds && (open = !open)">
      <button
        v-if="folds"
        type="button"
        class="text-muted-foreground hover:text-foreground flex size-4 flex-none items-center justify-center"
        :aria-expanded="open"
        :aria-label="open ? 'Fold' : 'Unfold'"
        @click.stop="open = !open">
        <ChevronRightIcon class="size-3 transition-transform" :class="open && 'rotate-90'" />
      </button>
      <span v-else class="w-4 flex-none" />

      <span class="flex min-w-0 flex-1 items-baseline gap-2" :class="hidden && 'opacity-45'">
        <span class="min-w-0 flex-[0_1_auto] truncate" :class="warning ? 'text-amber-700' : 'text-blue-600'">&lt;{{ item.tag }}<template v-for="[ name, value ] in item.attributes" :key="name">{{ ' ' }}<span class="text-muted-foreground">{{ name }}</span>=<span class="text-green-700">"{{ value }}"</span></template>&gt;</span>
        <span v-if="onlyText && props.showText" class="text-muted-foreground min-w-0 truncate font-sans">{{ item.children[0].text }}</span>
        <span v-else-if="item.tag === 'button' && folds && props.showText" class="text-muted-foreground min-w-0 truncate font-sans">{{ textOf(item.children) }}</span>
      </span>

      <span v-if="folds" class="text-muted-foreground/70 flex-none text-[10px] tabular-nums">{{ count(item.children) || '' }}</span>
    </div>

    <ul v-if="folds && open" class="border-border ml-2 border-l pl-1.5">
      <OutlineNode
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :show-text="props.showText"
        :laid-out="props.laidOut"
        :fold-signal="props.foldSignal" />
    </ul>
  </li>
</template>
