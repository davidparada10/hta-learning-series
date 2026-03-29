import { DOMAINS as BASE_DOMAINS } from '../data/courseData'

const EDITS_KEY = 'hta_course_edits'

function loadEdits() {
  try { return JSON.parse(localStorage.getItem(EDITS_KEY) || '{}') } catch { return {} }
}

function saveEdits(e) {
  try { localStorage.setItem(EDITS_KEY, JSON.stringify(e)) } catch {}
}

export function getDomainsWithEdits() {
  const edits = loadEdits()
  return BASE_DOMAINS.map(d => {
    const de = edits[`d${d.id}`] || {}
    return {
      ...d,
      title: de.title ?? d.title,
      description: de.description ?? d.description,
      weeks: d.weeks.map(w => {
        const we = de.weeks?.[`w${w.week}`] || {}
        return {
          ...w,
          title: we.title ?? w.title,
          ...(we.sessions !== undefined && { sessions: we.sessions }),
          ...(we.vocabulary !== undefined && { vocabulary: we.vocabulary }),
          ...(we.concepts !== undefined && { concepts: we.concepts }),
        }
      }),
    }
  })
}

export function saveDomainEdit(domainId, patch) {
  const edits = loadEdits()
  const dk = `d${domainId}`
  edits[dk] = { ...edits[dk], ...patch }
  saveEdits(edits)
}

export function saveWeekEdit(domainId, weekNum, patch) {
  const edits = loadEdits()
  const dk = `d${domainId}`
  edits[dk] = edits[dk] || {}
  edits[dk].weeks = edits[dk].weeks || {}
  edits[dk].weeks[`w${weekNum}`] = { ...edits[dk].weeks?.[`w${weekNum}`], ...patch }
  saveEdits(edits)
}

export function resetAllEdits() {
  try { localStorage.removeItem(EDITS_KEY) } catch {}
}

export function exportEditsAsJSON() {
  return JSON.stringify(getDomainsWithEdits(), null, 2)
}
