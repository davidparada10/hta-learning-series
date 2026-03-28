import { DOMAINS } from '../data/courseData'

/** Synced with standalone.html — clear in DevTools to reset progress */
export const STORAGE_COMPLETED_DOMAINS = 'hta_learning_completed_domains'

const maxDomainId = DOMAINS[DOMAINS.length - 1].id

export function readCompletedDomainIds() {
  try {
    const raw = localStorage.getItem(STORAGE_COMPLETED_DOMAINS)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.filter(n => Number.isInteger(n) && n >= 1 && n <= maxDomainId) : []
  } catch {
    return []
  }
}

export function writeCompletedDomainIds(ids) {
  try {
    localStorage.setItem(STORAGE_COMPLETED_DOMAINS, JSON.stringify(ids))
  } catch (_) {}
}

/** Domain 1 is always unlocked; domain N unlocks after domain N−1 is marked complete (Week 12). */
export function domainUnlocked(domainId, completedDomainIds) {
  if (domainId === 1) return true
  return completedDomainIds.includes(domainId - 1)
}
