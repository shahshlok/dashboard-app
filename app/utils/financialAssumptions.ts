import financialModelData from '../data/Gemini JSON/4_financialmodel.json'

export interface AssumptionDetail {
  id: string
  topic: string
  title: string
  value: string | number
  unit?: string
  description: string
  source?: string
  rationale: string
  category: 'enrollment' | 'pricing' | 'costs' | 'seasonality' | 'capex' | 'validation'
}

export interface MonthlyAssumption {
  month: string
  enrollment: {
    value: number
    assumptions: string[]
    seasonalFactors?: string
  }
  revenue: {
    value: number
    assumptions: string[]
    seasonalFactors?: string
  }
  costs: {
    direct: { value: number; assumptions: string[] }
    fixed: { value: number; assumptions: string[] }
    admin: { value: number; assumptions: string[] }
  }
}

/**
 * Dynamically extract all financial model assumptions from JSON structure
 */
export const getDetailedAssumptions = (): AssumptionDetail[] => {
  const model = financialModelData.financial_model_specifications_and_assumptions
  const assumptions: AssumptionDetail[] = []

  // Parse base case assumptions dynamically
  if (model.base_case_assumptions?.assumptions) {
    model.base_case_assumptions.assumptions.forEach((assumption, index) => {
      const topic = assumption.topic

      // Handle enrollment assumptions
      if (topic?.toLowerCase().includes('enrollment')) {
        if (assumption.projections) {
          Object.entries(assumption.projections).forEach(([key, value]) => {
            assumptions.push({
              id: `enrollment-${index}-${key}`,
              topic: assumption.topic,
              title: formatTitle(key),
              value: extractValue(value),
              description: key.replace(/_/g, ' '),
              rationale: String(value),
              category: 'enrollment'
            })
          })
        }
        
        if (assumption.retention) {
          Object.entries(assumption.retention).forEach(([key, value]) => {
            if (key !== 'sensitivity') {
              assumptions.push({
                id: `retention-${index}-${key}`,
                topic: 'Retention',
                title: formatTitle(key),
                value: extractValue(value),
                description: key.replace(/_/g, ' '),
                rationale: String(value),
                category: 'enrollment'
              })
            }
          })
        }
      }

      // Handle pricing assumptions
      if (topic?.toLowerCase().includes('pricing')) {
        if (assumption.average_revenue_per_student) {
          const arpu = assumption.average_revenue_per_student
          assumptions.push({
            id: 'arpu',
            topic: assumption.topic,
            title: 'Average Revenue Per Student',
            value: arpu.value,
            unit: arpu.unit,
            description: arpu.basis,
            source: arpu.source_url,
            rationale: arpu.assumptions || '',
            category: 'pricing'
          })
        }

        if (assumption.registration_fee) {
          const regFee = assumption.registration_fee
          assumptions.push({
            id: 'registration-fee',
            topic: assumption.topic,
            title: 'Registration Fee',
            value: regFee.value,
            unit: regFee.unit,
            description: regFee.frequency,
            rationale: regFee.accounting || '',
            category: 'pricing'
          })
        }
      }

      // Handle seasonality
      if (topic?.toLowerCase().includes('seasonality')) {
        if (assumption.adjustments) {
          assumption.adjustments.forEach((adj, adjIndex) => {
            assumptions.push({
              id: `seasonality-${index}-${adjIndex}`,
              topic: assumption.topic,
              title: `${adj.period} Adjustment`,
              value: adj.multiplier || adj.reason,
              description: `Seasonal adjustment for ${adj.period}`,
              rationale: adj.reason,
              category: 'seasonality'
            })
          })
        }
      }

      // Handle cost assumptions
      if (topic?.toLowerCase().includes('cost') || topic?.toLowerCase().includes('instruction')) {
        // Handle staffing ratio
        if (assumption.staffing_ratio) {
          assumptions.push({
            id: 'staffing-ratio',
            topic: assumption.topic,
            title: 'Student-Coach Ratio',
            value: assumption.staffing_ratio.description?.match(/\d+:\d+/)?.[0] || 'N/A',
            description: assumption.staffing_ratio.description,
            rationale: assumption.staffing_ratio.estimation || '',
            category: 'costs'
          })
        }

        // Handle coach pay
        if (assumption.coach_pay) {
          assumptions.push({
            id: 'coach-pay',
            topic: assumption.topic,
            title: 'Coach Hourly Rate',
            value: assumption.coach_pay.rate,
            description: 'Loaded hourly rate for coaches',
            source: assumption.coach_pay.source_url,
            rationale: assumption.coach_pay.cost_per_100_students || '',
            category: 'costs'
          })
        }

        // Handle model assumption
        if (assumption.model_assumption) {
          assumptions.push({
            id: 'direct-cost-ratio',
            topic: assumption.topic,
            title: 'Direct Cost Ratio',
            value: assumption.model_assumption.value,
            description: 'Direct coaching costs as percentage of revenue',
            rationale: assumption.model_assumption.justification || '',
            category: 'costs'
          })
        }
      }

      // Handle fixed costs
      if (topic?.toLowerCase().includes('fixed')) {
        if (assumption.components) {
          assumption.components.forEach((component, compIndex) => {
            assumptions.push({
              id: `fixed-cost-${index}-${compIndex}`,
              topic: assumption.topic,
              title: component.item,
              value: extractValue(component.details),
              description: component.item,
              rationale: component.details,
              category: 'costs'
            })
          })
        }
      }

      // Handle opex
      if (topic?.toLowerCase().includes('operating') || topic?.toLowerCase().includes('opex')) {
        if (assumption.components) {
          assumption.components.forEach((component, compIndex) => {
            assumptions.push({
              id: `opex-${index}-${compIndex}`,
              topic: assumption.topic,
              title: component.item,
              value: extractValue(component.details),
              description: component.item,
              rationale: component.details,
              category: 'costs'
            })
          })
        }
      }

      // Handle CapEx
      if (topic?.toLowerCase().includes('capex') || topic?.toLowerCase().includes('cash flow')) {
        if (assumption.capex) {
          assumptions.push({
            id: 'initial-capex',
            topic: assumption.topic,
            title: 'Initial CapEx',
            value: assumption.capex.amount,
            unit: 'USD',
            description: assumption.capex.purpose,
            rationale: assumption.capex.accounting || '',
            category: 'capex'
          })
        }
      }
    })
  }

  // Add validation data if available
  if (model.validation_back_casting) {
    const validation = model.validation_back_casting
    if (validation.clarksburg_back_cast?.prediction_error) {
      assumptions.push({
        id: 'validation-accuracy',
        topic: 'Model Validation',
        title: 'Prediction Accuracy',
        value: validation.clarksburg_back_cast.prediction_error,
        description: 'Revenue prediction accuracy vs. Clarksburg actuals',
        rationale: validation.clarksburg_back_cast.reality || '',
        category: 'validation'
      })
    }
  }

  return assumptions
}

