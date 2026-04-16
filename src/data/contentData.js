// ─── Vocabulary + Session data for all domains/weeks ──────────────────────────
// Keyed by 'domainId-weekNum'.  D1W1 is already in courseData.js; this covers
// every other week so courseContent.js can merge them in.

import { D1A } from './_d1a'
import { D1B } from './_d1b'
import { D2A } from './_d2a'
import { D2B } from './_d2b'
import { D3A } from './_d3a'
import { D3B } from './_d3b'
import { D4A } from './_d4a'
import { D4B } from './_d4b'

const build = (domainId, sources) => {
  const out = {}
  for (const src of sources) {
    for (const [wk, data] of Object.entries(src)) {
      const entry = {}
      if (data.sessions)    entry.sessions    = data.sessions
      if (data.vocabulary)  entry.vocabulary  = data.vocabulary
      if (Object.keys(entry).length) out[`${domainId}-${wk}`] = entry
    }
  }
  return out
}

export const CONTENT = {
  ...build(1, [D1A, D1B]),
  ...build(2, [D2A, D2B]),
  ...build(3, [D3A, D3B]),
  ...build(4, [D4A, D4B]),
}
