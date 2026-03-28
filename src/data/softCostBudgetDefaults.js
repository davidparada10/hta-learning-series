/** Initial line items (budget / actual only — %, $/SF, $/unit are derived) */
export const INITIAL_SOFT_ROWS = [
  { name: 'Architectural', budget: 159000, actual: 138000 },
  { name: 'Structural', budget: 52000, actual: 48000 },
  { name: 'Shoring', budget: 38000, actual: 25000 },
  { name: 'Civil', budget: 28000, actual: 22000 },
  { name: 'Soils Report', budget: 15000, actual: 10000 },
  { name: 'Surveyor', budget: 18500, actual: 13500 },
  { name: 'Mechanical / Plumbing', budget: 21000, actual: 15500 },
  { name: 'Electrical', budget: 19500, actual: 14000 },
  { name: 'Title 24', budget: 16500, actual: 12000 },
  { name: 'Low Voltage', budget: 11000, actual: 8000 },
  { name: 'Dry Utility', budget: 12500, actual: 9000 },
  { name: 'Tree Consultant', budget: 10000, actual: 8000 },
  { name: 'Landscape', budget: 22000, actual: 16000 },
  { name: 'Exterior Building Maintenance', budget: 17500, actual: 13000 },
  { name: 'Value Engineering / Preconstruction', budget: 23500, actual: 17000 },
  { name: 'Development Consultant', budget: 38750, actual: 28350 },
]

export const INITIAL_FEE_ROWS = [
  { name: 'Planning Fees (PZA, SB330, LADBS)', budget: 155000, actual: 155000 },
  { name: 'Permits (Building, Grading, MEP)', budget: 128750, actual: 128750 },
  { name: 'Linkage Fee (N/R if Affordable)', budget: 57500, actual: 57500 },
]

export const PROJECT_META = {
  name: 'St Rest Phase 1',
  type: 'SDBL + ED1',
}

export const INITIAL_ACTUAL_BUILDING = {
  sqft: 33261,
  units: 62,
  stories: 4,
  parking: 27,
}
