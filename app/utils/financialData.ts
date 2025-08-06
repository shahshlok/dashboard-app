import financialModelData from '../data/Gemini JSON/4_financialmodel.json'

export interface MonthlyData {
  month: string
  enrollment: number
  revenue: number
  directCost: number
  grossProfit: number
  fixedCosts: number
  adminOpex: number
  ebitda: number
  cumulativeCash: number
}

export interface ScenarioData {
  name: string
  description: string
  monthlyData: MonthlyData[]
  enrollmentAtM8: number
  revenueAtM8: number
  ebitdaAtM8: number
  breakevenMonth: string
  cumulativeCashAtM8: number
  paybackPeriod: string
}

export const getFinancialProjections = () => {
  const model = financialModelData.financial_model_specifications_and_assumptions
  const scenarios = model.scenario_financial_projections
  
  return {
    baseCase: parseScenarioData(scenarios[0]),
    conservative: parseScenarioData(scenarios[1]),
    aggressive: parseScenarioData(scenarios[2])
  }
}

const parseScenarioData = (scenario: any): ScenarioData => {
  const monthlyData = scenario.pnl_and_cash_flow_table.data.map((month: any) => ({
    month: month.month,
    enrollment: month.enrollment_end_of_month,
    revenue: month.revenue,
    directCost: Math.abs(month.direct_cost_of_instruction),
    grossProfit: month.gross_profit,
    fixedCosts: Math.abs(month.fixed_facility_costs),
    adminOpex: Math.abs(month.administrative_and_other_opex),
    ebitda: month.ebitda_operating_profit,
    cumulativeCash: month.cash_flow_cumulative
  }))
  
  return {
    name: scenario.scenario_name,
    description: scenario.pnl_and_cash_flow_table.notes,
    monthlyData,
    enrollmentAtM8: monthlyData[7].enrollment,
    revenueAtM8: monthlyData[7].revenue,
    ebitdaAtM8: monthlyData[7].ebitda,
    breakevenMonth: monthlyData.find((m: MonthlyData) => m.ebitda > 0)?.month || 'Beyond 8 months',
    cumulativeCashAtM8: monthlyData[7].cumulativeCash,
    paybackPeriod: 'TBD'
  }
}

export const getScenarioComparison = () => {
  const comparison = financialModelData.financial_model_specifications_and_assumptions
    .alternative_scenarios_summary.scenario_comparison_table.data
  
  return comparison.map((scenario: any) => ({
    scenario: scenario.scenario,
    description: scenario.description,
    enrollmentM8: scenario.enrollment_at_m8,
    revenueM8: scenario.monthly_rev_at_m8,
    ebitdaM8: scenario.monthly_ebitda_at_m8,
    breakevenMonth: scenario.breakeven_month_ebitda,
    cumulativeCashM8: scenario.cumulative_cash_at_m8,
    paybackPeriod: scenario.payback_period_est
  }))
}

export const getKeyAssumptions = () => {
  const assumptions = financialModelData.financial_model_specifications_and_assumptions
    .base_case_assumptions.assumptions
  
  return {
    enrollment: {
      target: 400,
      startingEnrollment: 100,
      monthlyGrowth: 50,
      growthRate: '15% per month',
      retention: '90% monthly'
    },
    pricing: {
      averageRevenue: 148,
      registrationFee: 65,
      unit: 'USD per month'
    },
    costs: {
      directInstructionCost: '15% of revenue',
      facilityRent: 37600,
      utilities: 3200,
      insurance: 833,
      adminPayroll: 6000
    },
    capex: {
      initial: 500000,
      purpose: 'Equipment and leasehold improvements'
    }
  }
}

export const formatChartData = (scenario: 'base' | 'conservative' | 'aggressive') => {
  const projections = getFinancialProjections()
  const data = projections[scenario === 'base' ? 'baseCase' : scenario].monthlyData
  
  return {
    revenueChart: data.map(m => ({
      month: m.month.split('-')[0],
      revenue: m.revenue,
      costs: m.directCost + m.fixedCosts + m.adminOpex,
      ebitda: m.ebitda
    })),
    enrollmentChart: data.map(m => ({
      month: m.month.split('-')[0],
      enrollment: m.enrollment,
      target: 400
    })),
    cashFlowChart: data.map(m => ({
      month: m.month.split('-')[0],
      monthlyEBITDA: m.ebitda,
      cumulativeCash: m.cumulativeCash
    })),
    costBreakdown: data.map(m => ({
      month: m.month.split('-')[0],
      direct: m.directCost,
      fixed: m.fixedCosts,
      admin: m.adminOpex
    }))
  }
}

export const calculateSensitivity = (
  baseScenario: ScenarioData,
  priceChange: number,
  retentionChange: number
) => {
  const adjustedData = baseScenario.monthlyData.map((month, index) => {
    const adjustedRevenue = month.revenue * (1 + priceChange / 100)
    const adjustedEnrollment = index === 0 ? month.enrollment : 
      Math.round(baseScenario.monthlyData[index - 1].enrollment * (1 + retentionChange / 100))
    
    const adjustedDirectCost = adjustedRevenue * 0.15
    const grossProfit = adjustedRevenue - adjustedDirectCost
    const ebitda = grossProfit - month.fixedCosts - month.adminOpex
    
    return {
      ...month,
      revenue: adjustedRevenue,
      enrollment: adjustedEnrollment,
      directCost: adjustedDirectCost,
      grossProfit,
      ebitda
    }
  })
  
  return adjustedData
}

export const getMetricsComparison = () => {
  const projections = getFinancialProjections()
  
  return {
    enrollment: {
      conservative: projections.conservative.enrollmentAtM8,
      base: projections.baseCase.enrollmentAtM8,
      aggressive: projections.aggressive.enrollmentAtM8
    },
    revenue: {
      conservative: projections.conservative.revenueAtM8,
      base: projections.baseCase.revenueAtM8,
      aggressive: projections.aggressive.revenueAtM8
    },
    ebitda: {
      conservative: projections.conservative.ebitdaAtM8,
      base: projections.baseCase.ebitdaAtM8,
      aggressive: projections.aggressive.ebitdaAtM8
    },
    breakeven: {
      conservative: projections.conservative.breakevenMonth,
      base: projections.baseCase.breakevenMonth,
      aggressive: projections.aggressive.breakevenMonth
    }
  }
}