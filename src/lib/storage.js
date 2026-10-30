// Storage that may not be there (a private window, blocked site data): reads
// fall back, writes are dropped.

export function readSession (key, fallback) {
  try {
    const value = sessionStorage.getItem(key)

    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export function writeSession (key, value) {
  try {
    if (value === null || value === undefined) sessionStorage.removeItem(key)
    else sessionStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export function readLocal (key, fallback) {
  try {
    const value = localStorage.getItem(key)

    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export function writeLocal (key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}