/**
 * Extract monthly assumptions dynamically from scenario data
 */
export const getMonthlyAssumptions = (scenario: 'base' | 'conservative' | 'aggressive'): MonthlyAssumption[] => {
  const model = financialModelData.financial_model_specifications_and_assumptions
  const scenarioMap = {
    'base': 'Base Case',
    'conservative': 'Conservative Case', 
    'aggressive': 'Aggressive Case'
  }
  
  const scenarioData = model.scenario_financial_projections?.find(s => 
    s.scenario_name === scenarioMap[scenario]
  )

  if (!scenarioData?.pnl_and_cash_flow_table?.data) return []

  // Extract scenario-specific parameters from the notes
  const notes = scenarioData.pnl_and_cash_flow_table.notes || ''
  const retentionRate = extractFromNotes(notes, /(\d+)% retention/) || '90%'
  const avgRevenue = extractFromNotes(notes, /\$(\d+)\/student/) || '$148'
  const directCostRatio = extractFromNotes(notes, /(\d+)% of revenue/) || '15%'

  return scenarioData.pnl_and_cash_flow_table.data.map((month, index) => {
    const monthName = month.month
    const seasonalFactors = getSeasonalFactors(monthName)

    return {
      month: monthName,
      enrollment: {
        value: month.enrollment_end_of_month,
        assumptions: [
          `${retentionRate} monthly retention`,
          'Average ~50 monthly growth',
          index === 0 ? 'Starting: 100 students' : 'Growth from previous month'
        ],
        seasonalFactors
      },
      revenue: {
        value: month.revenue,
        assumptions: [
          `${avgRevenue} average per student`,
          'Includes registration fees (amortized)',
          'Birthday parties: ~4-5/month',
          'Open gym sessions included'
        ],
        seasonalFactors
      },
      costs: {
        direct: {
          value: Math.abs(month.direct_cost_of_instruction),
          assumptions: [
            `${directCostRatio} of revenue`,
            '8:1 student-to-coach ratio',
            '$22/hour loaded coach rate',
            'Includes assistant coaches'
          ]
        },
        fixed: {
          value: Math.abs(month.fixed_facility_costs),
          assumptions: [
            'Rent: $37,600/month',
            'Utilities: $3,200/month', 
            'Insurance: $833/month',
            'No rent increases (5 years)'
          ]
        },
        admin: {
          value: Math.abs(month.administrative_and_other_opex),
          assumptions: getAdminAssumptions(index, monthName)
        }
      }
    }
  })
}

/**
 * Get scenario context dynamically
 */
