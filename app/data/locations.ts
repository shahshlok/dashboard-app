export interface Location {
  id: string
  name: string
  status: "Active" | "Planned"
  state: string
  coordinates: [number, number]
  
  // Basic metrics (for dashboard compatibility)
  students: number
  targetStudents: number
  capacity: number
  ltv: number
  cac: number
  leasePerSqFt: number
  sparklineData: number[]
  
  // Extended data from comprehensive strategy reports
  report_title?: string
  prepared_by?: string
  date?: string
  opening_date?: string
  
  executive_summary?: {
    market_opportunity?: {
      children_in_trade_area: number
      trade_area_radius: string
      age_range: string
      citation?: string
    }
    demographics?: {
      median_household_income: string
      income_comparison?: string
      child_poverty_rate?: string
      population_growth_since_2010?: string
      education_level?: string
      citations?: string
    }
    competition_gap?: {
      little_gym_status?: string
      market_description: string
      unique_offering?: string
      citation?: string
    }
    pricing_strategy?: {
      membership_range: string
      benchmark_comparison?: string
      average_membership_duration?: string
      lifetime_value?: string
      target_customer_acquisition_cost?: string
      payback_period?: string
      citations?: string
    }
    location_advantages?: {
      traffic_count?: string
      co_anchor?: string
      citation?: string
    }
  }
  
  market_demographics?: {
    population_data?: {
      "5_mile_radius"?: number
      "3_mile_radius"?: string
      "7_mile_children_0_14"?: number
      population_percentage?: string
      national_comparison?: string
      citations?: string
    }
    household_composition?: {
      average_household_size?: string
      comparison?: string
      under_18_population?: string
      family_formation?: string
      birth_rates?: string
      citations?: string
    }
    income_spending?: {
      ashburn_median_income?: string
      loudoun_county_median?: string
      per_capita_income?: string
      us_comparison?: string
      recreation_spending?: string
      poverty_rate?: string
      child_poverty?: string
      citations?: string
    }
    education_workforce?: {
      education_level?: string
      workforce?: string
      commute?: string
      foreign_born?: string
      citations?: string
    }
    population_mobility?: {
      annual_net_influx?: string
      annual_turnover?: string
      citations?: string
    }
  }
  
  competitor_analysis?: {
    direct_competitors?: Array<{
      name: string
      location: string
      distance: string
      focus: string
      pricing: string
      strengths: string
      citation?: string
    }>
    market_insights?: {
      pricing_range?: string
      willingness_to_pay?: string
      market_gap?: string
      citations?: string
    }
  }
  
  pricing_strategy?: {
    membership_tiers?: Array<{
      tier: string
      price: string
      description: string
      benchmark?: string
    }>
    additional_pricing?: {
      sibling_discounts?: string
      toddlers_only?: string
      annual_membership_fee?: string
      events_and_camps?: string
      birthday_parties?: string
    }
    financial_projections?: {
      average_revenue_per_member?: string
      average_membership_duration?: string
      customer_lifetime_value?: string
      target_cac?: string
      cac_payback_period?: string
      citations?: string
    }
  }
  
  swot_analysis?: {
    strengths?: Array<{
      item: string
      description: string
      citation?: string
    }>
    weaknesses?: Array<{
      item: string
      description: string
      citation?: string
    }>
    opportunities?: Array<{
      item: string
      description: string
      citation?: string
    }>
    threats?: Array<{
      item: string
      description: string
      citation?: string
    }>
  }
  
  real_estate_evaluation?: {
    location_details?: {
      address?: string
      square_footage?: number
      center_size?: string
      previous_tenant?: string
    }
    lease_terms?: {
      base_rent?: string
      nnn_estimate?: string
      total_occupancy_cost?: string
      escalator?: string
      citation?: string
    }
    traffic_data?: {
      route_7?: string
      ashburn_village_blvd?: string
      citation?: string
    }
    co_tenants?: Array<{
      name: string
      type?: string
      size?: string
      unit?: string
      role?: string
    }>
  }
  
  actionable_recommendations?: Array<{
    priority: number
    action: string
    description: string
    owner: string
    timeline: string
    kpis: string[]
    supporting_evidence?: string
    citation?: string
  }>
  
  performance_benchmarks?: {
    internal_data?: Array<{
      location: string
      opened?: string
      peak_students?: string
      peak_revenue?: string
      waitlist?: string
      stable_students?: string
      avg_revenue?: string
      seasonal_pattern?: string
      current_students?: string
      avg_membership?: string
    }>
    projections_ashburn?: {
      year_1_target?: string
      growth_strategy?: string
      success_factors?: string
    }
  }
  
  seasonal_considerations?: {
    summer_challenge?: {
      clarksburg_data?: string
      mitigation_strategy?: string
    }
    growth_pattern?: {
      rapid_ramp?: string
      waitlist_management?: string
    }
  }
  
  key_citations?: {
    demographics_sources?: Array<{
      id: string
      source: string
      data: string
    }>
    competitor_sources?: Array<{
      id: string
      source: string
      data: string
    }>
    internal_sources?: Array<{
      id: string
      source: string
      data: string
    }>
    real_estate_sources?: Array<{
      id: string
      source: string
      data: string
    }>
  }
  
  data_tables?: {
    children_population_7mi_radius?: Array<{
      location: string
      children_0_14: number
    }>
    ashbrook_commons_tenants?: Array<{
      tenant: string
      unit?: string
      sq_ft?: number
      role?: string
    }>
  }
  
  methodology_note?: string
  
  // Simplified data for backwards compatibility
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  pricing: {
    program: string
    price: number
    duration: string
  }[]
  competitors: {
    name: string
    distance: number
    price: number
    coordinates: [number, number]
  }[]
  actionPlan: {
    task: string
    owner: string
    weeks: number
  }[]
}

