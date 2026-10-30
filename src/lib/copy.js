// The Clipboard API only exists on secure origins (https, localhost), not on
// a local http domain (site.test): there, a selected <textarea> and
// execCommand('copy'), deprecated but still everywhere. In the app's shadow
// root, so the focus stays in the panel.
export async function copyText (text, root) {
  try {
    await navigator.clipboard.writeText(text)

    return true
  } catch {}

  const textarea = document.createElement('textarea')

  textarea.value = text
  textarea.setAttribute('readonly', '')
  Object.assign(textarea.style, {
    position: 'fixed', top: '0', left: '0', opacity: '0'
  })
  root.append(textarea)
  textarea.select()

  let copied = false

  try {
    copied = document.execCommand('copy')
  } catch {}

  textarea.remove()

  return copied
}
