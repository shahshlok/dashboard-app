import type { Location } from "../data/locations"

// Type for the detailed Ashburn data structure
export interface AshburnDetailedData {
  locationId: string
  locationName: string
  status: string
  openingDate: string
  viabilityScore: number
  viabilityStatus: string
  viabilityDescription: string
  
  executiveSummary: {
    overview: string
    keyMetrics: {
      childrenInTradeArea: number
      medianHouseholdIncome: string
      populationGrowth: string
      childPoverty: string
      priceRange: string
    }
    competitiveLandscape: string
    keyStrengths: string[]
    citations: Record<string, number>
  }
  
  marketOverview: {
    childrenInTradeArea: {
      value: string
      description: string
      citation: number
    }
    medianIncome: {
      value: string
      details: string
      citation: number
    }
    pricingRange: {
      value: string
      details: string
      citation: number
    }
    dailyTraffic: {
      value: string
      details: string
      citation: number
    }
  }
  
  marketDemographics: {
    populationData: {
      fiveMileRadius: string
      childrenCount: string
      childPercentage: string
      populationGrowth: string
      citation: number
    }
    householdComposition: {
      averageSize: string
      percentUnder18: string
      familyFormation: string
      citation: number
    }
    incomeAndSpending: {
      medianHouseholdIncome: string
      loudounCountyIncome: string
      perCapitaIncome: string
      recreationSpending: string
      povertyRate: string
      childPoverty: string
      citations: Record<string, number>
    }
    educationAndWorkforce: {
      bachelorOrHigher: string
      avgCommute: string
      foreignBorn: string
      citation: number
    }
  }
  
  realEstate: {
    locationDetails: {
      address: string
      size: string
      previous: string
      coTenants: string[]
      citation: number
    }
    leaseTerms: {
      baseRent: string
      escalator: string
      totalOccupancy: string
      citation: number
    }
    visibility: {
      route7Traffic: string
      ashburnVillageBlvd: string
      parking: string
      citation: number
    }
  }
  
  swotAnalysis: {
    strengths: Array<{
      title: string
      description: string
      citation?: number
    }>
    weaknesses: Array<{
      title: string
      description: string
      citation?: number
    }>
    opportunities: Array<{
      title: string
      description: string
      citation?: number
    }>
    threats: Array<{
      title: string
      description: string
      citation?: number
    }>
  }
  
  pricing: {
    membershipTiers: Array<{
      program: string
      price: string
      duration: string
      details: string
      citation?: number
    }>
    additionalOfferings: {
      siblingDiscounts: string
      toddlerMembership: string
      foundingMember: string
      annualFee: string
      camps: string
      birthdayParties: string
    }
    unitEconomics: {
      cac: string
      ltv: string
      avgMembershipDuration: string
      paybackPeriod: string
      citation: number
    }
  }
  
  competitorAnalysis: Array<{
    name: string
    location: string
    pricing: string
    focus: string
    strengths: string
    citation?: number
  }>
  
  marketInsights: {
    competitiveLandscape: {
      summary: string
      priceRange: string
      marketGap: string
      closures: string
      citation: number
    }
    opportunityGaps: {
      toddlerPrograms: string
      ninjaGyms: string
      comprehensiveProgram: string
    }
  }
  
  recommendations: Array<{
    priority: number
    title: string
    description: string
    owner: string
    timeline: string
    kpis: string[]
    evidence?: string
    citation?: number
  }>
  
  citationReferences: Record<string, {
    source: string
    title: string
    url?: string
    note?: string
  }>
}

// Function to load detailed Ashburn data server-side
export async function loadAshburnDetailedData(): Promise<AshburnDetailedData | null> {
  try {
    // Import the JSON data directly (server-side)
    const data = await import('../data/ashburn-detailed.json')
    return data.default as AshburnDetailedData
  } catch (error) {
    console.warn('Error loading ashburn-detailed.json:', error)
    return null
  }
}