export const locations: Location[] = [
  {
    id: "1",
    name: "Columbia MD",
    status: "Active",
    state: "Maryland",
    coordinates: [39.2037, -76.861],
    students: 245,
    targetStudents: 300,
    capacity: 82,
    ltv: 4500,
    cac: 125,
    leasePerSqFt: 28.5,
    sparklineData: [180, 195, 210, 225, 235, 240, 245, 250, 245, 240, 245, 245],
    swot: {
      strengths: ["Prime location", "Strong community ties", "Experienced staff"],
      weaknesses: ["Limited parking", "Aging equipment"],
      opportunities: ["Corporate partnerships", "After-school programs"],
      threats: ["New competitor opening", "Economic downturn"],
    },
    pricing: [
      { program: "Monthly Unlimited", price: 89, duration: "1 month" },
      { program: "Annual Membership", price: 799, duration: "12 months" },
      { program: "Drop-in Class", price: 25, duration: "1 class" },
    ],
    competitors: [
      { name: "FitZone Columbia", distance: 0.8, price: 79, coordinates: [39.21, -76.85] },
      { name: "Elite Fitness", distance: 1.2, price: 95, coordinates: [39.195, -76.87] },
      { name: "Community Gym", distance: 2.1, price: 65, coordinates: [39.18, -76.84] },
    ],
    actionPlan: [
      { task: "Equipment upgrade", owner: "Operations", weeks: 4 },
      { task: "Marketing campaign", owner: "Marketing", weeks: 2 },
      { task: "Staff training", owner: "HR", weeks: 3 },
    ],
  },
  {
    id: "2",
    name: "Ashburn VA",
    status: "Planned",
    state: "Virginia",
    coordinates: [39.0438, -77.4874],
    students: 0,
    targetStudents: 1000,
    capacity: 0,
    ltv: 1000,
    cac: 120,
    leasePerSqFt: 23.08,
    sparklineData: [0, 0, 0, 0, 0, 0, 50, 80, 120, 150, 180, 200],
    
    // Extended data from comprehensive strategy report
    report_title: "Children's Gym – Ashburn, VA: Market Entry & Operational Strategy",
    prepared_by: "Deep-Research Agent",
    date: "2025-07-31",
    opening_date: "2025-10-09",
    
    executive_summary: {
      market_opportunity: {
        children_in_trade_area: 54088,
        trade_area_radius: "7 miles",
        age_range: "under age 15",
        citation: "[1]"
      },
      demographics: {
        median_household_income: "approximately $150–$200K",
        income_comparison: "about 1.5× higher than state and U.S. averages",
        child_poverty_rate: "~3–4%",
        population_growth_since_2010: "29%",
        education_level: "highly educated and tech-savvy",
        citations: "[2,3,4,5]"
      },
      competition_gap: {
        little_gym_status: "closed in recent years",
        market_description: "fragmented landscape of kids' activity providers",
        unique_offering: "no competitor offering the same comprehensive program under one roof",
        citation: "[6]"
      },
      pricing_strategy: {
        membership_range: "roughly from $120 to $180 per month",
        benchmark_comparison: "ninja gym memberships at ~$175/mo for 2 classes/week and karate dojos ~$150–$175/mo unlimited",
        average_membership_duration: "~7 months",
        lifetime_value: "about $1,000–$1,200",
        target_customer_acquisition_cost: "<$120",
        payback_period: "around 2–3 months",
        citations: "[7,8,9,10,11]"
      },
      location_advantages: {
        traffic_count: "~89,000 vehicles/day on Route 7 nearby",
        co_anchor: "busy Harris Teeter grocery",
        citation: "[12]"
      }
    },
    
    market_demographics: {
      population_data: {
        "5_mile_radius": 166000,
        "3_mile_radius": "~79,000 people",
        "7_mile_children_0_14": 54088,
        population_percentage: "roughly 26–28% of the local populace",
        national_comparison: "slightly above the national average for under-15 age share",
        citations: "[13,14,15,16]"
      },
      household_composition: {
        average_household_size: "about 2.7–3.0 persons",
        comparison: "higher than state averages",
        under_18_population: "Over 26% of Loudoun's population is under 18",
        family_formation: "High family formation rates",
        birth_rates: "approximately 4.3% of women 15–50 give birth annually, about 10% above Virginia's average",
        citations: "[17,18]"
      },
      income_spending: {
        ashburn_median_income: "~$152,000 (ACS 2023)",
        loudoun_county_median: "~$179,000",
        per_capita_income: "around $67k",
        us_comparison: "over 1.5× the U.S. median",
        recreation_spending: "~43% above the national average on recreation categories",
        poverty_rate: "only ~3.6% of Ashburn residents live below poverty (versus ~10% statewide)",
        child_poverty: "Loudoun under-18 poverty ~4%",
        citations: "[19,20,21,22,23]"
      },
      education_workforce: {
        education_level: "~66% of Ashburn residents hold a bachelor's or higher",
        workforce: "Many work in professional/tech jobs (Ashburn is part of the Northern Virginia tech corridor)",
        commute: "average ~29-minute commute",
        foreign_born: "significant portion of residents (~26%) are foreign-born",
        citations: "[24,25,26]"
      },
      population_mobility: {
        annual_net_influx: "~0.8–1%",
        annual_turnover: "~11–12% of residents move annually",
        citations: "[27,28]"
      }
    },
    
    competitor_analysis: {
      direct_competitors: [
        {
          name: "Fitwize 4 Kids",
          location: "Ashburn, VA",
          distance: "~5 mi SE",
          focus: "Kids' fitness center – tumbling, \"mini gym\" classes for ages 6 mo–12; after-school & camps",
          pricing: "$99/mo for weekly toddler class (intro rate); tiered class packages for older kids",
          strengths: "Diverse programs (fitness + academic focus); after-school transport",
          citation: "[29,30]"
        },
        {
          name: "Always In Motion Ninja & Parkour",
          location: "Sterling, VA",
          distance: "~4 mi E",
          focus: "Ninja warrior obstacle courses & parkour training; classes (ages 5–adult), open gyms, teams, parties",
          pricing: "Memberships: $96/mo (1 class/wk) to $175/mo (2 classes/wk); Day-pass $30 for open gym",
          strengths: "Large new facility (opened 2025) with multi-level obstacles; frequent new course layouts keep engagement high",
          citation: "[31,32]"
        },
        {
          name: "Hyper Kidz Indoor Playground",
          location: "Ashburn, VA",
          distance: "~3 mi S",
          focus: "Indoor play space (16,000 sq ft) with multi-level play zones for ages 0–13; drop-in open play and parties (no formal classes)",
          pricing: "Pay-per-visit: $11.99–$13.99 weekdays, $16.99–$18.99 weekends per child (unlimited play); membership not required",
          strengths: "Huge \"anytime\" play attraction; very popular for younger kids' playdates and weekday use",
          citation: "[33,34,35]"
        },
        {
          name: "ZavaZone Adventure Park",
          location: "Sterling, VA",
          distance: "~6 mi E",
          focus: "Indoor adventure park – trampolines, ropes course, climbing, zip lines, and ninja courses; primarily open session play, parties",
          pricing: "Pay-per-time: $33.50 for 90 min, $48 for 3 hrs; $55 for all-day pass",
          strengths: "Broad age appeal (5–adult); variety of attractions in one venue for family outings",
          citation: "[36,37]"
        },
        {
          name: "Master Lee's Martial Arts",
          location: "Ashburn, VA",
          distance: "<0.1 mi (same plaza)",
          focus: "Taekwondo martial arts school; classes for kids (4+), teens, adults; after-school program with pickup, summer camps",
          pricing: "~$150–$160/mo for standard 2–3 classes per week (estimated; similar local schools range $150–$175)",
          strengths: "Established local reputation; disciplined curriculum teaching respect & focus; convenient in-center location (co-tenant) for our customers",
          citation: "[38]"
        },
        {
          name: "Super Kicks Karate",
          location: "Ashburn, VA",
          distance: "~2 mi SW",
          focus: "Karate & kickboxing school; family-oriented classes (parents and kids train together options)",
          pricing: "$150–$175/mo unlimited classes (month-to-month, no long contract)",
          strengths: "Strong community presence (active in local events); flexible attendance model and free trial periods",
          citation: "[8,10]"
        }
      ],
      market_insights: {
        pricing_range: "$100–$180/month for memberships or classes",
        willingness_to_pay: "families' willingness to pay for quality offerings",
        market_gap: "no current competitor provides a structured, milestone-tracked developmental fitness curriculum for young children",
        citations: "[7,8,44]"
      }
    },
    
    pricing_strategy: {
      membership_tiers: [
        {
          tier: "Once-a-Week Membership",
          price: "approx. $120/month",
          description: "one class per week",
          benchmark: "Little gym franchises often charge ~$110–$130/mo for weekly classes"
        },
        {
          tier: "Twice-a-Week Membership",
          price: "approx. $160–$170/month",
          description: "two classes per week",
          benchmark: "Always in Motion charges $175/mo for 2x week; martial arts typically ~$150–$180 for unlimited classes"
        },
        {
          tier: "Unlimited Membership",
          price: "approx. $200/month",
          description: "unlimited classes/open gym access",
          benchmark: "ninja gym $235/mo unlimited"
        }
      ],
      additional_pricing: {
        sibling_discounts: "e.g. 20% off 2nd child",
        toddlers_only: "match that for ages 1–3 to quickly build our base of young families",
        annual_membership_fee: "A modest annual fee (~$50) for processing",
        events_and_camps: "Parents' Night Out events for $25, Summer Camp weekly fee ~$250",
        birthday_parties: "around $300–$400 for up to 15 kids"
      },
      financial_projections: {
        average_revenue_per_member: "~$140/month (weighted across plans)",
        average_membership_duration: "~7 months (observed at our Clarksburg and Rockville gyms)",
        customer_lifetime_value: "roughly $980 (7 months × $140)",
        target_cac: "<$150 per customer",
        cac_payback_period: "~<2 months",
        citations: "[45,11]"
      }
    },
    
    real_estate_evaluation: {
      location_details: {
        address: "20070 Ashbrook Commons Plaza, Suite 2155",
        square_footage: 19555,
        center_size: "~171,000 sq ft",
        previous_tenant: "Off Broadway Shoes"
      },
      lease_terms: {
        base_rent: "$23.08/sqft",
        nnn_estimate: "~$6.90/sqft",
        total_occupancy_cost: "roughly $30/sqft or ~$48k per month",
        escalator: "no escalator until Year 6",
        citation: "[61]"
      },
      traffic_data: {
        route_7: "over 89k vehicles per day passing near Ashbrook Commons",
        ashburn_village_blvd: "nearly 20k vehicles/day at this site",
        citation: "[12]"
      },
      co_tenants: [
        {
          name: "Harris Teeter",
          type: "grocery",
          size: "48,756 sq ft",
          role: "anchor"
        },
        {
          name: "HomeGoods",
          size: "25,651 sq ft",
          role: "major tenant"
        },
        {
          name: "Master Lee's Martial Arts",
          size: "2,926 sq ft",
          unit: "2126",
          role: "co-tenant"
        },
        {
          name: "Pet Supplies Plus",
          size: "9,143 sq ft",
          role: "family traffic generator"
        }
      ]
    },
    
    // Backwards compatibility - simplified format
    swot: {
      strengths: [
        "High-Quality Location & Co-Tenancy - ~89,000 vehicles/day on Route 7",
        "Affluent, Family-Oriented Customer Base - median household incomes ~$150K+", 
        "Proven Business Model & Internal Benchmarks - Rockville exceeded 1,300 students",
        "Lack of Direct Competition (First-Mover Advantage)"
      ],
      weaknesses: [
        "New Brand in Virginia – Needs Awareness", 
        "Niche Competition for After-School Time",
        "High Operating Costs - $23.08/sqft lease rate",
        "Capacity Constraints and Waitlist Management"
      ],
      opportunities: [
        "Community Partnerships & School Outreach - ~50+ elementary schools in 7-mile radius",
        "Gap in Toddler Development Classes - void left by Gymboree",
        "Corporate and Government Partnerships - near major employers",
        "Emerging Fitness Trends - American Ninja Warrior popularity"
      ],
      threats: [
        "Intense Competition & New Entrants",
        "Economic or Tech Industry Downturn",
        "Seasonality and Churn - 25% summer enrollment drop",
        "Regulatory and Health Factors"
      ],
    },
    pricing: [
      { program: "Once-a-Week", price: 120, duration: "1 month" },
      { program: "Twice-a-Week", price: 165, duration: "1 month" },
      { program: "Unlimited", price: 200, duration: "1 month" },
    ],
    competitors: [
      { name: "Fitwize 4 Kids", distance: 5, price: 99, coordinates: [39.05, -77.48] },
      { name: "Always In Motion", distance: 4, price: 175, coordinates: [39.035, -77.495] },
      { name: "Master Lee's Martial Arts", distance: 0.1, price: 155, coordinates: [39.0438, -77.4874] },
      { name: "Super Kicks Karate", distance: 2, price: 162, coordinates: [39.02, -77.50] },
    ],
    actionPlan: [
      { task: "Execute Pre-Launch Marketing Blitz", owner: "Marketing Dept.", weeks: 10 },
      { task: "School & Community Partnerships", owner: "Ops/Outreach", weeks: 8 },
      { task: "Optimize Pricing & Membership Options", owner: "GM & Finance", weeks: 6 },
      { task: "Staffing & Training for Service Excellence", owner: "HR & GM", weeks: 8 },
      { task: "Program Mix & Schedule Optimization", owner: "Program Director", weeks: 4 },
    ],
  },
]