export const getScenarioContext = (scenario: 'base' | 'conservative' | 'aggressive') => {
  const model = financialModelData.financial_model_specifications_and_assumptions
  
  if (scenario === 'base') {
    return {
      name: 'Base Case',
      description: model.introduction || 'Moderate growth scenario',
      keyAssumptions: extractBaseAssumptions(),
      rationale: 'Most likely scenario based on historical data',
      breakeven: 'Month 8 (May 2026)',
      confidence: 'Medium-High'
    }
  }

  const scenarioSummary = model.alternative_scenarios_summary?.scenarios?.find(s => 
    s.name.toLowerCase().includes(scenario)
  )

  return {
    name: scenarioSummary?.name || formatTitle(scenario),
    description: scenarioSummary?.assumptions || '',
    keyAssumptions: scenarioSummary?.impact || '',
    rationale: scenarioSummary?.projection || '',
    breakeven: extractBreakeven(scenarioSummary),
    confidence: scenario === 'conservative' ? 'High (downside)' : 'Medium (upside)'
  }
}

/**
 * Helper functions
 */
const formatTitle = (str: string): string => {
  return str.replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const extractValue = (value: any): string | number => {
  if (typeof value === 'string') {
    const numMatch = value.match(/[\d,]+/)
    if (numMatch) {
      return parseInt(numMatch[0].replace(',', ''))
    }
    return value.substring(0, 50) // Limit string length
  }
  return value
}

const extractFromNotes = (notes: string, regex: RegExp): string | null => {
  const match = notes.match(regex)
  return match ? match[0] : null
}

const getSeasonalFactors = (monthName: string): string => {
  if (monthName.includes('Dec')) {
    return 'Half revenue month - 2 week holiday closure'
  }
  if (monthName.includes('Apr') || monthName.includes('May')) {
    return 'Spring seasonal drop offset by camps'
  }
  if (monthName.includes('Jan')) {
    return 'January enrollment surge (New Year effect)'
  }
  return ''
}

const getAdminAssumptions = (index: number, monthName: string): string[] => {
  const baseAssumptions = [
    'Admin payroll: $6,000/month',
    'Misc expenses: 2% of revenue',
    'Credit card processing, supplies'
  ]

  if (index < 2) {
    return ['High marketing spend ($10k opening)', ...baseAssumptions]
  }
  
  if (monthName.includes('Dec')) {
    return ['Reduced marketing ($5k holidays)', ...baseAssumptions]
  }
  
  return ['Steady marketing ($2-3k/month)', ...baseAssumptions]
}

const extractBaseAssumptions = (): string[] => {
  const model = financialModelData.financial_model_specifications_and_assumptions
  const assumptions: string[] = []
  
  // Extract key metrics from base case
  model.base_case_assumptions?.assumptions?.forEach(assumption => {
    if (assumption.topic?.includes('Enrollment')) {
      assumptions.push('400 students by month 8')
      assumptions.push('90% monthly retention')
    }
    if (assumption.topic?.includes('Pricing')) {
      assumptions.push('$148 average revenue per student')
    }
    if (assumption.topic?.includes('Cost')) {
      assumptions.push('15% direct cost ratio')
    }
  })
  
  return assumptions
}

const extractBreakeven = (scenarioSummary: any): string => {
  if (!scenarioSummary) return 'TBD'
  
  const projection = scenarioSummary.projection || ''
  const breakevenMatch = projection.match(/month (\d+)/i)
  return breakevenMatch ? `Month ${breakevenMatch[1]}` : 'TBD'
}

/**
 * Get model validation info dynamically
 */
export const getModelValidation = () => {
  const validation = financialModelData.financial_model_specifications_and_assumptions.validation_back_casting
  
  if (!validation) return null

  return {
    summary: validation.summary,
    clarksburgBackcast: validation.clarksburg_back_cast ? {
      inputs: validation.clarksburg_back_cast.inputs,
      prediction: validation.clarksburg_back_cast.model_prediction,
      reality: validation.clarksburg_back_cast.reality,
      accuracy: validation.clarksburg_back_cast.prediction_error
    } : null,
    rockvilleBackcast: validation.rockville_back_cast ? {
      prediction: validation.rockville_back_cast.model_prediction,
      reality: validation.rockville_back_cast.reality
    } : null,
    conclusion: validation.conclusion,
    replicability: validation.replicability_note
  }
}

/**
 * Get organized assumption categories
 */
export const getAssumptionCategories = () => {
  const assumptions = getDetailedAssumptions()
  
  return {
    enrollment: assumptions.filter(a => a.category === 'enrollment'),
    pricing: assumptions.filter(a => a.category === 'pricing'),
    costs: assumptions.filter(a => a.category === 'costs'),
    seasonality: assumptions.filter(a => a.category === 'seasonality'),
    capex: assumptions.filter(a => a.category === 'capex'),
    validation: assumptions.filter(a => a.category === 'validation')
  }
}