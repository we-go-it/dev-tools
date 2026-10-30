// The page the tools look at, apart from the tools themselves: the app's host
// element (everything of the app is in its shadow root), and what the site
// says is not its content (init({ ignore })): its own dev tools, an admin bar.

export const HOST_TAG = 'we-go-dev-tools'

let ignore = ''

export function setIgnore (selector) {
  ignore = selector || ''
}

// the app's own host, or something the site asked to leave out
export function isOwn (element) {
  if (element.localName === HOST_TAG) return true

  try {
    return !!ignore && !!element.closest(ignore)
  } catch {
    return false
  }
}


// what the pointer is over on the page; the app's surfaces are its host, as
// seen from the page, so they count as nothing
export function pageElementAt (x, y) {
  const element = document.elementFromPoint(x, y)

  return element && !isOwn(element) ? element : null
}

// `section#id.block-container.home-hero`: its tag, id and first classes
export const labelOf = element => element.tagName.toLowerCase()
  + (element.id ? `#${element.id}` : '')
  + [ ...element.classList ].slice(0, 3).map(name => `.${name}`).join('')