// Function to merge detailed data with location data
export function mergeAshburnData(location: Location, detailedData: AshburnDetailedData | null): Location {
  if (!detailedData || (location.name || location.locationName) !== "Ashburn VA") {
    return location
  }
  
  // Create an enhanced location object with detailed data
  return {
    ...location,
    // Override the simple pricing with detailed pricing
    pricing: detailedData.pricing.membershipTiers.map(tier => ({
      program: tier.program,
      price: parseInt(tier.price.replace('$', '')),
      duration: tier.duration
    })),
    
    // Override the simple SWOT with detailed SWOT
    swot: {
      strengths: detailedData.swotAnalysis.strengths.map(s => s.title),
      weaknesses: detailedData.swotAnalysis.weaknesses.map(w => w.title),
      opportunities: detailedData.swotAnalysis.opportunities.map(o => o.title),
      threats: detailedData.swotAnalysis.threats.map(t => t.title)
    },
    
    // Override competitors with detailed competitor data
    competitors: detailedData.competitorAnalysis.map((comp, index) => ({
      name: comp.name,
      distance: parseFloat(comp.location.match(/(\d+\.?\d*)\s*mi/)?.[1] || '0'),
      price: parseInt(comp.pricing.match(/\$(\d+)/)?.[1] || '0'),
      coordinates: location.competitors[index]?.coordinates || [39.06, -77.47] as [number, number]
    })),
    
    // Override action plan with detailed recommendations
    actionPlan: detailedData.recommendations.slice(0, 5).map(rec => ({
      task: rec.title,
      owner: rec.owner,
      weeks: parseInt(rec.timeline.match(/(\d+)\s*weeks?/)?.[1] || '4')
    })),
    
    // Add detailed data as extended properties
    executive_summary: {
      market_opportunity: {
        children_in_trade_area: detailedData.marketOverview.childrenInTradeArea.value === "54,088" ? 54088 : parseInt(detailedData.marketOverview.childrenInTradeArea.value.replace(',', '')),
        trade_area_radius: "7 miles",
        age_range: "under age 15"
      },
      demographics: {
        median_household_income: detailedData.marketOverview.medianIncome.value,
        income_comparison: detailedData.marketOverview.medianIncome.details,
        child_poverty_rate: detailedData.executiveSummary.keyMetrics.childPoverty,
        population_growth_since_2010: detailedData.executiveSummary.keyMetrics.populationGrowth
      },
      pricing_strategy: {
        membership_range: detailedData.marketOverview.pricingRange.value
      },
      location_advantages: {
        traffic_count: detailedData.marketOverview.dailyTraffic.value,
        co_anchor: "busy Harris Teeter grocery"
      }
    },
    
    market_demographics: {
      population_data: {
        "5_mile_radius": parseInt(detailedData.marketDemographics.populationData.fiveMileRadius.replace(',', '')),
        "7_mile_children_0_14": parseInt(detailedData.marketDemographics.populationData.childrenCount.replace(',', '')),
        population_percentage: detailedData.marketDemographics.populationData.childPercentage
      },
      income_spending: {
        ashburn_median_income: detailedData.marketDemographics.incomeAndSpending.medianHouseholdIncome,
        recreation_spending: detailedData.marketDemographics.incomeAndSpending.recreationSpending,
        poverty_rate: detailedData.marketDemographics.incomeAndSpending.povertyRate
      }
    },
    
    real_estate_evaluation: {
      location_details: {
        address: detailedData.realEstate.locationDetails.address,
        square_footage: parseInt(detailedData.realEstate.locationDetails.size.replace(/[^\d]/g, '')),
        previous_tenant: detailedData.realEstate.locationDetails.previous
      },
      lease_terms: {
        base_rent: detailedData.realEstate.leaseTerms.baseRent,
        escalator: detailedData.realEstate.leaseTerms.escalator
      }
    },
    
    competitor_analysis: {
      direct_competitors: detailedData.competitorAnalysis.map(comp => ({
        name: comp.name,
        location: comp.location,
        distance: comp.location.match(/(\d+\.?\d*)\s*mi/)?.[1] || 'N/A',
        focus: comp.focus,
        pricing: comp.pricing,
        strengths: comp.strengths
      })),
      market_insights: {
        pricing_range: detailedData.marketInsights.competitiveLandscape.priceRange,
        market_gap: detailedData.marketInsights.competitiveLandscape.marketGap
      }
    },
    
    actionable_recommendations: detailedData.recommendations.map(rec => ({
      priority: rec.priority,
      action: rec.title,
      description: rec.description,
      owner: rec.owner,
      timeline: rec.timeline,
      kpis: rec.kpis
    })),
    
    // Store the full detailed data for any future use
    _detailedData: detailedData
  }
}