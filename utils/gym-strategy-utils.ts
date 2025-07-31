import { GymStrategy, isNewLocation, isExistingLocation } from '../types/gym-strategy';

/**
 * Normalizes gym strategy data to ensure consistent structure for dashboard parsing
 */
export function normalizeGymStrategy(data: any): GymStrategy {
  const normalized: GymStrategy = {
    report_title: data.report_title || '',
    prepared_by: data.prepared_by || '',
    date: data.date || '',
    opening_date: data.opening_date || '',
    executive_summary: normalizeExecutiveSummary(data.executive_summary || {}),
    market_demographics: normalizeMarketDemographics(data.market_demographics || {}),
    competitor_analysis: normalizeCompetitorAnalysis(data.competitor_analysis || {}),
    pricing_strategy: normalizePricingStrategy(data.pricing_strategy || {}),
    swot_analysis: normalizeSwotAnalysis(data.swot_analysis || {}),
    real_estate_evaluation: normalizeRealEstateEvaluation(data.real_estate_evaluation || {}),
    actionable_recommendations: normalizeActionableRecommendations(data.actionable_recommendations || []),
    performance_benchmarks: normalizePerformanceBenchmarks(data.performance_benchmarks || {}),
    seasonal_considerations: normalizeSeasonalConsiderations(data.seasonal_considerations || {}),
    key_citations: normalizeKeyCitations(data.key_citations || {}),
    data_tables: normalizeDataTables(data.data_tables || {}),
    methodology_note: data.methodology_note || ''
  };

  return normalized;
}

function normalizeExecutiveSummary(data: any) {
  return {
    market_opportunity: {
      children_in_trade_area: data.market_opportunity?.children_in_trade_area || 0,
      trade_area_radius: data.market_opportunity?.trade_area_radius || '',
      age_range: data.market_opportunity?.age_range || '',
      citation: data.market_opportunity?.citation || ''
    },
    demographics: {
      median_household_income: data.demographics?.median_household_income || '',
      income_comparison: data.demographics?.income_comparison || '',
      child_poverty_rate: data.demographics?.child_poverty_rate || '',
      population_growth_since_2010: data.demographics?.population_growth_since_2010,
      young_population: data.demographics?.young_population,
      extracurricular_participation: data.demographics?.extracurricular_participation,
      annual_spending: data.demographics?.annual_spending,
      education_level: data.demographics?.education_level,
      citations: data.demographics?.citations || ''
    },
    competition_gap: {
      little_gym_status: data.competition_gap?.little_gym_status,
      market_description: data.competition_gap?.market_description || '',
      waitlist_indicators: data.competition_gap?.waitlist_indicators,
      unique_offering: data.competition_gap?.unique_offering || '',
      citation: data.competition_gap?.citation || ''
    },
    pricing_strategy: {
      membership_range: data.pricing_strategy?.membership_range || '',
      benchmark_comparison: data.pricing_strategy?.benchmark_comparison,
      no_price_hikes: data.pricing_strategy?.no_price_hikes,
      family_discounts: data.pricing_strategy?.family_discounts,
      customer_acquisition: data.pricing_strategy?.customer_acquisition,
      average_membership_duration: data.pricing_strategy?.average_membership_duration,
      average_member_duration: data.pricing_strategy?.average_member_duration,
      monthly_fees: data.pricing_strategy?.monthly_fees,
      lifetime_value: data.pricing_strategy?.lifetime_value || '',
      target_customer_acquisition_cost: data.pricing_strategy?.target_customer_acquisition_cost,
      acquisition_cost: data.pricing_strategy?.acquisition_cost,
      ltv_cac_ratio: data.pricing_strategy?.ltv_cac_ratio,
      payback_period: data.pricing_strategy?.payback_period || '',
      citations: data.pricing_strategy?.citations || ''
    },
    location_advantages: {
      traffic_count: data.location_advantages?.traffic_count || '',
      co_anchor: data.location_advantages?.co_anchor,
      lease_rate: data.location_advantages?.lease_rate,
      parking: data.location_advantages?.parking,
      citation: data.location_advantages?.citation || ''
    },
    current_performance: data.current_performance ? {
      projection: data.current_performance.projection || '',
      goal: data.current_performance.goal || '',
      citation: data.current_performance.citation || ''
    } : undefined
  };
}

