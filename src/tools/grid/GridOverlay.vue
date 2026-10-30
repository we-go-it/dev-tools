<script setup>
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'

// The column grid over the page, as the site lays out its own: its columns,
// gap, side margins and maximum width, from init({ grid }). Those are CSS
// values, so a var() of the site's is read live, and follows its breakpoints:
// the site's custom properties reach in through the app's host. How many
// columns that comes to is read back off the overlay, on every resize.
const { grid } = inject('config')

const overlay = ref(null)
const count = ref(0)

function measure () {
  count.value = Math.max(0, Math.round(Number(getComputedStyle(overlay.value).getPropertyValue('--columns')))) || 0
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('resize', measure))
</script>

<template>
  <div class="pointer-events-none fixed inset-0" aria-hidden="true">
    <div
      ref="overlay"
      class="mx-auto grid h-full w-full"
      :style="{
        '--columns': grid.columns,
        maxWidth: grid.maxWidth,
        gap: grid.gap,
        paddingInline: grid.margin,
        gridTemplateColumns: `repeat(${count || 1}, minmax(0, 1fr))`
      }">
      <div v-for="column in count" :key="column" class="bg-red-500/10" />
    </div>
  </div>
</template>
