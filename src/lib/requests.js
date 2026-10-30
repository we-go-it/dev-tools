// The requests the dev tools make themselves, kept apart from the page's:
// what the panels fetch goes through ownFetch(), and the app's own file is
// known by its address, so a count of what the page downloaded (the SEO
// panel's weight) leaves them out.

const own = new Set()

// this module's file: the app, wherever the site's bundler put it; without
// its query, which a dev server adds and changes (?t=…, ?v=…)
const withoutQuery = url => String(url).split(/[?#]/)[0]
const APP = withoutQuery(import.meta.url)

const absolute = url => {
  try {
    return new URL(url, location.href).href
  } catch {
    return String(url)
  }
}

export function ownFetch (url, options) {
  own.add(absolute(url))

  return fetch(url, options)
}

export const isOwnRequest = url => withoutQuery(url) === APP || own.has(absolute(url))