function normalizeMarketDemographics(data: any) {
  return {
    population_data: {
      "5_mile_radius": data.population_data?.["5_mile_radius"],
      "3_mile_radius": data.population_data?.["3_mile_radius"],
      "7_mile_radius": data.population_data?.["7_mile_radius"],
      "7_mile_children_0_14": data.population_data?.["7_mile_children_0_14"],
      population_percentage: data.population_data?.population_percentage || '',
      national_comparison: data.population_data?.national_comparison,
      households: data.population_data?.households,
      citations: data.population_data?.citations || ''
    },
    population_growth: data.population_growth ? {
      growth_rate: data.population_growth.growth_rate || '',
      area_description: data.population_growth.area_description || '',
      howard_county_growth: data.population_growth.howard_county_growth || '',
      stability: data.population_growth.stability || '',
      maryland_statewide: data.population_growth.maryland_statewide || '',
      median_age: data.population_growth.median_age || '',
      citations: data.population_growth.citations || ''
    } : undefined,
    household_composition: {
      average_household_size: data.household_composition?.average_household_size,
      comparison: data.household_composition?.comparison,
      under_18_population: data.household_composition?.under_18_population,
      family_formation: data.household_composition?.family_formation,
      birth_rates: data.household_composition?.birth_rates,
      households_with_children: data.household_composition?.households_with_children,
      workforce: data.household_composition?.workforce || '',
      education_quality: data.household_composition?.education_quality,
      education_levels: data.household_composition?.education_levels,
      diversity: data.household_composition?.diversity,
      citations: data.household_composition?.citations || ''
    },
    income_spending: {
      ashburn_median_income: data.income_spending?.ashburn_median_income,
      columbia_median_income: data.income_spending?.columbia_median_income,
      loudoun_county_median: data.income_spending?.loudoun_county_median,
      "5_mile_radius_median": data.income_spending?.["5_mile_radius_median"],
      per_capita_income: data.income_spending?.per_capita_income,
      high_earners: data.income_spending?.high_earners,
      low_income: data.income_spending?.low_income,
      us_comparison: data.income_spending?.us_comparison,
      national_ranking: data.income_spending?.national_ranking,
      recreation_spending: data.income_spending?.recreation_spending,
      extracurricular_spending: data.income_spending?.extracurricular_spending,
      summer_spending: data.income_spending?.summer_spending,
      poverty_rate: data.income_spending?.poverty_rate,
      child_poverty: data.income_spending?.child_poverty,
      citations: data.income_spending?.citations || ''
    },
    education_workforce: data.education_workforce ? {
      education_level: data.education_workforce.education_level || '',
      workforce: data.education_workforce.workforce || '',
      commute: data.education_workforce.commute || '',
      foreign_born: data.education_workforce.foreign_born || '',
      citations: data.education_workforce.citations || ''
    } : undefined,
    population_mobility: data.population_mobility ? {
      annual_net_influx: data.population_mobility.annual_net_influx || '',
      annual_turnover: data.population_mobility.annual_turnover || '',
      citations: data.population_mobility.citations || ''
    } : undefined,
    psychographics: data.psychographics ? {
      lifestyle_description: data.psychographics.lifestyle_description || '',
      weekend_activities: data.psychographics.weekend_activities || '',
      culture: data.psychographics.culture || '',
      health_orientation: data.psychographics.health_orientation || '',
      diversity_inclusion: data.psychographics.diversity_inclusion || '',
      community_engagement: data.psychographics.community_engagement || '',
      citations: data.psychographics.citations || ''
    } : undefined
  };
}

function normalizeCompetitorAnalysis(data: any) {
  return {
    direct_competitors: (data.direct_competitors || []).map((competitor: any) => ({
      name: competitor.name || '',
      location: competitor.location || '',
      distance: competitor.distance || '',
      focus: competitor.focus || '',
      pricing: competitor.pricing || '',
      facility_size: competitor.facility_size,
      strengths: competitor.strengths || '',
      notes: competitor.notes,
      citation: competitor.citation || ''
    })),
    other_notables: data.other_notables ? (data.other_notables || []).map((notable: any) => ({
      name: notable.name || '',
      location: notable.location || '',
      type: notable.type || '',
      model: notable.model || '',
      relevance: notable.relevance || '',
      citation: notable.citation || ''
    })) : undefined,
    market_insights: {
      pricing_range: data.market_insights?.pricing_range,
      competitive_assessment: data.market_insights?.competitive_assessment,
      capacity_constraints: data.market_insights?.capacity_constraints,
      franchise_positioning: data.market_insights?.franchise_positioning,
      ninja_differentiator: data.market_insights?.ninja_differentiator,
      demand_indicators: data.market_insights?.demand_indicators,
      willingness_to_pay: data.market_insights?.willingness_to_pay,
      market_gap: data.market_insights?.market_gap,
      citations: data.market_insights?.citations || ''
    }
  };
}

