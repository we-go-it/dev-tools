import { ownFetch } from '@/lib/requests'

// The page's cache tags, as the server says them: a JSON script in the page,
// written while the server's debug is on (README.md, Cache tags):
//
//   <script type="application/json" id="wg-cache-tags">{ "url", "cached",
//     "skipped", "note"?, "kinds"?, "tags": [{ "tag", "kind", "group",
//     "label", "view", "edit", "global"? }] }</script>
//   (global: the layout's, or declared so)
//
// `kinds`, the server's own sections ([{ kind, title, note }], in order), in
// place of WordPress's below: a CMS whose tags are other kinds (Craft's).
// `note`, a cacheable page's line (how long it's kept, say).
//
// The page is fetched again rather than read from the document: after a page
// swap (Barba and the like) the script is still the first page's, outside
// what was swapped. Fetched at its address as it is, the site's own params
// kept: the one that turns its dev tools on may be what turns the script on.

// the kinds the panel knows, in its order; any other goes under Other
export const KINDS = [
  {
    kind: 'global',
    title: 'Global',
    note: 'the site\'s, not the page\'s: rendered in the layout (header, footer) or declared global. Purging one empties the whole cache'
  },
  {
    kind: 'type',
    title: 'Lists',
    note: 'the page lists posts of the type: purged when one is published, changed or removed'
  },
  {
    kind: 'post',
    title: 'Posts',
    note: 'more than the link used (fields, image, date): purged when anything but its content changes'
  },
  {
    kind: 'content',
    title: 'Content',
    note: 'the content or excerpt rendered (its own page, excerpts in lists): purged by every save, and alone by one that changed only the content'
  },
  {
    kind: 'link',
    title: 'Links',
    note: 'only the url or title used (menus, breadcrumbs, CTAs): purged when either changes'
  },
  {
    kind: 'children',
    title: 'Children',
    note: 'the page lists the children of these posts: purged when one is added, removed, moved or changed'
  },
  {
    kind: 'term',
    title: 'Terms',
    note: 'purged when the term changes'
  },
  {
    kind: 'taxonomy',
    title: 'Term lists',
    note: 'the page lists terms of the taxonomy: purged when one is added, changed or removed, or gains or loses its posts'
  },
  {
    kind: 'pattern',
    title: 'Patterns',
    note: 'synced patterns placed on the page: purged when the pattern is saved'
  },
  {
    kind: 'text',
    title: 'Texts',
    note: 'translated texts printed from this file: purged when one of its translations is saved'
  },
  {
    kind: 'other',
    title: 'Other',
    note: 'added by hand'
  }
]

// { url, cached, skipped, tags } as the script says; { error } without one
export async function readTags () {
  const url = new URL(location.href)

  url.hash = ''

  try {
    const response = await ownFetch(url.href, { cache: 'no-store', credentials: 'same-origin' })
    const doc = new DOMParser().parseFromString(await response.text(), 'text/html')
    const script = doc.querySelector('script#wg-cache-tags[type="application/json"]')

    if (!script) return {
      url: url.href,
      error: 'The page says no cache tags. The server adds them as <script type="application/json" id="wg-cache-tags">, while its debug is on.'
    }

    return { url: url.href, ...JSON.parse(script.textContent) }
  } catch (error) {
    return { url: url.href, error: error.message || 'The page could not be fetched' }
  }
}

// the tags in the panel's sections: [{ kind, title, note, groups: [[group, tags]] }].
// `kinds`, the server's, if it says them; Other kept last for what none is
export function sections (tags, kinds = KINDS) {
  const other = KINDS.find(({ kind }) => kind === 'other')
  const all = kinds.some(({ kind }) => kind === 'other') ? kinds : [ ...kinds, other ]
  const known = new Set(all.map(({ kind }) => kind))

  return all
    .map(section => {
      // a global tag goes under Global, whatever its kind
      const ofKind = tags.filter(tag => (tag.global ? 'global' : known.has(tag.kind) ? tag.kind : 'other') === section.kind)
      const groups = [ ...Map.groupBy(ofKind, tag => tag.group ?? '') ]

      return {
        ...section,
        count: ofKind.length,
        groups
      }
    })
    .filter(section => section.count)
}
