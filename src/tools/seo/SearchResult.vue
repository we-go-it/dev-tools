<script setup>
import { PlayIcon } from '@lucide/vue'
import { computed } from 'vue'

// The page as a Google result, as its JSON-LD makes it (rich-results.js):
// the site's name and icon, the path (its breadcrumbs, else its address), the
// title, a date and the description, a thumbnail, stars and details, and
// below them the events or the question and answer it lists.
const props = defineProps({
  report: { type: Object, required: true }
})

const snippet = computed(() => props.report.rich.snippet)

// the site and path, as Google shows them under the site's name
const path = computed(() => {
  const url = new URL(props.report.canonical.href ?? props.report.url)
  const parts = snippet.value.crumbs ?? url.pathname.split('/').filter(Boolean)

  return [ `${url.protocol}//${url.host}`, ...parts ].join(' › ')
})

// the stars filled to the rating, out of five
const stars = computed(() => {
  const { rating } = snippet.value

  return rating ? `${Math.max(0, Math.min(100, (rating.value / rating.best) * 100))}%` : null
})

const ratingText = computed(() => {
  const { rating } = snippet.value

  if (!rating) return ''

  const value = Number.isInteger(rating.value) ? rating.value : rating.value.toFixed(1)

  if (rating.count === null) return `Rating: ${value}/${rating.best}${rating.by ? ` · Review by ${rating.by}` : ''}`

  return `Rating: ${value} · ${rating.count.toLocaleString()} ${rating.noun}`
})

const thumbnail = computed(() => snippet.value.video?.thumbnail ?? snippet.value.image)
</script>

<template>
  <div class="rounded-lg border p-3 font-[arial,sans-serif]">
    <div class="flex items-center gap-2.5">
      <span class="flex size-7 flex-none items-center justify-center overflow-hidden rounded-full border border-[#dadce0] bg-[#f1f3f4]">
        <img v-if="snippet.favicon" :src="snippet.favicon" alt="" class="size-[18px] object-contain">
      </span>
      <span class="min-w-0 leading-tight">
        <span class="block truncate text-sm text-[#202124]">{{ snippet.siteName }}</span>
        <span class="block truncate text-xs text-[#4d5156]">{{ path }}</span>
      </span>
    </div>

    <div class="mt-1.5 flex gap-3">
      <div class="min-w-0 flex-1">
        <p class="line-clamp-2 text-lg leading-snug text-[#1a0dab]">{{ report.title.value || '(no title)' }}</p>
        <p class="mt-0.5 line-clamp-2 text-[13px] leading-snug text-[#4d5156]">
          <span v-if="snippet.date" class="text-[#70757a]">{{ snippet.date }} — </span>{{ report.description.value || '(no description: Google picks text from the page)' }}
        </p>
        <p v-if="snippet.rating || snippet.details.length" class="mt-1 flex flex-wrap items-center gap-x-1.5 text-[13px] text-[#70757a]">
          <span v-if="stars" class="relative inline-block leading-none tracking-[-1px] text-[#dadce0]" aria-hidden="true">★★★★★<span class="absolute inset-0 overflow-hidden text-[#fbbc04]" :style="{ width: stars }">★★★★★</span></span>
          <span v-if="snippet.rating">{{ ratingText }}</span>
          <template v-for="(detail, index) in snippet.details" :key="detail">
            <span v-if="snippet.rating || index">·</span>
            <span>{{ detail }}</span>
          </template>
        </p>
      </div>

      <span v-if="thumbnail" class="relative flex-none self-start">
        <img :src="thumbnail" alt="" class="size-[86px] rounded-lg border object-cover">
        <span v-if="snippet.video" class="absolute inset-0 flex items-center justify-center">
          <span class="flex size-7 items-center justify-center rounded-full bg-black/60 text-white"><PlayIcon class="size-3.5 fill-current" /></span>
        </span>
        <span v-if="snippet.video?.duration" class="absolute right-1 bottom-1 rounded bg-black/70 px-1 text-[10px] text-white tabular-nums">{{ snippet.video.duration }}</span>
      </span>
    </div>

    <!-- the events the page lists -->
    <div v-if="report.rich.events" class="mt-2 grid gap-1 border-t border-[#ebebeb] pt-2 text-[13px]">
      <div v-for="(event, index) in report.rich.events.list" :key="index" class="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2">
        <span class="text-[#4d5156]">{{ event.date }}</span>
        <span class="min-w-0 truncate">
          <span class="text-[#1a0dab]">{{ event.name }}</span>
          <span v-if="event.place" class="text-[#70757a]"> · {{ event.place }}</span>
        </span>
      </div>
      <p v-if="report.rich.events.more" class="text-xs text-[#70757a]">and {{ report.rich.events.more }} more</p>
    </div>

    <!-- a question and its answer -->
    <div v-if="report.rich.qa" class="mt-2 border-t border-[#ebebeb] pt-2 text-[13px]">
      <p class="text-[#202124]">{{ report.rich.qa.question }}</p>
      <p v-if="report.rich.qa.answers" class="text-xs text-[#70757a]">{{ report.rich.qa.answers }} answer{{ report.rich.qa.answers === 1 ? '' : 's' }}</p>
      <p v-if="report.rich.qa.answer" class="mt-1 line-clamp-2 text-[#4d5156]">
        <span class="font-medium text-[#202124]">{{ report.rich.qa.accepted ? 'Best answer' : 'Top answer' }}</span> · {{ report.rich.qa.answer }}
      </p>
    </div>
  </div>
</template>