function normalizePricingStrategy(data: any) {
  return {
    membership_tiers: (data.membership_tiers || []).map((tier: any) => ({
      tier: tier.tier || '',
      price: tier.price || '',
      description: tier.description,
      benchmark: tier.benchmark || ''
    })),
    additional_pricing: {
      sibling_discounts: data.additional_pricing?.sibling_discounts,
      toddlers_only: data.additional_pricing?.toddlers_only,
      annual_membership_fee: data.additional_pricing?.annual_membership_fee,
      events_and_camps: data.additional_pricing?.events_and_camps,
      birthday_parties: data.additional_pricing?.birthday_parties,
      membership_model: data.additional_pricing?.membership_model,
      family_discounts: data.additional_pricing?.family_discounts,
      free_trials: data.additional_pricing?.free_trials,
      no_contracts: data.additional_pricing?.no_contracts
    },
    price_strategy: data.price_strategy ? {
      hold_steady_2025: data.price_strategy.hold_steady_2025 || '',
      location_based_pricing: data.price_strategy.location_based_pricing || '',
      value_proposition: data.price_strategy.value_proposition || '',
      citations: data.price_strategy.citations || ''
    } : undefined,
    financial_projections: {
      average_revenue_per_member: data.financial_projections?.average_revenue_per_member,
      digital_lead_costs: data.financial_projections?.digital_lead_costs,
      conversion_rate: data.financial_projections?.conversion_rate,
      customer_acquisition_cost: data.financial_projections?.customer_acquisition_cost,
      average_membership_duration: data.financial_projections?.average_membership_duration,
      customer_lifetime_value: data.financial_projections?.customer_lifetime_value,
      monthly_tuition: data.financial_projections?.monthly_tuition,
      payback_period: data.financial_projections?.payback_period,
      lifetime_value: data.financial_projections?.lifetime_value,
      ltv_cac_ratio: data.financial_projections?.ltv_cac_ratio,
      target_cac: data.financial_projections?.target_cac,
      cac_payback_period: data.financial_projections?.cac_payback_period,
      citations: data.financial_projections?.citations || ''
    }
  };
}

function normalizeSwotAnalysis(data: any) {
  return {
    strengths: (data.strengths || []).map((item: any) => ({
      item: item.item || '',
      description: item.description || '',
      citation: item.citation
    })),
    weaknesses: (data.weaknesses || []).map((item: any) => ({
      item: item.item || '',
      description: item.description || '',
      citation: item.citation
    })),
    opportunities: (data.opportunities || []).map((item: any) => ({
      item: item.item || '',
      description: item.description || '',
      citation: item.citation
    })),
    threats: (data.threats || []).map((item: any) => ({
      item: item.item || '',
      description: item.description || '',
      citation: item.citation
    }))
  };
}

function normalizeRealEstateEvaluation(data: any) {
  return {
    location_details: {
      address: data.location_details?.address || '',
      square_footage: data.location_details?.square_footage || '',
      center_size: data.location_details?.center_size,
      building_type: data.location_details?.building_type,
      zoning: data.location_details?.zoning,
      previous_tenant: data.location_details?.previous_tenant
    },
    lease_terms: {
      base_rent: data.lease_terms?.base_rent || '',
      nnn_estimate: data.lease_terms?.nnn_estimate,
      total_annual_rent: data.lease_terms?.total_annual_rent,
      market_comparison: data.lease_terms?.market_comparison,
      escalations: data.lease_terms?.escalations,
      total_occupancy_cost: data.lease_terms?.total_occupancy_cost,
      occupancy_cost: data.lease_terms?.occupancy_cost,
      escalator: data.lease_terms?.escalator,
      citation: data.lease_terms?.citation || ''
    },
    traffic_data: {
      route_7: data.traffic_data?.route_7,
      ashburn_village_blvd: data.traffic_data?.ashburn_village_blvd,
      snowden_river_parkway: data.traffic_data?.snowden_river_parkway,
      visibility: data.traffic_data?.visibility,
      speed: data.traffic_data?.speed,
      access: data.traffic_data?.access,
      regional_access: data.traffic_data?.regional_access,
      citation: data.traffic_data?.citation || ''
    },
    co_tenants: (data.co_tenants || []).map((tenant: any) => ({
      name: tenant.name || '',
      type: tenant.type,
      location: tenant.location,
      size: tenant.size,
      unit: tenant.unit,
      role: tenant.role || '',
      relevance: tenant.relevance,
      impact: tenant.impact,
      status: tenant.status
    })),
    area_amenities: data.area_amenities ? {
      nearby_retail: data.area_amenities.nearby_retail || '',
      convenience: data.area_amenities.convenience || '',
      parking: data.area_amenities.parking || '',
      citation: data.area_amenities.citation || ''
    } : undefined
  };
}

