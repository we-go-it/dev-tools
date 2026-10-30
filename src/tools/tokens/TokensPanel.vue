<script setup>
import { ChevronRightIcon, CrosshairIcon, EllipsisIcon, PlusIcon, SearchIcon, XIcon } from '@lucide/vue'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import PopMenu from '@/components/PopMenu.vue'
import SidePanel from '@/components/SidePanel.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { clearHighlights } from '@/lib/highlights'

import {
  addToken,
  allFolded,
  changedAt,
  changedCount,
  clearPicked,
  collect,
  copyAll,
  copyChanges,
  currentTab,
  foldAll,
  groups,
  importCss,
  isChanged,
  isFolded,
  labelOfTab,
  noneFolded,
  pickParent,
  resetAll,
  showPicked,
  startPicking,
  stopPicking,
  store,
  toggleGroup
} from './store'
import SelectorField from './SelectorField.vue'
import TokenRow from './TokenRow.vue'
import VarField from './VarField.vue'
import { EDITORS, ROOT, WIDTH_KEY } from './tokens'

// The custom properties the page's stylesheets set — on :root, and on
// components' own selectors — read a breakpoint at a time (Base, then the
// site's, min-width), each editable for the session (store.js).
//
// Laid out top to bottom as it is used: what to look at (the filter, Pick,
// the breakpoint), the tokens in their groups, and, once something is
// changed, what to do with the changes. The rarer actions are in the menu.
const emit = defineEmits([ 'close' ])

const config = inject('config')
const root = inject('root')

// the Add variable form, over the top of the list
const adding = ref(false)
const draft = ref({
  name: '--', selector: ROOT, value: '', editor: ''
})
const addError = ref('')

// the Import sheet, over the whole list
const importing = ref(false)
const importText = ref('')
const importReplace = ref(false)
const importNote = ref('')
const importError = ref(false)

// what Copy says for a moment after it ran
const flash = ref('')

onMounted(() => collect(config.breakpoints))

onBeforeUnmount(() => {
  stopPicking()
  clearHighlights()
})

async function copy (what) {
  const ok = await (what === 'all' ? copyAll(root) : copyChanges(root))

  flash.value = ok ? (what === 'all' ? 'All tokens copied' : 'Changes copied') : 'Copy failed'
  setTimeout(() => { flash.value = '' }, 1500)
}

function openAdd () {
  importing.value = false
  adding.value = true
  addError.value = ''
  nextTick(() => root.querySelector('[data-add-name]')?.focus())
}

function submitAdd () {
  const { error, token } = addToken(draft.value)

  if (error) {
    addError.value = error

    return
  }

  draft.value = {
    name: '--', selector: draft.value.selector, value: '', editor: ''
  }
  addError.value = ''
  adding.value = false

  // into view, focused
  nextTick(() => {
    const input = root.getElementById(`dev-token${token.id}`)

    input?.scrollIntoView({ block: 'center' })
    input?.focus()
  })
}

function openImport () {
  adding.value = false
  importing.value = true
  importNote.value = ''
  importError.value = false
}

function submitImport () {
  const { error, note } = importCss(importText.value, importReplace.value)

  importError.value = error
  importNote.value = note
  if (!error) importText.value = ''
}

const menu = computed(() => [
  { label: 'Import CSS…', action: openImport },
  { label: 'Copy all tokens', action: () => copy('all') }
])

const emptyMessage = computed(() => {
  if (store.onlyChanged && !changedCount.value) return 'Nothing changed yet.'
  if (store.picked && !store.picked.ids.length) return 'No tokens used there.'

  return 'No tokens match.'
})
</script>

