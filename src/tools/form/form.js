// The form inspector's workings, apart from its UI (FormPanel.vue): what a
// form on the page would send, read live. By default its FormData, named
// after its id or action; a site that knows more about its forms (fields a
// condition hides, errors shown, where it posts) says so with init({ forms:
// { read } }), which gets the form and returns any of:
//
//   { data: FormData, hidden: [name], errors: { name: message }, label, endpoint }

// what redraws it: a value typed, a choice made, the form emptied
export const EVENTS = [
  'input',
  'change',
  'reset'
]

// a File as its name, size and type
export const show = value => (value instanceof File
  ? `${value.name || '(no file)'} — ${value.size} B, ${value.type || '?'}`
  : String(value))

// what the site's read() gives, the rest filled in from the form itself
export function readForm (form, read) {
  let given = {}

  try {
    given = read?.(form) ?? {}
  } catch {}

  const data = given.data instanceof FormData ? given.data : new FormData(form)

  return {
    entries: [ ...data ].map(([ name, value ]) => [ name, show(value) ]),
    hidden: [ ...(given.hidden ?? []) ],
    errors: { ...(given.errors ?? {}) },
    label: given.label ?? labelOfForm(form),
    endpoint: given.endpoint ?? `${(form.getAttribute('method') || 'get').toUpperCase()} ${form.action}`
  }
}

// `#id`, or its name, or which form it is on the page
export function labelOfForm (form, index = null) {
  if (form.id) return `#${form.id}`
  if (form.getAttribute('name')) return form.getAttribute('name')

  return index === null ? 'form' : `form ${index + 1}`
}

// the values sent, as JSON: one name, one value or a list of them; the
// underscored ones (a plugin's own) left out
export function toJson (entries) {
  const json = {}

  entries.filter(([ name ]) => !name.startsWith('_')).forEach(([ name, value ]) => {
    const key = name.replace(/\[\]$/, '')

    json[key] = key in json ? [].concat(json[key], value) : name.endsWith('[]') ? [ value ] : value
  })

  return JSON.stringify(json, null, 2)
}
