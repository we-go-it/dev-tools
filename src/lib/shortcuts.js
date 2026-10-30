// Shortcuts as written in init({ shortcuts }): `ctrl+g`, `ctrl+shift+k`,
// `ctrl+.`. The key is matched on what it types (event.key), case aside.

export function parseShortcut (text) {
  const parts = text.toLowerCase().split('+').map(part => part.trim())
  const key = parts.pop() || '+'

  return {
    key,
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    meta: parts.includes('meta') || parts.includes('cmd')
  }
}

export function matches (event, shortcut) {
  return event.key.toLowerCase() === shortcut.key
    && event.ctrlKey === shortcut.ctrl
    && event.shiftKey === shortcut.shift
    && event.altKey === shortcut.alt
    && event.metaKey === shortcut.meta
}

// `Ctrl+G`, for the toolbar's titles and its hints
export const labelOfShortcut = text => text.split('+').map(part => part.length === 1 ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1)).join('+')
