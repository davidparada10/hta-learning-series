/** Initial line items (budget / actual only — %, $/SF, $/unit are derived) */
export const INITIAL_SOFT_ROWS = [
  { name: 'Architectural', budget: '', actual: '' },
  { name: 'Structural', budget: '', actual: '' },
  { name: 'Shoring', budget: '', actual: '' },
  { name: 'Civil', budget: '', actual: '' },
  { name: 'Soils Report', budget: '', actual: '' },
  { name: 'Surveyor', budget: '', actual: '' },
  { name: 'Mechanical / Plumbing', budget: '', actual: '' },
  { name: 'Electrical', budget: '', actual: '' },
  { name: 'Title 24', budget: '', actual: '' },
  { name: 'Low Voltage', budget: '', actual: '' },
  { name: 'Dry Utility', budget: '', actual: '' },
  { name: 'Tree Consultant', budget: '', actual: '' },
  { name: 'Landscape', budget: '', actual: '' },
  { name: 'Exterior Building Maintenance', budget: '', actual: '' },
  { name: 'Value Engineering / Preconstruction', budget: '', actual: '' },
  { name: 'Development Consultant', budget: '', actual: '' },
]

export const INITIAL_FEE_ROWS = [
  { name: 'Planning Fees (PZA, SB330, LADBS)', budget: '', actual: '' },
  { name: 'Permits (Building, Grading, MEP)', budget: '', actual: '' },
  { name: 'Linkage Fee (N/R if Affordable)', budget: '', actual: '' },
]

export const PROJECT_META = {
  name: '',
  type: '',
}

export const INITIAL_ACTUAL_BUILDING = {
  sqft: '',
  units: '',
  stories: '',
  parking: '',
}