function normalizeActionableRecommendations(data: any[]) {
  return data.map((rec: any) => ({
    priority: rec.priority || '',
    action: rec.action || '',
    description: rec.description || '',
    owner: rec.owner,
    timeline: rec.timeline || '',
    rationale: rec.rationale,
    expected_impact: rec.expected_impact,
    kpis: rec.kpis || [],
    supporting_evidence: rec.supporting_evidence,
    citation: rec.citation
  }));
}

function normalizePerformanceBenchmarks(data: any) {
  return {
    internal_data: (data.internal_data || []).map((item: any) => ({
      location: item.location || '',
      opened: item.opened,
      facility_size: item.facility_size,
      lease_rate: item.lease_rate,
      market_size: item.market_size,
      peak_students: item.peak_students,
      stable_students: item.stable_students,
      current_students: item.current_students,
      current_enrollment: item.current_enrollment,
      peak_enrollment: item.peak_enrollment,
      peak_revenue: item.peak_revenue,
      avg_revenue: item.avg_revenue,
      avg_membership: item.avg_membership,
      avg_membership_duration: item.avg_membership_duration,
      monthly_tuition_range: item.monthly_tuition_range,
      waitlist: item.waitlist,
      peak_waitlist: item.peak_waitlist,
      seasonal_pattern: item.seasonal_pattern,
      notes: item.notes
    })),
    projections_ashburn: data.projections_ashburn ? {
      year_1_target: data.projections_ashburn.year_1_target || '',
      growth_strategy: data.projections_ashburn.growth_strategy || '',
      success_factors: data.projections_ashburn.success_factors || ''
    } : undefined,
    projections_columbia: data.projections_columbia ? {
      growth_target: data.projections_columbia.growth_target || '',
      duration_improvement: data.projections_columbia.duration_improvement || '',
      pricing_positioning: data.projections_columbia.pricing_positioning || ''
    } : undefined
  };
}

function normalizeSeasonalConsiderations(data: any) {
  return {
    summer_challenge: {
      clarksburg_data: data.summer_challenge?.clarksburg_data,
      pattern: data.summer_challenge?.pattern,
      mitigation_strategy: data.summer_challenge?.mitigation_strategy || '',
      opportunity: data.summer_challenge?.opportunity,
      citation: data.summer_challenge?.citation
    },
    growth_pattern: data.growth_pattern ? {
      rapid_ramp: data.growth_pattern.rapid_ramp || '',
      waitlist_management: data.growth_pattern.waitlist_management || ''
    } : undefined,
    back_to_school_surge: data.back_to_school_surge ? {
      pattern: data.back_to_school_surge.pattern || '',
      strategy: data.back_to_school_surge.strategy || '',
      citation: data.back_to_school_surge.citation || ''
    } : undefined
  };
}

function normalizeKeyCitations(data: any) {
  return {
    location_sources: data.location_sources ? (data.location_sources || []).map((source: any) => ({
      id: source.id || '',
      source: source.source || '',
      data: source.data || ''
    })) : undefined,
    demographics_sources: (data.demographics_sources || []).map((source: any) => ({
      id: source.id || '',
      source: source.source || '',
      data: source.data || ''
    })),
    competitor_sources: (data.competitor_sources || []).map((source: any) => ({
      id: source.id || '',
      source: source.source || '',
      data: source.data || ''
    })),
    market_research_sources: data.market_research_sources ? (data.market_research_sources || []).map((source: any) => ({
      id: source.id || '',
      source: source.source || '',
      data: source.data || ''
    })) : undefined,
    internal_sources: data.internal_sources ? (data.internal_sources || []).map((source: any) => ({
      id: source.id || '',
      source: source.source || '',
      data: source.data || ''
    })) : undefined,
    real_estate_sources: data.real_estate_sources ? (data.real_estate_sources || []).map((source: any) => ({
      id: source.id || '',
      source: source.source || '',
      data: source.data || ''
    })) : undefined
  };
}

