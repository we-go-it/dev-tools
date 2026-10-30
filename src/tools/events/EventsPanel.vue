<script setup>
import { CircleIcon, EllipsisIcon, PauseIcon, SearchIcon, Trash2Icon } from '@lucide/vue'
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'

import PopMenu from '@/components/PopMenu.vue'
import SidePanel from '@/components/SidePanel.vue'
import { Button } from '@/components/ui/button'
import { copyText } from '@/lib/copy'
import { state } from '@/lib/state'

import { clear, log } from './capture'
import EventRow from './EventRow.vue'

// Analytics and form events as they happen (capture.js): the dataLayer's
// pushes, the GA4 hits sent, and CF7's DOM events, oldest first, a divider at
// each page. Like a
// console: while scrolled to the bottom it stays there as events come in.
const emit = defineEmits([ 'close' ])

const root = inject('root')

const SOURCES = [
  { value: 'all', label: 'All' },
  { value: 'dataLayer', label: 'dataLayer' },
  { value: 'ga4', label: 'GA4' },
  { value: 'cf7', label: 'CF7' }
]

const source = ref('all')
const query = ref('')
const flash = ref('')
const list = ref(null)

// what is shown: the filters, and gtm.* unless asked for. A page divider stays
// while anything of its page does.
const shown = computed(() => {
  const text = query.value.trim().toLowerCase()
  const keep = entry => (source.value === 'all' || entry.source === source.value)
    && !(log.hideGtm && entry.name.startsWith('gtm.'))
    && (!text || entry.name.toLowerCase().includes(text) || JSON.stringify(entry.params ?? {}).toLowerCase().includes(text))

  const result = []
  let divider = null

  log.entries.forEach(entry => {
    if (entry.source === 'page') {
      divider = entry

      return
    }

    if (!keep(entry)) return

    if (divider) {
      result.push(divider)
      divider = null
    }

    result.push(entry)
  })

  return result
})

const count = name => log.entries.filter(entry => entry.source !== 'page' && (name === 'all' || entry.source === name)).length

// the list's scroller (the panel's), and whether it sits at the bottom
const scroller = () => list.value?.parentElement
let atBottom = true

function onScroll () {
  const element = scroller()

  atBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 24
}

const toBottom = () => nextTick(() => {
  const element = scroller()

  if (element) element.scrollTop = element.scrollHeight
})

watch(() => shown.value.length, () => {
  if (atBottom) toBottom()
})

onMounted(() => {
  state.eventsUnseen = 0
  scroller()?.addEventListener('scroll', onScroll, { passive: true })
  toBottom()
})

async function copyLog () {
  const events = shown.value.filter(entry => entry.source !== 'page')
    .map(({ time, source: from, name, call, target, url, params }) => ({ time: new Date(time).toISOString(), source: from, name, call, target, url, params }))

  flash.value = await copyText(JSON.stringify(events, null, 2), root) ? `${events.length} events copied as JSON` : 'Copy failed'
  setTimeout(() => { flash.value = '' }, 1500)
}

const menu = computed(() => [
  { label: 'Preserve log on reload', checked: log.preserve, action: () => { log.preserve = !log.preserve } },
  { label: 'Hide gtm.* events', checked: log.hideGtm, action: () => { log.hideGtm = !log.hideGtm } },
  { separator: true },
  { label: 'Copy shown as JSON', action: copyLog, disabled: !shown.value.length }
])

const pad = number => String(number).padStart(2, '0')
const clock = time => {
  const date = new Date(time)

  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
</script>

<template>
  <SidePanel title="Events" side="right" width-key="dev-events-width" @close="emit('close')">
    <template #count>{{ count('all') }}</template>

    <template #actions>
      <Button
        variant="ghost"
        size="icon-sm"
        :aria-pressed="log.recording"
        :aria-label="log.recording ? 'Pause recording' : 'Record'"
        :title="log.recording ? 'Recording: click to pause' : 'Paused: click to record'"
        @click="log.recording = !log.recording">
        <CircleIcon v-if="log.recording" class="fill-red-500 text-red-500" />
        <PauseIcon v-else />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Clear" title="Clear the log" :disabled="!count('all')" @click="clear">
        <Trash2Icon />
      </Button>
      <PopMenu :items="menu">
        <template #trigger="{ toggle, open }">
          <Button variant="ghost" size="icon-sm" aria-label="More" title="More" :aria-expanded="open" @click="toggle">
            <EllipsisIcon />
          </Button>
        </template>
      </PopMenu>
    </template>

    <template #header>
      <div class="border-input focus-within:border-ring focus-within:ring-ring/50 flex h-8 items-center gap-1.5 rounded-md border pl-2 shadow-xs focus-within:ring-3">
        <SearchIcon class="text-muted-foreground size-3.5 flex-none" />
        <input
          v-model="query"
          type="search"
          placeholder="Filter by name or value"
          aria-label="Filter events"
          class="placeholder:text-muted-foreground h-full min-w-0 flex-1 bg-transparent text-sm outline-none">
      </div>

      <div class="bg-muted flex gap-0.5 rounded-md p-0.5" role="tablist" aria-label="Source">
        <button
          v-for="item in SOURCES"
          :key="item.value"
          type="button"
          role="tab"
          :aria-selected="source === item.value"
          class="flex flex-1 items-center justify-center gap-1.5 rounded-sm px-2.5 py-1 text-xs"
          :class="source === item.value ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
          @click="source = item.value">
          {{ item.label }}
          <span class="text-muted-foreground text-[10px] tabular-nums">{{ count(item.value) }}</span>
        </button>
      </div>
    </template>

    <div ref="list">
      <p v-if="!shown.length" class="text-muted-foreground px-4 py-10 text-center text-sm">
        {{ log.recording ? 'Nothing yet: events show here as they happen.' : 'Paused: nothing is recorded.' }}
      </p>

      <template v-for="entry in shown" :key="entry.id">
        <!-- a page: what follows happened on it -->
        <div
          v-if="entry.source === 'page'"
          class="bg-muted/50 text-muted-foreground sticky top-0 z-[5] flex items-center gap-2 border-b px-4 py-1 text-[11px] backdrop-blur"
          :class="entry.previous && 'opacity-60'">
          <span class="font-medium">{{ entry.name === 'reload' ? 'Reloaded' : entry.name === 'load' ? 'Loaded' : 'Navigated to' }}</span>
          <span class="text-foreground min-w-0 truncate font-mono" :title="entry.url">{{ entry.url }}</span>
          <span class="ml-auto flex-none font-mono tabular-nums">{{ clock(entry.time) }}</span>
        </div>
        <EventRow v-else :entry="entry" />
      </template>
    </div>

    <template v-if="flash" #footer>
      <p class="text-xs">{{ flash }}</p>
    </template>
  </SidePanel>
</template>
