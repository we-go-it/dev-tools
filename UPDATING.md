# Updating @we-go/dev-tools

What @we-go/dev-tools relies on that its dependencies don't promise to keep, and the versions it was last
checked against. After upgrading any of them, go through the list: most of these fail silently.

## Last checked against

Checked on 2026-10-01.

| | Version |
|---|---|
| Vue | 3.5.43 |
| reka-ui (shadcn-vue, new-york style) | 2.10.5 |
| Tailwind CSS (and @tailwindcss/vite) | 4.3.3 |
| @vueuse/core | 15.0.0 |
| @lucide/vue | 1.49.0 |
| Vite | 8.3.2 |
| @vitejs/plugin-vue | 6.0.9 |
| Lenis (the site’s, `data-lenis-prevent`) | 1.3.26 |
| Contact Form 7 (its DOM events) | 6.2.2, checked 2026-10-19 |

## What it relies on

- **Reka's dismissable layers don't work in a shadow root.** Reka checks a click outside a
  popover, select, tooltip, menu or dialog by `event.target`, which a shadow root retargets to its
  host: every click inside would close it. So the app uses only the components with no such
  layer (button, input, textarea, tabs, toggle, switch, badge, separator, kbd, the native select),
  and its own popups (the easing editor, the value suggestions) check `event.composedPath()`.
- **Tailwind's `@property` rules are registered on the page.** A shadow root ignores them, and
  without them a shadow, a ring or a transform reads nothing. They are all `--tw-*`.
- **The tokens panel reads the stylesheets through the CSSOM.** It walks `document.styleSheets`
  for custom properties, through media, layers and nesting. A cross-origin sheet cannot be read and
  is skipped. A breakpoint is recognised only in the form the browser serialises a min-width query
  to, `(min-width: <n>px|rem|em)` (`widthOf()`): range syntax (`(width >= …)`) drops out, leaving
  only Base. Rules nested with `&` are skipped.
- **Copy uses `document.execCommand('copy')`** on plain-http domains (`site.test`), where the
  Clipboard API does not exist. It is deprecated, but every browser still supports it.
- **The form inspector polls.** It redraws on the form's `input`, `change` and `reset`, and every
  500ms for what no event reports (a value set from script, an error from the server), but only
  when something changed, so its text can be selected.
- **The events panel knows three things by name**, as well known as they are stable:
  `window.dataLayer` (Google Tag Manager, and `gtag()`, which pushes its `arguments` there), GA4's
  hits (requests to `…/g/collect`, the event in the query string: `en`, `ep.*`, `epn.*`, `up.*`,
  `tid`, `dl`) and Contact Form 7's DOM events (`wpcf7submit`, `wpcf7mailsent`, … bubbling from
  the form). The GA4 hits are read off a `PerformanceObserver` on `resource` entries: what was
  sent, read only and after the fact, with no body. A batch of events sent in one request's body
  shows as its first; a server-side container on a path of its own isn't recognised. It
  records from `init()` on, open or not. The dataLayer's earlier items are replayed, marked
  early; `push` is wrapped (GTM wraps it too, and chains to the one it finds), and the array is
  read by its length every half second, so a push no wrapper saw still turns up. A CF7 event
  fired before `init()` is not there. Payloads are copied as plain data: elements as a label,
  functions as `ƒ`, six levels deep, cycles cut.
- **The SEO panel reads the page as the server sends it** by default: it fetches the page again,
  with the browser's cookies, so a logged-in session gets what it would (an admin bar, say). That
  is also what makes the status, the `X-Robots-Tag` header and a redirect visible, and keeps it
  right after a client-side navigation, where the live `<head>` may still be the first page's.
  robots.txt is read as Google does (the group for Googlebot, else `*`; the longest rule wins,
  Allow on a tie; `*` and `$`). The length guides (title 30–60, description 70–160 characters)
  are the usual ones, not Google's: it cuts by pixel width.
  Its page weight is the Resource Timing list: the HTML as fetched for the report (compressed and
  not), and every file the page has downloaded so far, by kind, over the network and in size. The
  dev tools' own are left out (their file, by address without its query, and what the panels
  fetch, through `ownFetch()`). A file from another origin without `Timing-Allow-Origin` has no
  size, and is counted apart; on the Vite dev server that is every module. A file answered with
  4xx/5xx is listed: it was downloaded all the same, often as a whole error page.
  What it read is kept in memory, by source and address, until the page reloads: reopening the
  panel shows it again without fetching, a navigation reads the new page, Refresh reads again.
- **The images panel reads lazy loading by script as the convention has it**: an image with no
  address yet, but a `data-src` / `data-srcset` (on it or its `<picture>`'s `<source>`s), is
  waiting, and shown as the first candidate it will be offered. Its weight comes from the
  Resource Timing entry for its file: none for a cross-origin file without
  `Timing-Allow-Origin`, or one served from the memory cache. The LCP image is the last
  `largest-contentful-paint` entry, watched from `init()` (buffered); if the LCP was text, no
  image is marked. Oversized is over 1.5× the pixels its box needs (and 200px more), blurry under
  0.9×; the bytes wasted are estimated by area.
- **The grid reads its column count back** from a custom property on the overlay, on every
  resize: a `var()` resolves there because the site's custom properties inherit into the shadow
  root through the host.
- **The host carries `data-lenis-prevent`**, Lenis's attribute for "scroll this natively". If
  Lenis renames it, the wheel over a panel scrolls the page instead.
