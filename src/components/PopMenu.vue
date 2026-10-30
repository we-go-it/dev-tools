<script setup>
import { CheckIcon } from '@lucide/vue'
import { onBeforeUnmount, ref, watch } from 'vue'

// A small menu of actions, opened from its trigger: Reka's DropdownMenu
// closes on any click in a shadow root (README.md), so this one checks a
// click outside by the event's composed path. Escape closes it.
//
//   <PopMenu :items="[{ label, action, disabled, checked }, { separator: true }]">
//
// An item with `checked` (true or false) is an option, ticked when on.
//     <template #trigger="{ toggle, open }">…</template>
//   </PopMenu>
defineProps({
  items: { type: Array, required: true },
  align: { type: String, default: 'end' }
})

const menu = ref(null)
const open = ref(false)

const toggle = () => { open.value = !open.value }

function onPointerDown (event) {
  if (!event.composedPath().includes(menu.value)) open.value = false
}

watch(open, isOpen => {
  if (isOpen) window.addEventListener('pointerdown', onPointerDown, true)
  else window.removeEventListener('pointerdown', onPointerDown, true)
})

onBeforeUnmount(() => window.removeEventListener('pointerdown', onPointerDown, true))

function run (item) {
  open.value = false
  item.action()
}
</script>

<template>
  <div ref="menu" class="relative" @keydown.escape.stop="open = false">
    <slot name="trigger" :toggle="toggle" :open="open" />

    <div
      v-if="open"
      role="menu"
      class="bg-popover text-popover-foreground absolute top-full z-30 mt-1 min-w-44 rounded-md border p-1 shadow-md"
      :class="align === 'end' ? 'right-0' : 'left-0'">
      <template v-for="(item, index) in items" :key="index">
        <div v-if="item.separator" class="bg-border -mx-1 my-1 h-px" role="separator" />
        <button
          v-else
          type="button"
          role="menuitem"
          class="hover:bg-accent focus-visible:bg-accent flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none disabled:pointer-events-none disabled:opacity-50"
          :class="item.destructive && 'text-destructive'"
          :disabled="item.disabled"
          @click="run(item)">
          <span v-if="item.checked !== undefined" class="flex size-4 flex-none items-center justify-center">
            <CheckIcon v-if="item.checked" class="size-3.5" />
          </span>
          {{ item.label }}
        </button>
      </template>
    </div>
  </div>
</template>
