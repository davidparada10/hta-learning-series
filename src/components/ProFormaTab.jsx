import { useState } from 'react'
import ProFormaCalc, { DEFAULT_PROFORMA_INP } from './ProFormaCalc'
import SoftCostBudget from './SoftCostBudget'
import {
  INITIAL_SOFT_ROWS,
  INITIAL_FEE_ROWS,
  INITIAL_ACTUAL_BUILDING,
  PROJECT_META,
} from '../data/softCostBudgetDefaults'

export default function ProFormaTab() {
  const [inp, setInp] = useState(DEFAULT_PROFORMA_INP)
  const [softRows, setSoftRows] = useState(INITIAL_SOFT_ROWS)
  const [feeRows, setFeeRows] = useState(INITIAL_FEE_ROWS)
  const [actualMeta, setActualMeta] = useState(INITIAL_ACTUAL_BUILDING)
  const [projectMeta, setProjectMeta] = useState(() => ({ ...PROJECT_META }))

  const totalUnits = inp.uStudio + inp.u1 + inp.u2 + inp.u3

  return (
    <>
      <ProFormaCalc inp={inp} setInp={setInp} />
      <SoftCostBudget
        projectMeta={projectMeta}
        setProjectMeta={setProjectMeta}
        proformaSf={inp.buildingGsf}
        proformaUnits={totalUnits}
        proformaStories={inp.stories}
        proformaParking={inp.parking}
        constructionSoftCost={inp.cost}
        actualMeta={actualMeta}
        setActualMeta={setActualMeta}
        softRows={softRows}
        setSoftRows={setSoftRows}
        feeRows={feeRows}
        setFeeRows={setFeeRows}
      />
    </>
  )
}
