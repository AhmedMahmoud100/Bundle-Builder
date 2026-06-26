/** Read a JSON value from localStorage, returning null if absent/invalid. */
export function readStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

/** Write a JSON value to localStorage; silently ignores quota/availability errors. */
export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode / quota) — non-fatal */
  }
}

/** Remove a key from localStorage. */
export function clearStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    /* non-fatal */
  }
}