function normalizeDataTables(data: any) {
  return {
    children_population_7mi_radius: data.children_population_7mi_radius ? (data.children_population_7mi_radius || []).map((item: any) => ({
      location: item.location || '',
      children_0_14: item.children_0_14 || 0
    })) : undefined,
    demographic_indicators: data.demographic_indicators ? (data.demographic_indicators || []).map((item: any) => ({
      indicator: item.indicator || '',
      value: item.value || '',
      "7_mile_estimate": item["7_mile_estimate"],
      "7_mile_value": item["7_mile_value"],
      county_wide: item.county_wide,
      percentage: item.percentage,
      notes: item.notes,
      description: item.description,
      breakdown: item.breakdown
    })) : undefined,
    performance_comparison: data.performance_comparison ? (data.performance_comparison || []).map((item: any) => ({
      location: item.location || '',
      facility_sqft: item.facility_sqft || '',
      lease_rate: item.lease_rate || '',
      children_market: item.children_market || '',
      enrollment: item.enrollment || '',
      waitlist: item.waitlist || '',
      duration: item.duration || '',
      tuition_range: item.tuition_range || ''
    })) : undefined,
    competitive_pricing: data.competitive_pricing ? (data.competitive_pricing || []).map((item: any) => ({
      provider: item.provider || '',
      program: item.program || '',
      price: item.price || ''
    })) : undefined,
    ashbrook_commons_tenants: data.ashbrook_commons_tenants ? (data.ashbrook_commons_tenants || []).map((item: any) => ({
      tenant: item.tenant || '',
      unit: item.unit || '',
      sq_ft: item.sq_ft || '',
      role: item.role || ''
    })) : undefined
  };
}

/**
 * Validates that a gym strategy object has all required fields
 */
export function validateGymStrategy(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required top-level fields
  const requiredFields = ['report_title', 'prepared_by', 'date', 'opening_date'];
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Check required nested fields
  if (!data.executive_summary?.market_opportunity?.children_in_trade_area) {
    errors.push('Missing required field: executive_summary.market_opportunity.children_in_trade_area');
  }

  if (!data.executive_summary?.demographics?.median_household_income) {
    errors.push('Missing required field: executive_summary.demographics.median_household_income');
  }

  // Add more validation as needed

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Extracts key metrics from gym strategy data for dashboard display
 */
export function extractKeyMetrics(strategy: GymStrategy) {
  const isNew = isNewLocation(strategy);

  return {
    location: extractLocationFromTitle(strategy.report_title),
    isNewLocation: isNew,
    openingDate: strategy.opening_date,
    childrenInTradeArea: strategy.executive_summary.market_opportunity.children_in_trade_area,
    medianIncome: strategy.executive_summary.demographics.median_household_income,
    membershipRange: strategy.executive_summary.pricing_strategy.membership_range,
    lifetimeValue: strategy.executive_summary.pricing_strategy.lifetime_value,
    paybackPeriod: strategy.executive_summary.pricing_strategy.payback_period,
    trafficCount: strategy.executive_summary.location_advantages.traffic_count,
    competitorCount: strategy.competitor_analysis.direct_competitors.length,
    recommendationsCount: strategy.actionable_recommendations.length,
    currentPerformance: isNew ? null : strategy.executive_summary.current_performance
  };
}

/**
 * Extracts location name from report title
 */
function extractLocationFromTitle(title: string): string {
  const matches = title.match(/–\s*([^:]+):/);
  return matches ? matches[1].trim() : 'Unknown Location';
}

/**
 * Compares two gym strategies and highlights differences
 */
export function compareStrategies(strategy1: GymStrategy, strategy2: GymStrategy) {
  const metrics1 = extractKeyMetrics(strategy1);
  const metrics2 = extractKeyMetrics(strategy2);

  return {
    location1: metrics1.location,
    location2: metrics2.location,
    comparisons: {
      childrenInTradeArea: {
        location1: metrics1.childrenInTradeArea,
        location2: metrics2.childrenInTradeArea,
        difference: metrics2.childrenInTradeArea - metrics1.childrenInTradeArea
      },
      competitorCount: {
        location1: metrics1.competitorCount,
        location2: metrics2.competitorCount,
        difference: metrics2.competitorCount - metrics1.competitorCount
      },
      recommendationsCount: {
        location1: metrics1.recommendationsCount,
        location2: metrics2.recommendationsCount,
        difference: metrics2.recommendationsCount - metrics1.recommendationsCount
      }
    }
  };
}
