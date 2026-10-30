<script setup>
import { CircleXIcon, EllipsisIcon, InfoIcon, RefreshCwIcon, TriangleAlertIcon } from '@lucide/vue'
import { computed, inject, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

import PopMenu from '@/components/PopMenu.vue'
import SidePanel from '@/components/SidePanel.vue'
import { Button } from '@/components/ui/button'
import { copyText } from '@/lib/copy'
import { clearHighlights, drawHighlights } from '@/lib/highlights'
import { readSession, writeSession } from '@/lib/storage'
import PayloadTree from '@/tools/events/PayloadTree.vue'

import { isOwn } from '@/lib/page'

import { formatBytes } from '@/lib/bytes'

import {
  analyse,
  cache,
  KIND_LABELS,
  checkAlternates,
  DESCRIPTION_LENGTH,
  HEADINGS,
  HREFLANG,
  pageUrl,
  readPage,
  readRobotsTxt,
  readSitemaps,
  readWeight,
  text,
  TITLE_LENGTH
} from './seo'
import SearchResult from './SearchResult.vue'
import SeoRow from './SeoRow.vue'

// What an SEO analyst looks at first, for this page (seo.js): what is wrong,
// how it shows in a search result and the rich results its JSON-LD is
// eligible for, whether it can be indexed, its title and
// description, hreflang, headings, social cards, structured data, what it
// weighs, and its links and images. Read as the server sends it, or as it is now in the
// browser, where hovering an image count or a link outlines it. A heading,
// read either way, outlines its own on the page, and a click scrolls to it.
const emit = defineEmits([ 'close' ])

const root = inject('root')
const { seo: options } = inject('config')

const SOURCE_KEY = 'dev-seo-source'
const SOURCES = [
  { value: 'server', label: 'Server', title: 'The HTML the server sends: what a crawler gets, with the status and headers' },
  { value: 'rendered', label: 'Rendered', title: 'The page as it is now in the browser, after scripts' }
]

const source = ref(readSession(SOURCE_KEY, 'server') === 'rendered' ? 'rendered' : 'server')
// the report: page elements inside (Rendered), so out of Vue's reactivity
const report = shallowRef(null)
const error = ref('')
const loading = ref(false)
const alternates = ref(null)
const checking = ref(false)
const flash = ref('')

let runs = 0
// when what is shown was read
const readAt = ref(null)

const cacheKey = () => `${source.value} ${pageUrl(options.ignoreParams)}`

// What was read here before, if anything (seo.js's cache); else read it
function load () {
  const cached = cache.reports.get(cacheKey())

  if (!cached) return refresh()

  report.value = cached.report
  alternates.value = cached.alternates
  readAt.value = cached.at
  error.value = ''
}

// reads the page again, and robots.txt with it; the sitemaps too when its
// head has no hreflang, for the hreflang listed there
async function refresh () {
  const run = ++runs
  const key = cacheKey()

  liveHeadings = null
  loading.value = true
  error.value = ''
  alternates.value = null
  cache.robotsTxt = await readRobotsTxt()

  const page = await readPage(source.value, options.ignoreParams)

  if (run !== runs) return

  if (!page.error && !page.doc.querySelector(HREFLANG)) {
    cache.sitemaps = await readSitemaps(cache.robotsTxt.sitemaps)

    if (run !== runs) return
  }

  loading.value = false

  if (page.error) {
    error.value = page.error
    report.value = null

    return
  }

  report.value = { ...analyse(page, cache.robotsTxt, cache.sitemaps), weight: readWeight(page.requested ?? null) }
  readAt.value = Date.now()
  cache.reports.set(key, { report: report.value, alternates: null, at: readAt.value })
}


function setSource (value) {
  if (value === source.value) return

  source.value = value
  writeSession(SOURCE_KEY, value)
  clearHighlights()
  load()
}

async function check () {
  checking.value = true
  alternates.value = await checkAlternates(report.value, cache.sitemaps)
  checking.value = false

  const cached = cache.reports.get(cacheKey())

  if (cached?.report === report.value) cached.alternates = alternates.value
}

onMounted(load)

const pad = number => String(number).padStart(2, '0')
const readAtLabel = computed(() => {
  if (!readAt.value) return 'Read the page again'

  const date = new Date(readAt.value)

  return `Read at ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}: click to read again`
})
onBeforeUnmount(clearHighlights)

const counts = computed(() => ({
  error: report.value?.issues.filter(item => item.level === 'error').length ?? 0,
  warning: report.value?.issues.filter(item => item.level === 'warning').length ?? 0
}))

// a rich result's state: where it shows, or why not
const RICH_STATES = {
  result: { label: 'In the result', state: 'ok' },
  elsewhere: { label: 'Elsewhere', state: 'ok' },
  restricted: { label: 'Not shown', state: 'warning' },
  retired: { label: 'Retired', state: 'warning' },
  invalid: { label: 'Not eligible', state: 'error' }
}

// a length against its guide: fine inside it, worth a look outside
const lengthState = (length, [ min, max ]) => (!length ? 'error' : length < min || length > max ? 'warning' : 'ok')
const meter = (length, [ , max ]) => `${Math.min(100, (length / (max * 1.25)) * 100)}%`

// A heading of the report as it is on the page: itself when read from the
// page; else the page's heading at the same place, or the first of the same
// level and text (the server's HTML and the page's may differ a little)
let liveHeadings = null

function liveHeading (heading, index) {
  if (heading.element) return heading.element

  liveHeadings ??= [ ...document.querySelectorAll(HEADINGS) ]
    .filter(element => !isOwn(element))
    .map(element => ({ element, level: Number(element.localName[1]), text: text(element) }))

  const same = other => other?.level === heading.level && other.text === heading.text

  return (same(liveHeadings[index]) ? liveHeadings[index] : liveHeadings.find(same))?.element ?? null
}

// the heading under the pointer, outlined with its level
let hovered = null

function hoverHeading (heading, index) {
  hovered = liveHeading(heading, index)

  if (hovered) drawHighlights([ hovered ], `H${heading.level}`)
  else clearHighlights()
}

function leaveHeadings () {
  hovered = null
  clearHighlights()
}

// to the heading, then its outline again where it ended up
function scrollToHeading (heading, index) {
  const element = liveHeading(heading, index)

  if (!element) return

  element.scrollIntoView({ behavior: 'smooth', block: 'center' })

  const redraw = () => {
    if (hovered === element) drawHighlights([ element ], `H${heading.level}`)
  }

  window.addEventListener('scrollend', redraw, { once: true })
  // no scrollend where nothing scrolled, or where it is not supported
  setTimeout(redraw, 700)
}

const outline = elements => {
  const found = elements.filter(Boolean)

  if (found.length) drawHighlights(found)
}

async function copyReport () {
  const { headings, links, images, ...rest } = report.value
  const plain = {
    ...rest,
    headings: headings.map(({ level, text }) => ({ level, text })),
    links: { ...links, nofollow: links.nofollow.map(({ href, rel, text }) => ({ href, rel, text })) },
    images: { total: images.total, noAlt: images.noAlt.length, emptyAlt: images.emptyAlt }
  }

  flash.value = await copyText(JSON.stringify(plain, null, 2), root) ? 'Report copied as JSON' : 'Copy failed'
  setTimeout(() => { flash.value = '' }, 1500)
}

const menu = computed(() => [
  { label: 'Open robots.txt', action: () => window.open('/robots.txt', '_blank') },
  ...(report.value?.indexing.robotsTxt?.sitemaps ?? []).slice(0, 3).map(href => ({ label: `Open ${new URL(href, location.href).pathname}`, action: () => window.open(href, '_blank') })),
  { separator: true },
  { label: 'Open in the Rich Results Test', action: () => window.open(`https://search.google.com/test/rich-results?url=${encodeURIComponent(report.value.url)}`, '_blank'), disabled: !report.value },
  { label: 'Open in the Schema Markup Validator', action: () => window.open(`https://validator.schema.org/#url=${encodeURIComponent(report.value.url)}`, '_blank'), disabled: !report.value },
  { separator: true },
  { label: 'Copy report as JSON', action: copyReport, disabled: !report.value }
])

const openWindow = href => window.open(href, '_blank')

// an address on this site as its path
const pathOf = url => url.replace(window.location.origin, '')

// the kind whose files are listed, while its row is hovered
const listedKind = ref(null)
const LISTED = 25

// the heaviest kind fills the bar
const heaviest = computed(() => Math.max(1, ...(report.value?.weight.kinds ?? []).map(kind => kind.encoded)))

const statusClass = status => (status === 200 ? 'bg-emerald-500/15 text-emerald-700' : status >= 400 ? 'bg-destructive/15 text-destructive' : 'bg-amber-500/20 text-amber-800')
</script>

<template>
  <SidePanel title="SEO" side="right" width-key="dev-seo-width" @close="emit('close')">
    <template #count>
      <template v-if="loading">Reading…</template>
      <template v-else-if="report">
        <span v-if="counts.error" class="text-destructive">{{ counts.error }} error{{ counts.error === 1 ? '' : 's' }}</span>
        <span v-if="counts.error && counts.warning"> · </span>
        <span v-if="counts.warning" class="text-amber-700">{{ counts.warning }} warning{{ counts.warning === 1 ? '' : 's' }}</span>
        <span v-if="!counts.error && !counts.warning" class="text-emerald-700">no issues</span>
      </template>
    </template>

    <template #actions>
      <Button variant="ghost" size="icon-sm" aria-label="Refresh" :title="readAtLabel" @click="refresh">
        <RefreshCwIcon :class="loading && 'animate-spin'" />
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
      <div class="flex items-center gap-2">
        <div class="bg-muted flex gap-0.5 rounded-md p-0.5" role="tablist" aria-label="Source">
          <button
            v-for="item in SOURCES"
            :key="item.value"
            type="button"
            role="tab"
            :aria-selected="source === item.value"
            class="rounded-sm px-2.5 py-1 text-xs"
            :class="source === item.value ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
            :title="item.title"
            @click="setSource(item.value)">{{ item.label }}</button>
        </div>
        <span v-if="report?.status" class="ml-auto rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold" :class="statusClass(report.status)" :title="`HTTP ${report.status}`">{{ report.status }}</span>
      </div>
    </template>

    <p v-if="error" class="text-destructive px-4 py-6 text-center text-sm">{{ error }}</p>

    <template v-if="report">
      <!-- what is wrong, worst first -->
      <section v-if="report.issues.length" class="border-b py-2">
        <ul class="grid gap-1 px-4">
          <li v-for="(item, index) in report.issues" :key="index" class="flex items-baseline gap-2 text-xs">
            <CircleXIcon v-if="item.level === 'error'" class="text-destructive size-3.5 flex-none translate-y-0.5" />
            <TriangleAlertIcon v-else-if="item.level === 'warning'" class="size-3.5 flex-none translate-y-0.5 text-amber-600" />
            <InfoIcon v-else class="text-muted-foreground size-3.5 flex-none translate-y-0.5" />
            <span>{{ item.message }}</span>
          </li>
        </ul>
      </section>

      <!-- as a search result, its JSON-LD's rich results in it -->
      <section class="border-b px-4 py-3">
        <SearchResult :report="report" />
        <p class="text-muted-foreground mt-1.5 text-[11px]">From the JSON-LD as Google documents it; Google picks what it shows.</p>
      </section>

      <section class="border-b py-1">
        <h3 class="bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur">Rich results <span class="text-muted-foreground font-normal">{{ report.rich.features.length }}</span></h3>
        <p v-if="!report.rich.features.length" class="text-muted-foreground px-4 py-1.5 text-xs">None: {{ report.jsonLd.length ? 'no type in the JSON-LD makes one' : 'no JSON-LD' }}</p>
        <SeoRow
          v-for="(feature, index) in report.rich.features"
          :key="index"
          :label="feature.name"
          :state="feature.status === 'result' || feature.status === 'elsewhere' ? (feature.recommended.length || feature.notes.length ? 'warning' : 'ok') : RICH_STATES[feature.status].state">
          <span class="font-medium">{{ RICH_STATES[feature.status].label }}</span><template v-if="feature.status === 'elsewhere'">: {{ feature.where }}</template><template v-if="feature.note"> · {{ feature.note }}</template>
          <p class="text-muted-foreground truncate font-mono text-[11px]" :title="feature.label ?? ''">{{ feature.type }}<template v-if="feature.label"> · {{ feature.label }}</template></p>
          <p v-if="feature.missing.length" class="text-destructive text-[11px]">Missing: <span class="font-mono">{{ feature.missing.join(', ') }}</span></p>
          <p v-if="feature.recommended.length" class="text-[11px] text-amber-700">Recommended: <span class="font-mono">{{ feature.recommended.join(', ') }}</span></p>
          <p v-for="note in feature.notes" :key="note" class="text-muted-foreground text-[11px]">{{ note }}</p>
        </SeoRow>
      </section>

      <section class="border-b py-1">
        <h3 class="bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur">Indexing</h3>
        <SeoRow v-if="report.status !== null" label="Status" :state="report.status === 200 ? 'ok' : report.status >= 400 ? 'error' : 'warning'">
          {{ report.status }}<template v-if="report.redirected"> · redirected from <span class="font-mono">{{ report.requested }}</span></template>
        </SeoRow>
        <SeoRow label="Robots" :state="report.indexing.noindex ? 'error' : report.indexing.nofollow ? 'warning' : 'ok'">
          <span class="font-medium">{{ report.indexing.noindex ? 'noindex' : 'index' }}, {{ report.indexing.nofollow ? 'nofollow' : 'follow' }}</span>
          <p v-if="report.indexing.robotsMeta" class="text-muted-foreground font-mono text-[11px]">meta robots: {{ report.indexing.robotsMeta }}</p>
          <p v-if="report.indexing.googlebotMeta" class="text-muted-foreground font-mono text-[11px]">meta googlebot: {{ report.indexing.googlebotMeta }}</p>
          <p v-if="report.indexing.robotsHeader" class="text-muted-foreground font-mono text-[11px]">X-Robots-Tag: {{ report.indexing.robotsHeader }}</p>
          <p v-if="!report.indexing.robotsMeta && !report.indexing.googlebotMeta && !report.indexing.robotsHeader" class="text-muted-foreground text-[11px]">no robots meta{{ report.live ? '' : ' or header' }}: the default</p>
        </SeoRow>
        <SeoRow v-if="report.indexing.robotsTxt" label="robots.txt" :state="report.indexing.robotsTxt.blockedBy ? 'error' : 'ok'">
          <template v-if="!report.indexing.robotsTxt.found">none found</template>
          <template v-else-if="report.indexing.robotsTxt.blockedBy">blocked: <span class="font-mono">Disallow: {{ report.indexing.robotsTxt.blockedBy.path }}</span></template>
          <template v-else>allowed</template>
        </SeoRow>
        <SeoRow label="Canonical" :state="{ self: 'ok', other: 'warning', missing: 'warning', multiple: 'error' }[report.canonical.state]">
          <span class="font-medium">{{ { self: 'this page', other: 'another URL', missing: 'none', multiple: `${report.canonical.all.length} canonicals` }[report.canonical.state] }}</span>
          <p v-for="href in report.canonical.all" :key="href" class="text-muted-foreground font-mono text-[11px] break-all">{{ href }}</p>
        </SeoRow>
      </section>

      <section class="border-b py-1">
        <h3 class="bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur">Title and description</h3>
        <SeoRow label="Title" :state="lengthState(report.title.length, TITLE_LENGTH)">
          {{ report.title.value || 'none' }}
          <span class="mt-1 flex items-center gap-2">
            <span class="bg-muted relative h-1 w-24 overflow-hidden rounded-full"><span class="absolute inset-y-0 left-0 rounded-full" :class="lengthState(report.title.length, TITLE_LENGTH) === 'ok' ? 'bg-emerald-500' : 'bg-amber-500'" :style="{ width: meter(report.title.length, TITLE_LENGTH) }" /></span>
            <span class="text-muted-foreground text-[11px] tabular-nums">{{ report.title.length }} / {{ TITLE_LENGTH[0] }}–{{ TITLE_LENGTH[1] }}</span>
          </span>
        </SeoRow>
        <SeoRow label="Description" :state="report.description.value ? lengthState(report.description.length, DESCRIPTION_LENGTH) : 'warning'">
          {{ report.description.value || 'none' }}
          <span class="mt-1 flex items-center gap-2">
            <span class="bg-muted relative h-1 w-24 overflow-hidden rounded-full"><span class="absolute inset-y-0 left-0 rounded-full" :class="lengthState(report.description.length, DESCRIPTION_LENGTH) === 'ok' ? 'bg-emerald-500' : 'bg-amber-500'" :style="{ width: meter(report.description.length, DESCRIPTION_LENGTH) }" /></span>
            <span class="text-muted-foreground text-[11px] tabular-nums">{{ report.description.length }} / {{ DESCRIPTION_LENGTH[0] }}–{{ DESCRIPTION_LENGTH[1] }}</span>
          </span>
        </SeoRow>
      </section>

      <section class="border-b py-1">
        <div class="bg-background/95 sticky top-0 z-[5] flex items-center gap-2 px-4 py-1.5 backdrop-blur">
          <h3 class="text-xs font-semibold">Hreflang <span class="text-muted-foreground font-normal">{{ report.hreflang.length }}</span></h3>
          <button v-if="report.hreflangSource.from === 'sitemap'" type="button" class="text-muted-foreground hover:text-foreground text-[11px] underline decoration-dotted" :title="`Not in the head: listed in ${report.hreflangSource.sitemap}. Click to open it`" @click="openWindow(report.hreflangSource.sitemap)">from the sitemap</button>
          <Button v-if="report.hreflang.length" size="xs" variant="outline" class="ml-auto" :disabled="checking" title="Fetch each alternate: its status, and whether it lists this page back" @click="check">{{ checking ? 'Checking…' : 'Check alternates' }}</Button>
        </div>
        <p v-if="!report.hreflang.length" class="text-muted-foreground px-4 py-1.5 text-xs">None, {{ report.hreflangSource.sitemapsRead ? 'in the head or the sitemaps' : 'in the head (no sitemap found)' }}</p>
        <div v-for="(alternate, index) in (alternates ?? report.hreflang)" :key="alternate.lang + alternate.href" class="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-baseline gap-2 px-4 py-1 text-xs">
          <span class="font-mono font-medium" :class="!alternate.valid && 'text-amber-700'">{{ alternate.lang }}</span>
          <span class="text-muted-foreground truncate font-mono text-[11px]" :title="alternate.href">{{ alternate.href }}</span>
          <span class="flex-none text-[11px]">
            <template v-if="alternate.self"><span class="text-muted-foreground">this page</span></template>
            <template v-else-if="alternates && alternates[index]">
              <span :class="alternate.status === 200 ? 'text-emerald-700' : 'text-amber-700'">{{ alternate.status }}</span>
              <span v-if="alternate.back !== null" :class="alternate.back ? 'text-emerald-700' : 'text-destructive'"> · {{ alternate.back ? 'links back' : 'no link back' }}</span>
            </template>
          </span>
        </div>
      </section>

      <section class="border-b py-1">
        <h3 class="bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur">Headings <span class="text-muted-foreground font-normal">{{ report.headings.length }}</span></h3>
        <p v-if="!report.headings.length" class="text-muted-foreground px-4 py-1.5 text-xs">None</p>
        <ul class="px-2 pb-1" @mouseleave="leaveHeadings">
          <li v-for="(heading, index) in report.headings" :key="index">
            <button
              type="button"
              class="hover:bg-highlight/10 flex w-full items-baseline gap-2 rounded-sm px-2 py-0.5 text-left text-xs"
              :style="{ paddingLeft: `${0.5 + (heading.level - 1) * 0.75}rem` }"
              :title="`Scroll to this H${heading.level}`"
              @mouseenter="hoverHeading(heading, index)"
              @focus="hoverHeading(heading, index)"
              @click="scrollToHeading(heading, index)">
              <span class="flex-none font-mono text-[10px] font-semibold" :class="heading.skipped ? 'text-amber-700' : heading.level === 1 ? 'text-blue-600' : 'text-muted-foreground'">H{{ heading.level }}</span>
              <span class="truncate">{{ heading.text || '(empty)' }}</span>
            </button>
          </li>
        </ul>
      </section>

      <section class="border-b py-1">
        <h3 class="bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur">Social</h3>
        <div v-if="report.og['og:image']" class="px-4 py-1.5">
          <img :src="report.og['og:image']" alt="" class="aspect-[1.91/1] w-full rounded-md border object-cover">
        </div>
        <SeoRow v-for="(value, key) in report.og" :key="key" :label="key">
          <span class="font-mono text-[11px] break-all">{{ value }}</span>
        </SeoRow>
        <SeoRow v-for="(value, key) in report.twitter" :key="key" :label="key">
          <span class="font-mono text-[11px] break-all">{{ value }}</span>
        </SeoRow>
        <p v-if="!Object.keys(report.og).length && !Object.keys(report.twitter).length" class="text-muted-foreground px-4 py-1.5 text-xs">No Open Graph or Twitter tags</p>
      </section>

      <section class="border-b py-1">
        <h3 class="bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur">Structured data <span class="text-muted-foreground font-normal">{{ report.jsonLd.length }}</span></h3>
        <p v-if="!report.jsonLd.length" class="text-muted-foreground px-4 py-1.5 text-xs">No JSON-LD</p>
        <details v-for="(block, index) in report.jsonLd" :key="index" class="px-4 py-1">
          <summary class="flex cursor-pointer list-none flex-wrap items-center gap-1 text-xs">
            <span v-if="block.error" class="text-destructive">Does not parse: {{ block.error }}</span>
            <span v-for="type in block.types" :key="type" class="bg-muted rounded px-1.5 py-0.5 font-mono text-[11px]">{{ type }}</span>
          </summary>
          <div class="bg-muted/30 mt-1 rounded-md p-2">
            <pre v-if="block.error" class="font-mono text-[11px] whitespace-pre-wrap">{{ block.source }}</pre>
            <PayloadTree v-else :value="block.data" />
          </div>
        </details>
      </section>

      <!-- what it weighs: its HTML, and everything it has downloaded so far -->
      <section class="border-b py-1">
        <h3 class="bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur">Page weight</h3>
        <SeoRow label="HTML">
          <template v-if="report.weight.html">
            <span class="font-medium">{{ formatBytes(report.weight.html.transferred || report.weight.html.encoded) }}</span> transferred
            · {{ formatBytes(report.weight.html.decoded) }} uncompressed
            <p class="text-muted-foreground text-[11px]">as a crawler gets it, without the dev tools</p>
          </template>
          <template v-else-if="report.weight.load">
            <span class="font-medium">{{ formatBytes(report.weight.load.encoded) }}</span> · {{ formatBytes(report.weight.load.decoded) }} uncompressed
            <p class="text-muted-foreground text-[11px]">this load, the dev tools in it: Server for a clean copy</p>
          </template>
          <template v-else>unknown</template>
        </SeoRow>
        <SeoRow label="Assets">
          <span class="font-medium">{{ formatBytes(report.weight.total.encoded) }}</span> in {{ report.weight.total.count }} files
          · {{ formatBytes(report.weight.total.transferred) }} over the network
          <p class="text-muted-foreground text-[11px]">so far: lazy files come as the page scrolls; files from the cache transfer nothing</p>
        </SeoRow>

        <ul class="grid gap-1 px-4 pt-1 pb-2">
          <!-- hovered, a kind lists its files, heaviest first -->
          <li
            v-for="kind in report.weight.kinds"
            :key="kind.kind"
            class="relative"
            @mouseenter="listedKind = kind.kind"
            @mouseleave="listedKind = null">
            <div class="hover:bg-muted/60 -mx-1 grid cursor-default grid-cols-[4.5rem_minmax(0,1fr)_4rem_2.5rem] items-center gap-2 rounded-sm px-1 py-0.5 text-xs">
              <span class="text-muted-foreground">{{ KIND_LABELS[kind.kind] }}</span>
              <span class="bg-muted h-1.5 overflow-hidden rounded-full">
                <span class="bg-highlight/70 block h-full rounded-full" :style="{ width: `${(kind.encoded / heaviest) * 100}%` }" />
              </span>
              <span class="text-right tabular-nums">{{ formatBytes(kind.encoded) }}</span>
              <span class="text-muted-foreground text-right text-[11px] tabular-nums">{{ kind.count }}</span>
            </div>

            <div v-if="listedKind === kind.kind" class="bg-popover absolute inset-x-0 top-full z-20 mt-0.5 max-h-72 overflow-y-auto rounded-md border p-1.5 shadow-lg">
              <div v-for="file in kind.files.slice(0, LISTED)" :key="file.url" class="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 rounded-sm px-1.5 py-0.5">
                <span class="truncate font-mono text-[11px]" :title="file.url">{{ pathOf(file.url) }}</span>
                <span class="text-right text-[11px] tabular-nums">
                  <span v-if="file.status >= 400" class="text-destructive mr-1.5 font-mono">{{ file.status }}</span>
                  <span :class="!file.encoded && 'text-muted-foreground'" :title="file.encoded ? `${formatBytes(file.transferred)} over the network` : 'No size: another origin without Timing-Allow-Origin'">{{ file.encoded ? formatBytes(file.encoded) : '—' }}</span>
                </span>
              </div>
              <p v-if="kind.files.length > LISTED" class="text-muted-foreground px-1.5 pt-0.5 text-[11px]">and {{ kind.files.length - LISTED }} more</p>
            </div>
          </li>
        </ul>

        <p v-if="report.weight.unsized" class="text-muted-foreground px-4 pb-1 text-[11px]">
          {{ report.weight.unsized }} file{{ report.weight.unsized === 1 ? '' : 's' }} from other origins without a size (no Timing-Allow-Origin), not counted.
        </p>
        <p v-if="report.weight.failed.length" class="text-destructive px-4 pb-1 text-[11px]">
          {{ report.weight.failed.length }} answered with an error, downloaded all the same:
          <span v-for="(file, index) in report.weight.failed" :key="file.url" class="font-mono" :title="file.url">{{ index ? ', ' : '' }}{{ pathOf(file.url) }} {{ file.status }}<template v-if="file.bytes"> ({{ formatBytes(file.bytes) }})</template></span>
        </p>
        <p v-if="report.weight.devServer" class="px-4 pb-2 text-[11px] text-amber-800">
          Served by the Vite dev server: scripts and styles are unbundled and unminified, nothing like production.
        </p>
      </section>

      <section class="py-1">
        <h3 class="bg-background/95 sticky top-0 z-[5] px-4 py-1.5 text-xs font-semibold backdrop-blur">Page</h3>
        <SeoRow label="Language" :state="report.lang ? 'ok' : 'warning'"><span class="font-mono">{{ report.lang || 'none' }}</span></SeoRow>
        <SeoRow label="Viewport" :state="report.viewport ? 'ok' : 'warning'"><span class="font-mono text-[11px]">{{ report.viewport || 'none' }}</span></SeoRow>
        <SeoRow label="Links">
          {{ report.links.internal }} internal · {{ report.links.external }} external
          <details v-if="report.links.nofollow.length" class="mt-1">
            <summary class="cursor-pointer text-amber-700">{{ report.links.nofollow.length }} nofollow / ugc / sponsored</summary>
            <ul class="mt-1 grid gap-0.5" @mouseleave="clearHighlights">
              <li
                v-for="(link, index) in report.links.nofollow"
                :key="index"
                class="truncate rounded-sm font-mono text-[11px]"
                :class="link.element && 'hover:bg-highlight/10'"
                :title="link.href"
                @mouseenter="link.element ? outline([ link.element ]) : clearHighlights()">{{ link.rel }} · {{ link.text || link.href }}</li>
            </ul>
          </details>
        </SeoRow>
        <SeoRow label="Images" :state="report.images.noAlt.length ? 'warning' : 'ok'">
          {{ report.images.total }} ·
          <span
            :class="[ report.images.noAlt.length && 'text-amber-700', report.live && report.images.noAlt.length && 'cursor-help underline decoration-dotted' ]"
            :title="report.live ? 'Hover to outline them' : 'Switch to Rendered to outline them'"
            @mouseenter="report.live && outline(report.images.noAlt)"
            @mouseleave="clearHighlights">{{ report.images.noAlt.length }} without alt</span>
          · {{ report.images.emptyAlt }} decorative (alt="")
        </SeoRow>
        <SeoRow v-if="report.prev || report.next" label="Pagination">
          <p v-if="report.prev" class="font-mono text-[11px]">prev: {{ report.prev }}</p>
          <p v-if="report.next" class="font-mono text-[11px]">next: {{ report.next }}</p>
        </SeoRow>
      </section>
    </template>

    <template v-if="flash" #footer>
      <p class="text-xs">{{ flash }}</p>
    </template>
  </SidePanel>
</template>
