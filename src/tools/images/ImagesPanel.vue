<script setup>
import { ChevronRightIcon, ClockIcon, EllipsisIcon, RefreshCwIcon } from '@lucide/vue'
import { computed, inject, markRaw, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

import PopMenu from '@/components/PopMenu.vue'
import SidePanel from '@/components/SidePanel.vue'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { formatBytes } from '@/lib/bytes'
import { copyText } from '@/lib/copy'
import { clearHighlights, drawHighlights } from '@/lib/highlights'
import { readSession, writeSession } from '@/lib/storage'

import { BLURRY, fillSizes, lcp, OVERSIZED, readImages } from './images'

// Every image on the page (images.js): what it weighs against what its box
// needs, which srcset candidate the browser took, how it loads, and what
// looks wrong. Read on opening and on Refresh — lazy images arrive as the
// page scrolls. Hovering one outlines it on the page; its thumbnail scrolls
// to it; its row opens its details. A thumbnail is only ever a file the page
// has loaded already: one not loaded yet would be fetched by the panel, ahead
// of the page, and be in the cache by the time the page asked for it. Images
// with no box on the page are dimmed, or left out of the list with Hidden off
// — not of the page's weight, which they may still add to.
const emit = defineEmits([ 'close' ])

const root = inject('root')

const FILTER_KEY = 'dev-images-filter'
const ORDER_KEY = 'dev-images-order'
const HIDDEN_KEY = 'dev-images-hidden'

const images = shallowRef([])
const filter = ref(readSession(FILTER_KEY, 'all'))
const order = ref(readSession(ORDER_KEY, 'page'))
const showHidden = ref(readSession(HIDDEN_KEY, true) === true)
const open = ref(new Set())
const flash = ref('')

// the images, then the weights Resource Timing did not have, as they come
async function refresh () {
  const read = markRaw(readImages(lcp()))

  images.value = read

  if (await fillSizes(read) && images.value === read) images.value = markRaw([ ...read ])
}

onMounted(refresh)
onBeforeUnmount(clearHighlights)

// the images listed: with Hidden off, those with a box on the page
const listed = computed(() => (showHidden.value ? images.value : images.value.filter(image => image.shown)))
const withIssues = computed(() => listed.value.filter(image => image.issues.some(issue => issue.level !== 'info')))
// the page's weight in images: each file once, however many images show it
const byFile = computed(() => new Map(images.value.filter(image => image.bytes).map(image => [ image.src, image ])))
const totalBytes = computed(() => [ ...byFile.value.values() ].reduce((sum, image) => sum + image.bytes, 0))
// and what could be saved: per file, the most any of its images wastes
const totalWasted = computed(() => {
  const most = new Map()

  images.value.forEach(image => most.set(image.src, Math.max(most.get(image.src) ?? 0, image.wasted)))

  return [ ...most.values() ].reduce((sum, wasted) => sum + wasted, 0)
})

const shown = computed(() => {
  const list = filter.value === 'issues' ? withIssues.value : listed.value

  if (order.value === 'weight') return [ ...list ].sort((a, b) => (b.bytes ?? -1) - (a.bytes ?? -1))
  if (order.value === 'waste') return [ ...list ].sort((a, b) => b.wasted - a.wasted || (b.ratio ?? 0) - (a.ratio ?? 0))

  return list
})

function setFilter (value) {
  filter.value = value
  writeSession(FILTER_KEY, value)
}

function setOrder (value) {
  order.value = value
  writeSession(ORDER_KEY, value)
}

function toggleHidden () {
  showHidden.value = !showHidden.value
  writeSession(HIDDEN_KEY, showHidden.value)
}

function toggle (image) {
  const next = new Set(open.value)

  next.has(image.index) ? next.delete(image.index) : next.add(image.index)
  open.value = next
}

// outlined with what it is and what its box needs
const label = image => `${image.natural.width}×${image.natural.height} in ${image.rendered.width}×${image.rendered.height}`

let hovered = null

function hover (image) {
  hovered = image.element
  drawHighlights([ image.element ], label(image))
}

function leave () {
  hovered = null
  clearHighlights()
}

function scrollTo (image) {
  image.element.scrollIntoView({ behavior: 'smooth', block: 'center' })

  const redraw = () => {
    if (hovered === image.element) drawHighlights([ image.element ], label(image))
  }

  window.addEventListener('scrollend', redraw, { once: true })
  setTimeout(redraw, 700)
}

const FORMAT_CLASS = {
  avif: 'bg-emerald-500/15 text-emerald-700',
  webp: 'bg-emerald-500/15 text-emerald-700',
  svg: 'bg-blue-500/15 text-blue-700',
  jpg: 'bg-amber-500/20 text-amber-800',
  png: 'bg-amber-500/20 text-amber-800'
}

const ISSUE_CLASS = {
  error: 'bg-destructive/15 text-destructive',
  warning: 'bg-amber-500/20 text-amber-800',
  info: 'bg-muted text-muted-foreground'
}

async function copyReport () {
  const report = shown.value.map(({ element, ...image }) => image)

  flash.value = await copyText(JSON.stringify(report, null, 2), root) ? `${report.length} images copied as JSON` : 'Copy failed'
  setTimeout(() => { flash.value = '' }, 1500)
}

const menu = computed(() => [
  { label: 'Copy shown as JSON', action: copyReport, disabled: !shown.value.length }
])

const segments = computed(() => [
  { value: 'all', label: 'All', count: listed.value.length },
  { value: 'issues', label: 'Issues', count: withIssues.value.length }
])

const orders = [
  { value: 'page', label: 'Page order' },
  { value: 'weight', label: 'Heaviest' },
  { value: 'waste', label: 'Most oversized' }
]
</script>

<template>
  <SidePanel title="Images" side="right" width-key="dev-images-width" @close="emit('close')">
    <template #count>{{ images.length }} · {{ formatBytes(totalBytes) }} in {{ byFile.size }} file{{ byFile.size === 1 ? '' : 's' }}</template>

    <template #actions>
      <Button variant="ghost" size="icon-sm" aria-label="Refresh" title="Read the images again: lazy ones arrive as the page scrolls" @click="refresh">
        <RefreshCwIcon />
      </Button>
      <PopMenu :items="menu">
        <template #trigger="{ toggle: toggleMenu, open: menuOpen }">
          <Button variant="ghost" size="icon-sm" aria-label="More" title="More" :aria-expanded="menuOpen" @click="toggleMenu">
            <EllipsisIcon />
          </Button>
        </template>
      </PopMenu>
    </template>

    <template #header>
      <div class="flex items-center gap-2">
        <div class="bg-muted flex gap-0.5 rounded-md p-0.5" role="tablist" aria-label="Show">
          <button
            v-for="item in segments"
            :key="item.value"
            type="button"
            role="tab"
            :aria-selected="filter === item.value"
            class="flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs"
            :class="filter === item.value ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
            @click="setFilter(item.value)">
            {{ item.label }}
            <span class="text-muted-foreground text-[10px] tabular-nums">{{ item.count }}</span>
          </button>
        </div>

        <Toggle size="sm" variant="outline" class="ml-auto h-7 px-2 text-xs" :model-value="showHidden" title="The images with no box on the page, dimmed" @update:model-value="toggleHidden">Hidden</Toggle>

        <select
          :value="order"
          class="text-muted-foreground hover:text-foreground h-7 rounded-md bg-transparent px-1 text-xs outline-none"
          aria-label="Order"
          @change="setOrder($event.target.value)">
          <option v-for="item in orders" :key="item.value" :value="item.value">{{ item.label }}</option>
        </select>
      </div>

      <p v-if="totalWasted" class="text-xs text-amber-800">
        About {{ formatBytes(totalWasted) }} could be saved with images sized for their boxes.
      </p>
    </template>

    <p v-if="!shown.length" class="text-muted-foreground px-4 py-10 text-center text-sm">
      {{ filter === 'issues' ? 'No issues.' : images.length ? 'No images shown on the page.' : 'No images on this page.' }}
    </p>

    <ul @mouseleave="leave">
      <li v-for="image in shown" :key="image.index" class="border-b last:border-b-0" :class="!image.shown && 'opacity-50'">
        <div class="hover:bg-muted/50 flex gap-3 px-4 py-2" @mouseenter="hover(image)">
          <!-- its thumbnail, from the page's own loaded file: a click scrolls to it -->
          <button
            type="button"
            class="flex size-12 flex-none items-center justify-center overflow-hidden rounded-md border"
            :class="image.loaded || image.placeholder ? 'bg-[repeating-conic-gradient(#e5e5e5_0_25%,#fff_0_50%)] bg-[length:8px_8px]' : 'bg-muted'"
            :title="(image.shown ? 'Scroll to it' : 'Not shown: no box on the page') + (image.loaded || image.placeholder ? '' : ' · not loaded yet')"
            @click="scrollTo(image)">
            <img v-if="image.loaded || image.placeholder" :src="image.src" alt="" class="size-full object-cover">
            <ClockIcon v-else class="text-muted-foreground size-4" />
          </button>

          <button type="button" class="grid min-w-0 flex-1 gap-1 text-left" :aria-expanded="open.has(image.index)" @click="toggle(image)">
            <span class="flex min-w-0 items-center gap-1.5">
              <span v-if="image.format" class="flex-none rounded px-1 text-[10px] leading-4 font-semibold uppercase" :class="FORMAT_CLASS[image.format] ?? 'bg-muted text-muted-foreground'">{{ image.format }}</span>
              <span class="min-w-0 truncate font-mono text-xs font-medium" :title="image.src">{{ image.file || '(no source)' }}</span>
              <span v-if="image.lcp" class="bg-highlight flex-none rounded px-1 text-[10px] leading-4 font-semibold text-white" title="The page's Largest Contentful Paint">LCP</span>
              <ChevronRightIcon class="text-muted-foreground ml-auto size-3.5 flex-none transition-transform" :class="open.has(image.index) && 'rotate-90'" />
            </span>

            <span class="text-muted-foreground font-mono text-[11px] tabular-nums">
              <template v-if="image.loaded">{{ image.natural.width }}×{{ image.natural.height }}</template>
              <template v-else-if="image.pending">waiting</template>
              <template v-else>not loaded</template>
              → {{ image.rendered.width }}×{{ image.rendered.height }}<template v-if="image.density !== 1"> @{{ image.density }}x</template>
              · <span v-if="image.pending && image.expectedBytes" class="opacity-70" :title="`Not loaded yet: the size of ${image.file}, the candidate the browser will take for its box`">{{ formatBytes(image.expectedBytes) }} when loaded</span>
              <span v-else :title="image.bytesFrom === 'server' ? 'From the server\'s Content-Length: the browser kept no timing for it' : undefined">{{ formatBytes(image.bytes) }}</span>
              · {{ image.lazy ?? 'eager' }}
            </span>

            <span v-if="image.issues.length || image.placeholder" class="flex flex-wrap gap-1">
              <span v-if="image.placeholder" class="bg-muted text-muted-foreground rounded px-1.5 text-[10px] leading-4" title="Still the inline placeholder: the image has not loaded">placeholder</span>
              <span v-for="issue in image.issues" :key="issue.key" class="rounded px-1.5 text-[10px] leading-4 font-medium" :class="ISSUE_CLASS[issue.level]">{{ issue.label }}</span>
            </span>
          </button>
        </div>

        <!-- what decided it: the box, the candidates, the attributes -->
        <div v-if="open.has(image.index)" class="bg-muted/30 grid gap-2 px-4 py-2 text-xs">
          <p v-if="image.ratio !== null" class="text-muted-foreground">
            Its box needs {{ image.needed.width }}×{{ image.needed.height }} px at {{ image.density }}x: the image has
            <span :class="image.ratio > OVERSIZED ? 'text-amber-800' : image.ratio < BLURRY ? 'text-amber-800' : 'text-emerald-700'">×{{ image.ratio.toFixed(2) }}</span>
            of that<template v-if="image.wasted">, about {{ formatBytes(image.wasted) }} more than it needs</template>.
          </p>

          <div v-if="image.candidates.length">
            <p class="text-muted-foreground mb-0.5">srcset <span class="tabular-nums">{{ image.candidates.length }}</span></p>
            <p
              v-for="candidate in image.candidates"
              :key="candidate.url"
              class="truncate font-mono text-[11px]"
              :class="candidate.chosen ? 'text-foreground font-semibold' : 'text-muted-foreground'"
              :title="candidate.media ? `${candidate.url} (${candidate.media})` : candidate.url">{{ candidate.chosen ? '→ ' : '' }}<template v-if="candidate.type">{{ candidate.type }} · </template>{{ candidate.descriptor || '1x' }} · {{ candidate.url.split('/').pop() }}</p>
          </div>

          <div class="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-3 gap-y-0.5">
            <template v-for="(value, name) in image.attributes" :key="name">
              <span class="text-muted-foreground">{{ name }}</span>
              <span class="truncate font-mono text-[11px]" :class="value === null && 'text-muted-foreground'" :title="value ?? ''">{{ value === null ? '—' : value === '' ? '""' : value }}</span>
            </template>
            <span class="text-muted-foreground">current</span>
            <span class="truncate font-mono text-[11px]" :title="image.src">{{ image.src }}</span>
          </div>
        </div>
      </li>
    </ul>

    <template v-if="flash" #footer>
      <p class="text-xs">{{ flash }}</p>
    </template>
  </SidePanel>
</template>
