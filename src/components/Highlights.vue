<script setup>
import { highlights } from '@/lib/highlights'
</script>

<!-- Outlines over the page's elements (lib/highlights.js): what a token
     reaches, the outline's row under the pointer, the element Pick is over. -->
<template>
  <div
    v-for="(box, index) in highlights"
    :key="index"
    class="outline-highlight bg-highlight/10 pointer-events-none fixed outline-2 -outline-offset-1"
    :style="{ top: `${box.top}px`, left: `${box.left}px`, width: `${box.width}px`, height: `${box.height}px` }">
    <span
      v-if="box.label"
      class="bg-highlight absolute left-[-2px] max-w-[min(100vw,40rem)] truncate rounded-sm px-1.5 py-0.5 font-mono text-[11px] leading-4 text-white"
      :class="box.top < 20 ? 'top-0' : '-top-5'">{{ box.label }}</span>
  </div>
</template>
