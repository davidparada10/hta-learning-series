// ─── Quiz data for all domains and weeks ──────────────────────────────────────
// Keyed by 'domainId-weekNum'  e.g. '1-1', '1-2', '2-1', etc.

import { QUIZ as D1W1_QUIZ } from './courseData'
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
      if (data.quiz) out[`${domainId}-${wk}`] = data.quiz
    }
  }
  return out
}

export const QUIZZES = {
  '1-1': D1W1_QUIZ,
  ...build(1, [D1A, D1B]),
  ...build(2, [D2A, D2B]),
  ...build(3, [D3A, D3B]),
  ...build(4, [D4A, D4B]),
}
