# @we-go/dev-tools

Dev tools for a site's front end, as one Vue app: a floating toolbar and eight tools.

| Tool | Shortcut | |
|---|---|---|
| Toolbar | Ctrl+. | shows and hides the toolbar, with a button for each tool |
| Grid | Ctrl+G | the site's column grid over the page |
| Tokens | Ctrl+D | the custom properties the page's stylesheets set, a tab per breakpoint, editable for the session |
| Outline | Ctrl+O | the page's HTML as a foldable tree of its semantic tags, as rendered or as the server sent it |
| Form | Ctrl+Y | what a form on the page would send, live: the values, and what the site says of it (errors shown, fields hidden) |
| SEO | Ctrl+K | what an SEO analyst looks at first: issues, a search result preview built from the JSON-LD (rich results, with what each lacks), indexing (status, robots meta and header, robots.txt, canonical), title and description lengths, hreflang (from the head, else the sitemaps; with a check of each alternate), headings, social cards, structured data, page weight (the HTML, and every file downloaded, by kind, with the failed ones), links and images |
| Images | Ctrl+B | every image: its intrinsic size against what its box needs at the screen's density (oversized, with the bytes it wastes, or blurry), the srcset candidate taken, format, weight, lazy or eager, the LCP image; hovering outlines it, its thumbnail scrolls to it |
| Events | Ctrl+E | Google Tag Manager's dataLayer pushes, the GA4 hits sent, and Contact Form 7's DOM events, as they happen, a divider per page |
| Cache | Ctrl+M | the cache tags the server gives the page (what a cache files it under, so what purges it), by kind: lists, posts, links, children, terms, term lists; each with a link to it and to where it is edited. Read from the page as the server sends it now, so it follows a page swap on Refresh |

It knows nothing of WordPress, or of any site: the site decides when it loads, and tells it its
grid and breakpoints.

## Using it

The site imports it only when its dev tools are on, so nobody else downloads it:

```js
if (window.wgDevTools) {
  import('@we-go/dev-tools').then(({ init }) => init({
    grid: {
      columns: 'var(--grid-columns)',
      gap: 'var(--grid-gap)',
      margin: 'var(--page-margin)',
      maxWidth: 'var(--page-max-width)'
    },
    breakpoints: { desktop: 768, large: 1280 },
    ignore: '#wpadminbar'
  }))
}
```

`init()` mounts the app once and returns `{ destroy() }`; a second call returns the same.

| Option | | Default |
|---|---|---|
| `tools` | the tools this site has, of `grid`, `tokens`, `outline`, `form`, `events`, `seo`, `images`, `cache` (`TOOLS`, exported). The others get no button and no shortcut, and nothing of theirs runs: the events' recording, the LCP watch, the token overrides put back | all of them |
| `grid.columns`, `grid.gap`, `grid.margin`, `grid.maxWidth` | the page's grid, as CSS values. A `var()` of the site's is read live, so the grid follows its breakpoints | `12`, `24px`, `24px`, `none` |
| `breakpoints` | the site's min-width breakpoints, `{ label: px }`: the tokens panel's tabs. A 0 is Base, already there | `{}` |
| `ignore` | a selector for what on the page is not its content (its own dev tools, an admin bar): left out of the outline and of Pick | `''` |
| `forms.selector` | the forms the inspector offers | `'form'` |
| `forms.read` | `form => ({ data, hidden, errors, label, endpoint })`: what the site knows of a form beyond its `FormData`, any of it. `data` a `FormData` (what it would really send), `hidden` the names a condition hides, `errors` `{ name: message }` shown, `label` and `endpoint` for the panel's head | none |
| `seo.ignoreParams` | query params of the site's own, dropped from the address the SEO panel reads the page at and compares its canonical with: a dev tools switch that makes the page noindex, say | `[]` |
| `actions` | the site's own tools, on the toolbar after these: `[{ name, label, icon, shortcut, pressed, run }]`. The toolbar shows them and calls `run()`; the site keeps their keys (`shortcut` is only shown) and their state, read through `pressed()`: true, false, or a short text shown as a badge. `icon` is one of `braces`, `bug`, `code`, `database`, `eye`, `image`, `languages`, `layers` | `[]` |
| `shortcuts` | `{ toolbar, grid, tokens, outline, form, events, seo, images, cache }`, as `ctrl+g`, `ctrl+shift+k` | above |

### Cache tags

The Cache panel shows what the server says, in a JSON script in the page, while its debug is on (in
WordPress, WP-Go's cache-tags feature's):

```html
<script type="application/json" id="wg-cache-tags">{
  "url": "https://site.test/team/",
  "cached": false,
  "skipped": "logged in or preview",
  "tags": [
    { "tag": "type-person", "kind": "type", "group": null, "label": "People", "view": "…", "edit": "…" },
    { "tag": "post-42", "kind": "post", "group": "Person", "label": "Mario Rossi", "view": "…", "edit": "…" },
    { "tag": "link-7", "kind": "link", "group": "Page", "label": "Contacts", "view": "…", "edit": "…" }
  ]
}</script>
```

