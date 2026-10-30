import { shallowRef } from 'vue'

// Outlines drawn over the page (Highlights.vue), one per element in view, up
// to 300; with `label`, a tag naming the first. Where the elements are when
// drawn: they don't follow a scroll, the next hover draws them again.
export const highlights = shallowRef([])

export function drawHighlights (elements, label = '') {
  const boxes = []

  for (const element of elements) {
    if (boxes.length >= 300) break

    const rect = element.getBoundingClientRect()

    if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > window.innerHeight) continue

    boxes.push({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      label: label && !boxes.length ? label : ''
    })
  }

  highlights.value = boxes

  return boxes.length
}

export function clearHighlights () {
  highlights.value = []
}
