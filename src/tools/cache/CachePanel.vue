<script setup>
import { EllipsisIcon, ExternalLinkIcon, PencilIcon, RefreshCwIcon } from '@lucide/vue'
import { computed, inject, onMounted, ref, shallowRef } from 'vue'

import PopMenu from '@/components/PopMenu.vue'
import SidePanel from '@/components/SidePanel.vue'
import { Button } from '@/components/ui/button'
import { copyText } from '@/lib/copy'

import { readTags, sections } from './cache'

// The page's cache tags (cache.js): what a cache would file the page under,
// so what purges it. Read on opening and on Refresh, from the page as the
// server sends it now. Lists first: they are what a new post changes without
// the page ever having shown it. Each tag links to what it stands for, and to
// where it is edited, when the server says.
const emit = defineEmits([ 'close' ])

const root = inject('root')

const page = shallowRef(null)
const loading = ref(false)
const flash = ref('')

let runs = 0

async function refresh () {
  const run = ++runs

  loading.value = true

  const read = await readTags()

  if (run !== runs) return

  page.value = read
  loading.value = false
}

onMounted(refresh)

const tags = computed(() => page.value?.tags ?? [])
const shown = computed(() => sections(tags.value, page.value?.kinds))
const path = computed(() => (page.value ? new URL(page.value.url).pathname : ''))

async function copy (text, what) {
  flash.value = await copyText(text, root) ? `${what} copied` : 'Copy failed'
  setTimeout(() => { flash.value = '' }, 1500)
}

const menu = computed(() => [
  { label: 'Copy tags', action: () => copy(tags.value.map(({ tag }) => tag).join('\n'), `${tags.value.length} tags`), disabled: !tags.value.length },
  { label: 'Copy as JSON', action: () => copy(JSON.stringify(page.value, null, 2), 'JSON'), disabled: !tags.value.length }
])
</script>

<template>
  <SidePanel title="Cache tags" side="right" width-key="dev-cache-width" @close="emit('close')">
    <template #count>{{ loading && !page ? '…' : tags.length }}</template>

    <template #actions>
      <Button variant="ghost" size="icon-sm" aria-label="Refresh" title="Read the page's tags again" :disabled="loading" @click="refresh">
        <RefreshCwIcon :class="loading && 'animate-spin'" />
      </Button>
      <PopMenu :items="menu">
        <template #trigger="{ toggle: toggleMenu, open: menuOpen }">
          <Button variant="ghost" size="icon-sm" aria-label="More" title="More" :aria-expanded="menuOpen" @click="toggleMenu">
            <EllipsisIcon />
          </Button>
        </template>
      </PopMenu>
    </template>

    <template v-if="page && !page.error" #header>
      <p class="flex min-w-0 items-center gap-2 text-xs">
        <span
          class="flex-none rounded px-1.5 text-[10px] leading-4 font-semibold"
          :class="page.cached ? 'bg-emerald-500/15 text-emerald-700' : 'bg-amber-500/20 text-amber-800'">
          {{ page.cached ? 'Cacheable' : 'Not cached' }}
        </span>
        <span v-if="!page.cached" class="text-muted-foreground flex-none">{{ page.skipped }}</span>
        <span v-else-if="page.note" class="text-muted-foreground flex-none">{{ page.note }}</span>
        <span class="text-muted-foreground min-w-0 truncate font-mono text-[11px]" :title="page.url">{{ path }}</span>
      </p>
    </template>

    <p v-if="!page" class="text-muted-foreground px-4 py-10 text-center text-sm">Reading the page…</p>

    <p v-else-if="page.error" class="text-muted-foreground px-4 py-10 text-center text-sm">{{ page.error }}</p>

    <p v-else-if="!tags.length" class="text-muted-foreground px-4 py-10 text-center text-sm">No tags: nothing would purge this page.</p>

    <section v-for="section in shown" :key="section.kind" class="border-b pb-2 last:border-b-0">
      <h3 class="px-4 pt-3 text-xs font-semibold">
        {{ section.title }} <span class="text-muted-foreground font-normal tabular-nums">{{ section.count }}</span>
      </h3>
      <p class="text-muted-foreground px-4 pb-1 text-[11px]">{{ section.note }}</p>

      <template v-for="[ group, rows ] in section.groups" :key="group">
        <h4 v-if="group" class="text-muted-foreground px-4 pt-2 pb-0.5 text-[11px] font-medium">{{ group }}</h4>

        <ul>
          <li v-for="row in rows" :key="row.tag" class="hover:bg-muted/50 flex items-center gap-3 px-4 py-1 text-xs">
            <span class="text-muted-foreground w-48 flex-none truncate font-mono text-[11px]" :title="row.tag">{{ row.tag }}</span>
            <span class="min-w-0 flex-1 truncate" :title="row.label">{{ row.label }}</span>
            <a
              v-if="row.view"
              :href="row.view"
              target="_blank"
              class="text-muted-foreground hover:text-foreground flex-none"
              :title="`View ${row.view}`"
              aria-label="View">
              <ExternalLinkIcon class="size-3.5" />
            </a>
            <a
              v-if="row.edit"
              :href="row.edit"
              target="_blank"
              class="text-muted-foreground hover:text-foreground flex-none"
              title="Edit"
              aria-label="Edit">
              <PencilIcon class="size-3.5" />
            </a>
          </li>
        </ul>
      </template>
    </section>

    <template v-if="flash" #footer>
      <p class="text-xs">{{ flash }}</p>
    </template>
  </SidePanel>
</template>
