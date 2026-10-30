<script setup>
import { RotateCcwIcon } from '@lucide/vue'
import { computed, ref } from 'vue'

import { highlight, isChangedHere, resetToken, setEditor, sourceOf, store, unhighlight, valueAt } from './store'
import { EDITORS, ROOT } from './tokens'
import ValueField from './ValueField.vue'

// One token on the current tab: its name and its value, side by side; under
// them, quietly, where the value comes from, the selector it is set on when
// not the root, and — while hovered — how much of the page uses it, outlined
// there. A value changed on this tab is marked, and gets a reset. At the end
// of that line, the editor chosen, shown once it is not Auto, or on hover.
const props = defineProps({
  token: { type: Object, required: true }
})

const changedHere = computed(() => isChangedHere(props.token))
const inherited = computed(() => valueAt(props.token).from !== store.tab)
const hovered = ref(false)

function enter () {
  hovered.value = true
  highlight(props.token)
}

function leave () {
  hovered.value = false
  unhighlight()
}
</script>

<template>
  <div
    class="group hover:bg-muted/50 relative grid gap-1 py-1.5 pr-2 pl-4"
    @mouseenter="enter"
    @mouseleave="leave">
    <span v-if="changedHere" class="bg-changed absolute inset-y-1 left-1 w-1 rounded-full" aria-hidden="true" />

    <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_1.5rem] items-center gap-2">
      <label
        class="truncate font-mono text-xs"
        :class="inherited ? 'text-muted-foreground' : 'text-foreground font-medium'"
        :for="`dev-token${props.token.id}`"
        :title="props.token.name">{{ props.token.name.replace(/^--/, '') }}</label>

      <ValueField :token="props.token" />

      <button
        v-if="changedHere"
        type="button"
        class="text-muted-foreground hover:bg-muted hover:text-foreground flex size-6 items-center justify-center rounded-sm"
        :title="`Reset to ${props.token.declared[store.tab] ?? 'the stylesheet\'s value'}`"
        :aria-label="`Reset ${props.token.name}`"
        @click="resetToken(props.token)">
        <RotateCcwIcon class="size-3.5" />
      </button>
    </div>

    <p class="text-muted-foreground flex min-w-0 gap-1.5 text-[11px] leading-4">
      <span class="flex-none">{{ sourceOf(props.token) }}</span>
      <span v-if="props.token.added" class="text-highlight flex-none">· new</span>
      <span v-if="props.token.selector !== ROOT" class="truncate font-mono" :title="props.token.selector">· {{ props.token.selector }}</span>
      <span v-if="hovered && props.token.using" class="ml-auto flex-none">{{ props.token.using.page }} on page</span>
      <select
        class="hover:text-foreground focus-visible:text-foreground flex-none cursor-pointer bg-transparent outline-none group-hover:opacity-100 focus-visible:opacity-100"
        :class="[!(hovered && props.token.using) && 'ml-auto', !props.token.editor && 'opacity-0']"
        :value="props.token.editor"
        :aria-label="`${props.token.name} editor`"
        title="The editor it gets"
        @change="setEditor(props.token, $event.target.value)">
        <option v-for="item in EDITORS" :key="item.value" :value="item.value">{{ item.label }}</option>
      </select>
    </p>
  </div>
</template>
