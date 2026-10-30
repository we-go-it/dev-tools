<script setup>
import { CopyIcon } from '@lucide/vue'
import { computed, inject, markRaw, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'

import SidePanel from '@/components/SidePanel.vue'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { copyText } from '@/lib/copy'
import { isOwn } from '@/lib/page'

import { EVENTS, labelOfForm, readForm, toJson } from './form'

// What a form on the page would send, redrawn as it changes (form.js): the
// values sent, the errors shown, the fields a condition hides, and the
// underscored ones (a plugin's own). The form holding the focus when the
// panel opens is the one shown; another can be chosen when there are more.
const emit = defineEmits([ 'close' ])

const { forms: options } = inject('config')
const root = inject('root')

// the page's forms: page elements, out of Vue's reactivity
const forms = shallowRef([])
const selected = ref(0)
const reading = ref(null)
// what Copy says for a moment after it ran, in the footer
const flash = ref('')

const form = computed(() => forms.value[selected.value] ?? null)

function find () {
  forms.value = markRaw([ ...document.querySelectorAll(options.selector) ].filter(element => !isOwn(element)))

  const focused = forms.value.findIndex(element => element.contains(document.activeElement))

  selected.value = Math.max(0, focused)
}

let last = ''

// only when something changed, so text in it can be selected and copied
function render () {
  // a navigation took it away: the page's forms again
  if (form.value && !form.value.isConnected) find()
  if (!form.value) {
    reading.value = null
    last = ''

    return
  }

  const next = readForm(form.value, options.read)
  const text = JSON.stringify(next)

  if (text !== last) {
    reading.value = next
    last = text
  }
}

// after the form's own listeners, conditions included, have run
const update = () => setTimeout(render)

watch(form, (current, previous) => {
  EVENTS.forEach(type => previous?.removeEventListener(type, update))
  EVENTS.forEach(type => current?.addEventListener(type, update))
  render()
})

// what no event reports: a value set from script, an error from the server
let timer = null

onMounted(() => {
  find()
  render()
  timer = setInterval(render, 500)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  EVENTS.forEach(type => form.value?.removeEventListener(type, update))
})

const sent = computed(() => reading.value?.entries.filter(([ name ]) => !name.startsWith('_')) ?? [])
const own = computed(() => reading.value?.entries.filter(([ name ]) => name.startsWith('_')) ?? [])
const errors = computed(() => Object.entries(reading.value?.errors ?? {}))
const hidden = computed(() => reading.value?.hidden ?? [])

async function copy () {
  flash.value = await copyText(toJson(reading.value.entries), root) ? 'Values copied as JSON' : 'Copy failed'
  setTimeout(() => { flash.value = '' }, 1500)
}

// `POST https://…`: the method apart, as a badge
const endpoint = computed(() => {
  const [ method, ...rest ] = (reading.value?.endpoint ?? '').split(' ')

  return /^[A-Z]+$/.test(method) ? { method, url: rest.join(' ') } : { method: '', url: reading.value?.endpoint ?? '' }
})

// a few forms as a segmented control, more in a select
const FEW = 3
</script>

<template>
  <SidePanel title="Form" side="right" width-key="dev-form-width" @close="emit('close')">
    <template #count>
      <template v-if="reading">{{ reading.label }} · {{ sent.length }} value{{ sent.length === 1 ? '' : 's' }}</template>
    </template>

    <template #actions>
      <Button variant="ghost" size="icon-sm" aria-label="Copy the values as JSON" title="Copy the values as JSON" :disabled="!reading" @click="copy">
        <CopyIcon />
      </Button>
    </template>

    <template #header>
      <!-- which form, when the page has more than one -->
      <div v-if="forms.length > 1 && forms.length <= FEW" class="bg-muted flex gap-0.5 overflow-x-auto rounded-md p-0.5" role="tablist" aria-label="Form">
        <button
          v-for="(element, index) in forms"
          :key="index"
          type="button"
          role="tab"
          :aria-selected="Number(selected) === index"
          class="min-w-0 flex-1 truncate rounded-sm px-2.5 py-1 font-mono text-xs"
          :class="Number(selected) === index ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
          :title="labelOfForm(element, index)"
          @click="selected = index">{{ labelOfForm(element, index) }}</button>
      </div>
      <NativeSelect
        v-else-if="forms.length > FEW"
        v-model="selected"
        wrapper-class="w-full"
        icon-class="right-2 size-3.5"
        class="h-8 py-0 pr-7 pl-2 font-mono text-xs"
        aria-label="Form">
        <NativeSelectOption v-for="(element, index) in forms" :key="index" :value="index">{{ labelOfForm(element, index) }}</NativeSelectOption>
      </NativeSelect>

      <!-- where it posts -->
      <div v-if="reading" class="flex min-w-0 items-center gap-2">
        <span v-if="endpoint.method" class="bg-muted flex-none rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold">{{ endpoint.method }}</span>
        <span class="text-muted-foreground min-w-0 truncate font-mono text-[11px]" :title="endpoint.url">{{ endpoint.url }}</span>
      </div>
    </template>

    <p v-if="!forms.length" class="text-muted-foreground px-4 py-6 text-center text-sm">No form on this page.</p>

    <div v-else-if="reading" class="grid gap-5 p-4">
      <section>
        <h3 class="text-muted-foreground mb-2 text-xs font-bold tracking-wide uppercase">Sent <small class="ml-1 font-normal normal-case">{{ sent.length }}</small></h3>
        <p v-if="!sent.length" class="text-muted-foreground text-xs">Nothing</p>
        <div v-for="([ name, value ], index) in sent" :key="`${name}-${index}`" class="hover:bg-muted -mx-2 grid grid-cols-[minmax(6rem,35%)_1fr] gap-3 rounded px-2 py-1">
          <span class="font-mono text-[11px] font-medium break-all">{{ name }}</span>
          <span class="font-mono text-[11px] break-words whitespace-pre-wrap" :class="value === '' && 'text-muted-foreground'">{{ value === '' ? 'empty' : value }}</span>
        </div>
      </section>

      <section v-if="errors.length">
        <h3 class="text-muted-foreground mb-2 text-xs font-bold tracking-wide uppercase">Errors shown <small class="ml-1 font-normal normal-case">{{ errors.length }}</small></h3>
        <div v-for="[ name, message ] in errors" :key="name" class="bg-destructive/10 -mx-2 grid grid-cols-[minmax(6rem,35%)_1fr] gap-3 rounded px-2 py-1">
          <span class="font-mono text-[11px] font-medium break-all">{{ name }}</span>
          <span class="text-destructive text-[11px]">{{ message }}</span>
        </div>
      </section>

      <section v-if="hidden.length">
        <h3 class="text-muted-foreground mb-2 text-xs font-bold tracking-wide uppercase">Hidden by a condition, not sent <small class="ml-1 font-normal normal-case">{{ hidden.length }}</small></h3>
        <div v-for="name in hidden" :key="name" class="-mx-2 px-2 py-1 font-mono text-[11px] font-medium">{{ name }}</div>
      </section>

      <section v-if="own.length">
        <h3 class="text-muted-foreground mb-2 text-xs font-bold tracking-wide uppercase">Underscored, sent <small class="ml-1 font-normal normal-case">{{ own.length }}</small></h3>
        <div v-for="([ name, value ], index) in own" :key="`${name}-${index}`" class="text-muted-foreground -mx-2 grid grid-cols-[minmax(6rem,35%)_1fr] gap-3 rounded px-2 py-1">
          <span class="font-mono text-[11px] break-all">{{ name }}</span>
          <span class="font-mono text-[11px] break-words whitespace-pre-wrap">{{ value }}</span>
        </div>
      </section>
    </div>

    <template v-if="flash" #footer>
      <p class="text-xs">{{ flash }}</p>
    </template>
  </SidePanel>
</template>
