import { C } from '../data/courseData'

/** Metallic gradient — dark headers (matches Builder Academy) */
const gradientDark = {
  background: 'linear-gradient(180deg, #ffffff 0%, #c5d8ec 55%, #8fa8c4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.45))',
}

/** Navy gradient — light cards (matches Auth Builder Academy) */
const gradientLight = {
  background: `linear-gradient(135deg, ${C.navy} 0%, #3d5a80 45%, ${C.navy} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 2px 8px rgba(27, 42, 74, 0.15))',
}

export const builderAcademyWordmarkDark = {
  fontSize: '0.8rem',
  fontWeight: 800,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  ...gradientDark,
}

export const builderAcademyTitleDark = {
  margin: '0.45rem 0 0',
  ...builderAcademyWordmarkDark,
}

export const partnershipLineDark = {
  margin: 0,
  fontSize: '1.08rem',
  fontWeight: 800,
  letterSpacing: '0.1em',
  lineHeight: 1.45,
  textTransform: 'uppercase',
  ...gradientDark,
}

export const builderAcademyTitleLight = {
  margin: 0,
  fontSize: '1.15rem',
  fontWeight: 800,
  letterSpacing: '0.26em',
  textTransform: 'uppercase',
  ...gradientLight,
}

export const partnershipLineLight = {
  margin: '0 0 0.65rem',
  fontSize: '1.42rem',
  fontWeight: 800,
  letterSpacing: '0.1em',
  lineHeight: 1.45,
  textTransform: 'uppercase',
  ...gradientLight,
}
