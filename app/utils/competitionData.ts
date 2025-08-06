import competitorsData from '../data/Gemini JSON/2_competitors.json'

export interface CompetitorInfo {
  name: string
  type: string
  source_urls?: string[]
  location?: string
}

export interface ProgramsAndCapacity {
  offerings: string[]
  facility_details?: string
  format?: string
  ages?: string
  teams?: string
  emphasis?: string
}

export interface PricingDetails {
  class_tuition?: string
  monthly_tuition?: any
  open_gym?: any
  camps?: any
  parties?: any
  admission?: any
  entry_tickets?: any[]
  monthly_membership?: any
  membership_tiers?: any[]
  classes?: any
  sibling_discount?: any
  sibling_discounts?: any
  drop_in_open_gym?: any
  open_gym_junior?: any
  trial_program?: any
  regular_pricing?: string
  family_plans?: string
  tuition?: any
  multi_class_discounts?: any
  annual_registration_fee?: any
  monthly?: any[]
  discounts?: string
  enrollment?: string
  adult_day_pass?: any
  group_discounts?: any
  contract?: string
  family_membership_cap?: string
}

export interface Competitor {
  competitor_info: CompetitorInfo
  programs_and_capacity: ProgramsAndCapacity
  pricing: PricingDetails
  differentiators_and_value_proposition: string
  source_url?: string
  source_urls?: string[]
  estimated_market_share: string
}

export interface MarketInsight {
  title: string
  analysis: string
  conclusion?: string
  source_url?: string
  source_urls?: string[]
}

export interface CompetitorLandscape {
  introduction: string
  competitor_analysis_table: {
    title: string
    competitors: Competitor[]
    sources_summary: string
  }
  findings: {
    summary: string
    key_takeaways: MarketInsight[]
  }
  conclusion: string
}

export const getCompetitorLandscape = (): CompetitorLandscape => {
  return competitorsData.competitor_landscape_10_mile_radius as CompetitorLandscape
}

export const formatCompetitors = () => {
  const landscape = getCompetitorLandscape()
  const competitors = landscape.competitor_analysis_table.competitors
  
  return competitors.map(comp => {
    // Extract distance from name if available
    let distance = ''
    let location = ''
    
    // Parse location info from name or other fields
    if (comp.competitor_info.name.includes('(')) {
      const parts = comp.competitor_info.name.split('(')
      comp.competitor_info.name = parts[0].trim()
      location = parts[1]?.replace(')', '').trim() || ''
    }
    
    // Some competitors have location in the type field
    if (comp.competitor_info.location) {
      location = comp.competitor_info.location
      distance = comp.competitor_info.location.split('•')[1]?.trim() || ''
    }
    
    // Format pricing for display
    const getPrimaryPrice = () => {
      if (comp.pricing.membership_tiers?.length > 0) {
        return `$${comp.pricing.membership_tiers[0].price_per_month}/mo`
      }
      if (comp.pricing.monthly_tuition?.price_per_month) {
        return `~$${comp.pricing.monthly_tuition.price_per_month}/mo`
      }
      if (comp.pricing.classes?.price_per_month) {
        return comp.pricing.classes.price_per_month
      }
      if (comp.pricing.admission?.weekdays?.price) {
        return comp.pricing.admission.weekdays.price
      }
      if (comp.pricing.entry_tickets?.length > 0) {
        return `$${comp.pricing.entry_tickets[0].price}/${comp.pricing.entry_tickets[0].duration}`
      }
      if (comp.pricing.trial_program?.price) {
        return comp.pricing.trial_program.price
      }
      if (comp.pricing.tuition?.base) {
        return comp.pricing.tuition.base
      }
      if (comp.pricing.monthly?.length > 0) {
        return comp.pricing.monthly[0].price
      }
      if (comp.pricing.monthly_membership?.price) {
        return comp.pricing.monthly_membership.price
      }
      return 'Pricing varies'
    }
    
    return {
      name: comp.competitor_info.name,
      type: comp.competitor_info.type,
      location: location || 'Ashburn area',
      distance: distance,
      programs: comp.programs_and_capacity.offerings,
      facilitySize: comp.programs_and_capacity.facility_details || '',
      primaryPrice: getPrimaryPrice(),
      pricing: comp.pricing,
      differentiators: comp.differentiators_and_value_proposition,
      marketShare: comp.estimated_market_share,
      sourceUrls: comp.competitor_info.source_urls || []
    }
  })
}

export const getMarketInsights = () => {
  const landscape = getCompetitorLandscape()
  return landscape.findings.key_takeaways
}

export const getCompetitionSummary = () => {
  const landscape = getCompetitorLandscape()
  return {
    introduction: landscape.introduction,
    summary: landscape.findings.summary,
    conclusion: landscape.conclusion,
    sourcesNote: landscape.competitor_analysis_table.sources_summary
  }
}

export const getPricingAnalysis = () => {
  const insights = getMarketInsights()
  const pricingInsight = insights.find(i => i.title === 'Pricing Positioning')
  return pricingInsight || null
}

export const getProgramMixAnalysis = () => {
  const insights = getMarketInsights()
  const programInsight = insights.find(i => i.title === 'Program Mix')
  return programInsight || null
}

export const getQualityDifferentiators = () => {
  const insights = getMarketInsights()
  const qualityInsight = insights.find(i => i.title === 'Quality & Differentiators')
  return qualityInsight || null
}

export const getMarketSaturationAnalysis = () => {
  const insights = getMarketInsights()
  const saturationInsight = insights.find(i => i.title === 'Market Saturation')
  return saturationInsight || null
}