`kind` is `type`, `post`, `link`, `children`, `term` or `taxonomy`; any other is listed under Other. `group` sorts a kind's tags
(posts by type, terms by taxonomy); `view` and `edit` are links, or `null`. The page is fetched
again, at its address as it is, the site's own params kept: the one that turns its dev tools on may
be what turns the script on.

A server whose tags are other kinds (Craft's) says its own, in the panel's order, in place of those:
`"kinds": [{ "kind": "list", "title": "Lists", "note": "…" }, …]`; a tag of none of them is listed
under Other. `"note"`, a line beside Cacheable (how long the page is kept, say).

### Token overrides before the page paints

The tokens panel keeps its overrides for the session, and puts them back when the app mounts:
after the page has painted, so the page shows its own values for a moment first. To have them from
the first paint, the site puts them back itself, in `<head>`, while its dev tools are on:

```html
<script>
  try {
    var devTokens = document.createElement('style')
    devTokens.id = 'dev-tokens-overrides'
    devTokens.textContent = JSON.parse(sessionStorage.getItem('dev-tokens-css')) || ''
    document.head.appendChild(devTokens)
  } catch (e) {}
</script>
```

The app finds that `<style>`, moves it after `<body>` — last in the document, so an unlayered rule
of the same specificity added to `<head>` later (Vite's, in development) can't win over it — and
writes to it from then on.

## How it is built

- **A shadow root.** The app lives in a `<we-go-dev-tools>` element appended to `<html>`, after
  `<body>`, with everything inside its shadow root: the page's CSS can't reach it, and none of its
  own reaches the page. A page swap inside `<body>` (Barba and the like) leaves it be. The host
  carries `data-lenis-prevent`, so the wheel over a panel scrolls the panel.
- **Vue, with shadcn-vue's components** (`src/components/ui/`, added with the shadcn-vue CLI;
  `components.json`) and **Tailwind 4**, compiled into one stylesheet that goes into the shadow root
  as a string (`src/styles.css?inline`). Vue's own `<style>` blocks would be emitted outside it, so
  the app has none: the few rules of its own are in `src/styles.css`.
- **One file**, `dist/dev-tools.js`, Vue and the styles inside it: the site's bundler takes it as it
  is, with no Vue or Tailwind of its own.

```sh
cd ../dev-tools
yarn            # once
yarn build      # into dist/
yarn watch      # rebuild on save while working on it
```

| | |
|---|---|
| `src/index.js` | `init()`: the host, the shadow root, the styles, the app |
| `src/App.vue` | the shortcuts, and which tools are showing |
| `src/components/` | the toolbar, the side panel the tools open in, the outlines drawn over the page |
| `src/tools/grid/` | the grid |
| `src/tools/tokens/` | the tokens panel: `tokens.js` reads and writes the CSS, `store.js` is its state |
| `src/tools/outline/` | the outline: `outline.js` builds the tree |
| `src/tools/form/` | the form inspector: `form.js` reads a form |
| `src/tools/events/` | the events: `capture.js` records them, from `init()` on |
| `src/tools/seo/` | the SEO overview: `seo.js` reads the page and robots.txt |
| `src/tools/images/` | the images: `images.js` reads them, and the LCP element from `init()` on |
| `src/tools/cache/` | the cache tags: `cache.js` reads the server's script |
| `src/lib/` | what they share: state, storage, shortcuts, the clipboard, the page apart from the app |

## Storage

| Key | | |
|---|---|---|
| `dev-tools-toolbar` | local | the toolbar shown |
| `dev-grid-visible` | local | the grid shown |
| `dev-tokens`, `dev-tokens-css` | session | the token overrides, and the stylesheet they make |
| `dev-tokens-editors` | session | the editor chosen per token, where not Auto |
| `dev-tokens-folded`, `dev-tokens-width` | session | the tokens panel's folded groups, its width |
| `dev-outline-source`, `dev-outline-text`, `dev-outline-divs`, `dev-outline-width` | session | the outline's settings, its width |
| `dev-form-width` | session | the form inspector's width |
| `dev-events-preserve`, `dev-events-hide-gtm` | local | the events panel's Preserve log and Hide gtm.* |
| `dev-events-log`, `dev-events-width` | session | the events kept across reloads (with Preserve log), the panel's width |
| `dev-seo-source`, `dev-seo-width` | session | the SEO panel's source (Server or Rendered), its width |
| `dev-images-filter`, `dev-images-order`, `dev-images-width` | session | the images panel's filter, order, width |
| `dev-cache-width` | session | the cache panel's width |

## Upgrading

What it relies on, and the versions it was last checked against, are in `UPDATING.md`.
