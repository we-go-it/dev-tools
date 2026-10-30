<script setup>
import { CircleCheckIcon, CircleXIcon, TriangleAlertIcon } from '@lucide/vue'

// A line of the SEO panel: a label, its value, and how it looks — fine,
// worth a look, or wrong — as an icon before the value.
defineProps({
  label: { type: String, required: true },
  state: { type: String, default: null }
})
</script>

<template>
  <div class="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-3 px-4 py-1.5">
    <span class="text-muted-foreground text-xs">{{ label }}</span>
    <div class="flex min-w-0 items-baseline gap-1.5 text-xs">
      <CircleCheckIcon v-if="state === 'ok'" class="size-3.5 flex-none translate-y-0.5 text-emerald-600" />
      <TriangleAlertIcon v-else-if="state === 'warning'" class="size-3.5 flex-none translate-y-0.5 text-amber-600" />
      <CircleXIcon v-else-if="state === 'error'" class="text-destructive size-3.5 flex-none translate-y-0.5" />
      <div class="min-w-0 flex-1 break-words"><slot /></div>
    </div>
  </div>
</template>
