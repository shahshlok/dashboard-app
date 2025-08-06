import pricingStrategyData from '../data/Gemini JSON/6_pricingstrategy.json'

export interface PricingTier {
  type: string
  description: string
  rates?: Array<{
    name: string
    ages?: string
    price_per_month?: number
    price_per_week?: number
    price_per_class?: number
    price?: number
    frequency?: string
    duration?: string
    capacity?: string
  }>
  proposal?: {
    name: string
    price_per_month: number
    offering: string
    target_audience: string
  }
  policy?: string
  exception?: {
    class_type: string
    price_per_class: number
  }
  offerings?: Array<{
    name: string
    frequency?: string
    price?: number
    price_range?: string
    price_per_child?: number
    rate?: {
      base_price_per_child: number
    }
  }>
  packages?: Array<{
    name: string
    price: number
    capacity: string
  }>
}

export interface Discount {
  type: string
  details?: string
  rate?: string
  discounts_offered?: Array<{
    name: string
    rate?: string
    examples?: string[]
  }>
}

export interface CompetitorPosition {
  name: string
  position: string
  examples?: string
}

export const getPricingStrategy = () => {
  const strategy = pricingStrategyData.pricing_strategy_and_recommendations
  return {
    summary: strategy.summary,
    tiers: strategy.proposed_pricing_architecture.tiers as PricingTier[],
    discounts: strategy.discount_frameworks.discounts as Discount[],
    competitivePosition: strategy.competitive_positioning_and_value_communication,
    elasticity: strategy.elasticity_considerations,
    monitoring: strategy.monitoring_and_adjustments
  }
}

export const formatPricingTiers = () => {
  const { tiers } = getPricingStrategy()
  
  const formattedTiers = []
  
  // Monthly Class Tuition
  const monthlyTuition = tiers[0]
  if (monthlyTuition?.rates) {
    monthlyTuition.rates.forEach(rate => {
      formattedTiers.push({
        program: rate.name,
        price: `$${rate.price_per_month}`,
        duration: 'Monthly',
        ages: rate.ages,
        frequency: rate.frequency,
        type: 'core'
      })
    })
  }
  
  // Unlimited Option
  const unlimited = tiers[1]
  if (unlimited?.proposal) {
    formattedTiers.push({
      program: unlimited.proposal.name,
      price: `$${unlimited.proposal.price_per_month}`,
      duration: 'Monthly',
      ages: 'All ages',
      frequency: 'Unlimited classes',
      type: 'premium'
    })
  }
  
  // Special Events & Camps
  const openGym = tiers[3]
  if (openGym?.offerings) {
    openGym.offerings.forEach(offering => {
      if (offering.name === 'Open Gym sessions') {
        formattedTiers.push({
          program: 'Open Gym',
          price: `$${offering.rate?.base_price_per_child || 25}`,
          duration: 'Per Session',
          ages: 'All ages',
          frequency: offering.frequency,
          type: 'event'
        })
      } else if (offering.name === "Kids' Night Out") {
        formattedTiers.push({
          program: "Kids' Night Out",
          price: offering.price_range || '$40-45',
          duration: '3-4 hours',
          ages: 'All ages',
          frequency: 'Saturday evenings',
          type: 'event'
        })
      }
    })
  }
  
  // Camps
  const camps = tiers[4]
  if (camps?.rates) {
    camps.rates.forEach(rate => {
      formattedTiers.push({
        program: rate.type,
        price: rate.price_per_week ? `$${rate.price_per_week}/week` : `$${rate.price}`,
        duration: rate.duration,
        ages: 'School age',
        frequency: 'Seasonal',
        type: 'camp'
      })
    })
  }
  
  // Birthday Parties
  const parties = tiers[5]
  if (parties?.packages) {
    parties.packages.forEach(pkg => {
      formattedTiers.push({
        program: `Birthday Party - ${pkg.name}`,
        price: `$${pkg.price}`,
        duration: '2 hours',
        ages: pkg.capacity,
        frequency: 'On demand',
        type: 'party'
      })
    })
  }
  
  return formattedTiers
}

export const getCompetitorComparison = () => {
  const { competitivePosition } = getPricingStrategy()
  const competitors = competitivePosition.price_vs_perceived_value_map.competitor_positions
  
  return competitors.map((comp: CompetitorPosition) => ({
    name: comp.examples || comp.name,
    position: comp.position,
    priceLevel: comp.position.includes('lower') ? 'low' : 
                comp.position.includes('comparable') ? 'medium' : 'high',
    valueLevel: comp.position.includes('lower value') ? 'low' :
                comp.position.includes('decent value') ? 'medium' : 'high'
  }))
}

export const getDiscountFramework = () => {
  const { discounts } = getPricingStrategy()
  
  return discounts.map(discount => ({
    type: discount.type,
    details: discount.details,
    impact: discount.type === 'Sibling Discount' ? '10% off 2nd child' :
            discount.type === 'Multi-Class Discount' ? '10% off 2nd class' :
            discount.type === 'Early Bird / Military Discounts' ? '5% military, waived registration' :
            discount.type === 'Referral Incentives' ? '$25 credit per referral' : '',
    examples: discount.discounts_offered || []
  }))
}

export const getElasticityInsights = () => {
  const { elasticity } = getPricingStrategy()
  
  return {
    summary: elasticity.summary,
    priceRange: elasticity.practical_elasticity_range.range,
    expectation: elasticity.practical_elasticity_range.expectation,
    factors: elasticity.factors_reducing_elasticity,
    insights: elasticity.insights_from_existing_sites
  }
}

export const getMonitoringKPIs = () => {
  const { monitoring } = getPricingStrategy()
  
  return {
    reviewFrequency: monitoring.review_frequency,
    kpis: monitoring.kpis_to_watch.map((kpi: any) => ({
      name: kpi.kpi,
      threshold: kpi.threshold,
      action: kpi.action,
      method: kpi.method
    })),
    economicFactors: monitoring.economic_factors
  }
}