<template>
  <SidePanel title="Tokens" side="right" :width-key="WIDTH_KEY" inset="px-2" @close="emit('close')">
    <template #count>
      {{ store.tokens.length }}
    </template>

    <template #actions>
      <PopMenu :items="menu">
        <template #trigger="{ toggle, open }">
          <Button variant="ghost" size="icon-sm" aria-label="More" title="More" :aria-expanded="open" @click="toggle">
            <EllipsisIcon />
          </Button>
        </template>
      </PopMenu>
    </template>

    <template #header>
      <!-- what to look at: a filter, with Pick inside it, and the changed ones -->
      <div class="flex items-center gap-1.5">
        <div class="border-input focus-within:border-ring focus-within:ring-ring/50 flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-md border pl-2 shadow-xs focus-within:ring-3">
          <SearchIcon class="text-muted-foreground size-3.5 flex-none" />
          <input
            v-model="store.query"
            type="search"
            placeholder="Filter by name, selector or value"
            aria-label="Filter tokens"
            class="placeholder:text-muted-foreground h-full min-w-0 flex-1 bg-transparent text-sm outline-none">
          <button
            type="button"
            class="hover:bg-muted mr-0.5 flex size-7 flex-none items-center justify-center rounded-sm"
            :class="store.picking ? 'bg-highlight/15 text-highlight' : 'text-muted-foreground'"
            :aria-pressed="store.picking"
            title="Pick an element on the page: only the tokens it uses (Escape to cancel)"
            aria-label="Pick an element on the page"
            @click="startPicking">
            <CrosshairIcon class="size-4" />
          </button>
        </div>

        <Toggle
          v-model="store.onlyChanged"
          size="sm"
          variant="outline"
          class="h-8"
          :disabled="!changedCount && !store.onlyChanged">Changed</Toggle>
      </div>

      <!-- the element picked, filtering the list -->
      <div
        v-if="store.picked"
        class="bg-highlight/10 flex items-center gap-1 rounded-md py-0.5 pr-0.5 pl-2"
        @mouseenter="showPicked"
        @mouseleave="clearHighlights">
        <CrosshairIcon class="text-highlight size-3.5 flex-none" />
        <code class="min-w-0 flex-1 truncate font-mono text-xs" :title="store.picked.label">{{ store.picked.label }}</code>
        <span class="text-muted-foreground flex-none text-[11px]">{{ store.picked.ids.length }} tokens</span>
        <Button size="xs" variant="ghost" title="Its parent element: more tokens" @click="pickParent(); showPicked()">Parent</Button>
        <Button size="icon-xs" variant="ghost" aria-label="Clear the pick" title="Show all tokens again" @click="clearPicked">
          <XIcon />
        </Button>
      </div>

      <!-- the breakpoint shown and edited: the dot is the window's own,
           the count what is changed there -->
      <div class="bg-muted flex gap-0.5 overflow-x-auto rounded-md p-0.5" role="tablist" aria-label="Breakpoint">
        <button
          v-for="item in store.tabs"
          :key="item.width"
          type="button"
          role="tab"
          :aria-selected="store.tab === item.width"
          class="relative flex flex-none items-center gap-1 rounded-sm px-2 py-1 text-xs whitespace-nowrap"
          :class="store.tab === item.width ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
          :title="(item.width ? `From ${item.width}px up` : 'All widths, until a breakpoint sets its own') + (currentTab === item.width ? ' · the window now' : '')"
          @click="store.tab = item.width">
          <span v-if="currentTab === item.width" class="bg-highlight size-1.5 rounded-full" aria-label="the window now" />
          {{ item.label }}
          <span v-if="changedAt(item.width)" class="bg-changed rounded-full px-1 text-[10px] leading-3.5 font-semibold text-black">{{ changedAt(item.width) }}</span>
        </button>
      </div>

      <!-- a variable added; every group folded or unfolded at once. Their
           text, not their hover box, on the header's edges -->
      <div class="-mx-1.5 -mb-1 flex gap-0.5">
        <Button size="xs" variant="ghost" class="text-muted-foreground mr-auto" @click="openAdd">
          <PlusIcon />
          Add variable
        </Button>
        <Button size="xs" variant="ghost" class="text-muted-foreground" :disabled="noneFolded || !groups.length" @click="foldAll(false)">Expand all</Button>
        <Button size="xs" variant="ghost" class="text-muted-foreground" :disabled="allFolded || !groups.length" @click="foldAll(true)">Collapse all</Button>
      </div>
    </template>

    <!-- Add variable: set on the current tab like an edit; on :root unless
         another selector is given (a component's, say); with the editor its
         value calls for, unless another is chosen -->
    <form
      v-if="adding"
      class="bg-muted/40 grid gap-2 border-b px-4 py-3"
      @submit.prevent="submitAdd"
      @keydown.escape.stop="adding = false">
      <p class="text-xs font-medium">New variable <span class="text-muted-foreground font-normal">on {{ labelOfTab(store.tab) }}</span></p>
      <div class="grid grid-cols-2 gap-1.5">
        <Input v-model="draft.name" data-add-name class="h-8 font-mono text-xs" placeholder="--name" aria-label="Name" spellcheck="false" autocomplete="off" />
        <SelectorField v-model="draft.selector" />
      </div>
      <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-1.5">
        <VarField v-model="draft.value" />
        <NativeSelect v-model="draft.editor" class="h-8 py-0 pr-7 pl-2 text-xs" icon-class="right-2 size-3.5" aria-label="Editor" title="The editor it gets">
          <NativeSelectOption v-for="item in EDITORS" :key="item.value" :value="item.value">{{ item.label }}</NativeSelectOption>
        </NativeSelect>
      </div>
      <div class="flex items-center gap-2">
        <p v-if="addError" class="text-destructive text-xs">{{ addError }}</p>
        <Button size="sm" variant="ghost" type="button" class="ml-auto" @click="adding = false">Cancel</Button>
        <Button size="sm" type="submit">Add</Button>
      </div>
    </form>

    <p v-if="!groups.length" class="text-muted-foreground px-4 py-10 text-center text-sm">{{ emptyMessage }}</p>

    <section v-for="group in groups" :key="group.name">
      <!-- sticky while its tokens scroll by; folds the group -->
      <h3 class="bg-background/95 sticky top-0 z-[5] border-b backdrop-blur">
        <button
          type="button"
          class="hover:bg-muted/60 flex w-full items-center gap-1.5 px-2 py-1.5 text-left"
          :aria-expanded="!isFolded(group)"
          @click="toggleGroup(group)">
          <ChevronRightIcon class="text-muted-foreground size-3.5 flex-none transition-transform" :class="!isFolded(group) && 'rotate-90'" />
          <span class="truncate font-mono text-xs font-semibold">{{ group.name }}</span>
          <span class="text-muted-foreground text-[11px]">{{ group.tokens.length }}</span>
          <span v-if="group.tokens.some(isChanged)" class="bg-changed ml-auto size-1.5 flex-none rounded-full" :title="`${group.tokens.filter(isChanged).length} changed`" />
        </button>
      </h3>

      <div v-if="!isFolded(group)" class="py-1">
        <TokenRow v-for="token in group.tokens" :key="token.id" :token="token" />
      </div>
    </section>

    <!-- Import: a sheet over the list, to paste what Copy changes / Copy all
         gave (here or on another page, another machine) and apply it -->
    <template #overlay>
      <form
        v-if="importing"
        class="bg-background absolute inset-0 z-10 flex flex-col gap-3 p-4"
        @submit.prevent="submitImport"
        @keydown.escape.stop="importing = false">
        <div>
          <p class="font-medium">Import CSS</p>
          <p class="text-muted-foreground text-xs">What Copy changes or Copy all gave: each variable is set at its breakpoint.</p>
        </div>

        <Textarea
          v-model="importText"
          class="min-h-0 flex-1 resize-none font-mono text-xs"
          placeholder=":root {&#10;  --parallax-shift: 0.2;&#10;}"
          aria-label="CSS to import"
          spellcheck="false"
          autofocus />

        <p v-if="importNote" class="text-xs" :class="importError ? 'text-destructive' : 'text-muted-foreground'">{{ importNote }}</p>

        <div class="flex items-center gap-2">
          <label class="flex items-center gap-2 text-xs">
            <Switch v-model="importReplace" />
            Replace the current changes
          </label>
          <Button size="sm" variant="ghost" type="button" class="ml-auto" @click="importing = false">Close</Button>
          <Button size="sm" type="submit" :disabled="!importText.trim()">Import</Button>
        </div>
      </form>
    </template>

    <!-- once something is changed: what to do with the changes -->
    <template v-if="changedCount || flash" #footer>
      <div class="flex items-center gap-2">
        <span class="text-xs" :class="flash ? 'text-foreground' : 'text-muted-foreground'">
          <template v-if="flash">{{ flash }}</template>
          <template v-else><span class="bg-changed mr-1.5 inline-block size-2 rounded-full" />{{ changedCount }} changed</template>
        </span>
        <Button size="sm" variant="ghost" class="ml-auto" :disabled="!changedCount" @click="resetAll">Reset all</Button>
        <Button size="sm" :disabled="!changedCount" @click="copy('changes')">Copy changes</Button>
      </div>
    </template>
  </SidePanel>
</template>
