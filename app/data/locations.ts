export interface Location {
  id: string
  locationName: string
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
    coordinates: [39.17512893676758,-76.83293914794922],
    students: 548,
    targetStudents: 700,
    capacity: 82,
    ltv: 600,
    cac: 70,
    leasePerSqFt: 17.64,
    sparklineData: [333, 415, 492, 535, 591, 616, 571, 554, 548],
    
    // Extended data from comprehensive strategy report
    report_title: "Columbia Children's Gym Business Analysis Report",
    prepared_by: "Internal McKinsey analysis",
    date: "2025-05-31",
    opening_date: "October 2024",
    
    executive_summary: {
      market_opportunity: {
        children_in_trade_area: 63367,
        trade_area_radius: "7 miles",
        age_range: "under age 18"
      },
      demographics: {
        median_household_income: "$147,000",
        income_comparison: "1.5× higher than Maryland state median",
        child_poverty_rate: "~5%",
        education_level: "~63% of adults have bachelor's or higher degree"
      },
      competition_gap: {
        market_description: "competitive landscape with established providers",
        unique_offering: "comprehensive program combining fitness, gymnastics, and martial arts"
      },
      pricing_strategy: {
        membership_range: "$115 to $175 per month",
        average_membership_duration: "~4 months",
        lifetime_value: "~$600 lifetime value",
        target_customer_acquisition_cost: "<$100 CAC",
        payback_period: "within a few months"
      }
    },
    
    market_demographics: {
      population_data: {
        "7_mile_children_0_14": 63367,
        population_percentage: "about 63% Bachelor's+",
        citations: "ACS data"
      },
      income_spending: {
        ashburn_median_income: "Median family income ~$174k (household $147k)",
        poverty_rate: "Low poverty rates (~5%)"
      }
    },

    real_estate_evaluation: {
      location_details: {
        address: "9301 Snowden River Pkwy",
        square_footage: 12544,
        center_size: undefined,
        previous_tenant: undefined
      },
      lease_terms: {
        base_rent: "$17.64/sqft"
      }
    },
    
    swot: {
      strengths: [
        "Modern Facility & Programs - brand-new facility with updated equipment",
        "High Customer Satisfaction Potential - 90% retention in May 2025", 
        "Quick CAC Payback - strong unit economics with fast margin contribution",
        "Market Size - 63k children within radius provides large customer pool"
      ],
      weaknesses: [
        "Underperformance in Enrollment Ramp - slower growth than expected",
        "Small Facility - 12,544 sq ft limits capacity vs Rockville's 21k sq ft",
        "Customer Price Sensitivity - value proposition borderline for some",
        "Short Member Lifecycles - 4-month average vs 7 months at other locations"
      ],
      opportunities: [
        "Untapped Market Segments - preschoolers, homeschool families, tweens",
        "Leverage Rockville's Overflow - 281 waitlisted families could drive to Columbia",
        "Program Diversification - birthday parties, camps, premium offerings",
        "Higher Income Demographics - affluent families respond to premium positioning"
      ],
      threats: [
        "Intense Competition - My Gym, Little Gym, gymnastics clubs, martial arts",
        "Macroeconomic Shock - families cut discretionary spending in recession",
        "Seasonality - summer enrollment dips hurt momentum",
        "Cannibalization - future Silver Spring location could pull customers"
      ]
    },
    pricing: [
      { program: "Basic (1x/week)", price: 115, duration: "1 month" },
      { program: "Standard (2x/week)", price: 145, duration: "1 month" },
      { program: "Premium (Unlimited)", price: 175, duration: "1 month" },
    ],
    competitors: [
      { name: "My Gym Columbia", distance: 2.1, price: 155, coordinates: [39.21, -76.85] },
      { name: "Goldfish Swim School", distance: 0.1, price: 160, coordinates: [39.203, -76.861] },
      { name: "Columbia Gymnastics", distance: 3.5, price: 170, coordinates: [39.18, -76.84] },
      { name: "Nabaiee's Martial Arts", distance: 1.8, price: 145, coordinates: [39.195, -76.87] },
    ],
    actionPlan: [
      { task: "Summer Promo & Retention Push", owner: "GM & Marketing", weeks: 8 },
      { task: "Fall Capacity Expansion", owner: "Operations", weeks: 6 },
      { task: "Back-to-School Marketing Blitz", owner: "Marketing", weeks: 4 },
      { task: "Program Innovation & Partnerships", owner: "Program Director", weeks: 6 },
      { task: "Quality & Conversion Improvement", owner: "GM & Front Desk", weeks: 4 },
    ],
  },
  {
    id: "2",
    name: "Ashburn VA",
    status: "Planned",
    state: "Virginia",
    coordinates: [39.06040954589844, -77.47048950195312],
    students: 0,
    targetStudents: 1000,
    capacity: 0,
    ltv: 980,
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
        target_customer_acquisition_cost: "<$150 per customer",
        payback_period: "~<2 months",
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
        escalator: "None until Year 6"
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

    swot_analysis: {
      strengths: [
        {
          item: "High-Quality Location & Co-Tenancy",
          description: "Situated in Ashbrook Commons, a dominant retail center with anchors like Harris Teeter, HomeGoods, and popular eateries, providing built-in foot traffic. Daily traffic on adjacent Route 7 is ~89,000 vehicles",
          citation: "[12]"
        },
        {
          item: "Affluent, Family-Oriented Customer Base",
          description: "The local market's demographics are a perfect fit – median household incomes ~$150K+ in Ashburn ensure families have discretionary income for children's programs, and ~28% of the population is under 18",
          citation: "[18,48]"
        },
        {
          item: "Proven Business Model & Internal Benchmarks",
          description: "Our concept is validated by performance at existing locations. For example, Rockville, MD exceeded 1,300 students within 12 months of opening and generated over $250k in monthly revenue at peak",
          citation: "[45]"
        },
        {
          item: "Lack of Direct Competition (First-Mover Advantage)",
          description: "There is currently no full-service children's gym in Ashburn offering the breadth of classes we will. The closure of The Little Gym and Gymboree in Ashburn leaves a vacuum in the market"
        }
      ],
      weaknesses: [
        {
          item: "New Brand in Virginia – Needs Awareness",
          description: "Our company is new to Virginia (existing locations are in MD and GA), so we start with zero brand recognition in Ashburn"
        },
        {
          item: "Niche Competition for After-School Time",
          description: "Ashburn has at least 8–10 martial arts studios, 5+ dance studios, multiple swim schools, sports leagues, etc., all vying for kids' after-school hours"
        },
        {
          item: "High Operating Costs",
          description: "The Ashburn location has a relatively high lease rate ($23.08/sqft with NNN ~$6.90) – significantly higher base rent than some existing locations (e.g. Rockville $16.81)",
          citation: "[49,50]"
        },
        {
          item: "Capacity Constraints and Waitlist Management",
          description: "Rockville's large waitlist (281 kids) illustrates this risk. In Ashburn, facility size (19,555 sq ft) is generous, but local interest might outpace how fast we can add instructors or class sections"
        }
      ],
      opportunities: [
        {
          item: "Community Partnerships & School Outreach",
          description: "Leverage Loudoun County's tight-knit family networks by partnering with elementary schools, PTAs, and local youth organizations. With ~50+ elementary and preschools in a 7-mile radius"
        },
        {
          item: "Gap in Toddler Development Classes",
          description: "Capitalize on the void left by Gymboree etc., by expanding our offerings for ages 1–4. We can introduce parent-child classes, music & movement sessions, and open gym for toddlers"
        },
        {
          item: "Corporate and Government Partnerships",
          description: "Ashburn is near many large employers (Verizon, government contractors, etc.). We can pursue corporate wellness partnerships"
        },
        {
          item: "Emerging Fitness Trends",
          description: "We can ride the wave of popularity in \"American Ninja Warrior\" style fitness and kids' functional training. Interest in youth obstacle training is high"
        }
      ],
      threats: [
        {
          item: "Intense Competition & New Entrants",
          description: "If our concept proves successful, it could attract new entrants to Ashburn. Large franchises (My Gym, The Little Gym) might attempt a comeback seeing the demand"
        },
        {
          item: "Economic or Tech Industry Downturn",
          description: "While Loudoun is affluent, it's not immune to macroeconomic threats. Many Ashburn parents work in tech/government contracting – sectors that saw layoffs in late 2023–2024"
        },
        {
          item: "Seasonality and Churn",
          description: "Our internal performance data shows a seasonal enrollment dip in summer months – Clarksburg's student count dropped ~25% from Jan to Jul 2023"
        },
        {
          item: "Regulatory and Health Factors",
          description: "Ongoing pandemic/health concerns or future mandates could impact kids' indoor activities. Northern Virginia is mindful of health guidelines"
        }
      ]
    },

    actionable_recommendations: [
      {
        priority: 1,
        action: "Execute Pre-Launch Marketing Blitz",
        description: "Launch an aggressive local marketing campaign 8–10 weeks before opening. Tactics: social media ads targeting Ashburn parents, on-site events (pop-up in Ashbrook Commons parking lot), direct mail of \"Founding Member\" offers",
        owner: "Marketing Dept.",
        timeline: "Start 10 weeks out; run 8 weeks pre-opening",
        kpis: [
          "Goal: 200+ memberships sold by opening day",
          "Web traffic & lead volume (target 1,000+ website visits in first month of campaign)",
          "CAC per lead <$50 during pre-sale"
        ],
        supporting_evidence: "Rockville had 300+ sign-ups pre-opening with similar blitz (waitlist evidence of pre-launch demand). Ashburn's affluent, young families are highly active on social media; local FB moms' groups exceed 5k members",
        citation: "[69]"
      },
      {
        priority: 2,
        action: "School & Community Partnerships",
        description: "Establish relationships with at least 5 local elementary schools, preschools, and youth organizations (e.g. sports leagues, homeschool co-ops) for mutual promotion",
        owner: "Ops/Outreach",
        timeline: "Begin outreach 8 weeks pre-opening; ongoing",
        kpis: [
          "Leads from partnerships: e.g. capture 100+ trial sign-ups from school events",
          "Number of partnership deals (target 5 MOUs signed with schools)",
          "Referral enrollments (track how many members cite school promo)"
        ],
        supporting_evidence: "Loudoun schools encourage physical activity partnerships; martial arts studios attribute ~30% of new enrollments to after-school program tie-ins. Engaging schools leverages the 54k children in radius effectively",
        citation: "[51,1]"
      },
      {
        priority: 3,
        action: "Optimize Pricing & Membership Options for Ashburn",
        description: "Finalize a pricing structure with tiers and family discounts tailored to local willingness-to-pay. Offer a low-commitment trial (e.g. first month $99 unlimited) to reduce barrier",
        owner: "GM & Finance",
        timeline: "Finalize pricing by 6 weeks pre-opening; monitor monthly",
        kpis: [
          "Enrollment vs. target: e.g. achieve 300 active members by 3 months post-open",
          "ARPU (Average Rev per User): target ~$140/month by month 3",
          "Referral rate: >10% of new members via referral"
        ],
        supporting_evidence: "Competitors charge $150–$175/mo for similar unlimited access, indicating our planned ~$160–$180 for 2x/week is reasonable. Internal KPI: Aim for payback <3 months with CAC ~$118",
        citation: "[8,70,11]"
      },
      {
        priority: 4,
        action: "Staffing & Training for Service Excellence",
        description: "Hire and train a high-caliber team (instructors, front desk) at least 4 weeks before opening. Target hires: experienced kids' coaches (gymnastics, PE background) and enthusiastic junior assistants",
        owner: "HR & GM",
        timeline: "Hiring by 8 weeks pre; training intensive final 2 weeks pre-open",
        kpis: [
          "Customer satisfaction scores: >90% positive in first month (survey or NPS)",
          "Retention rate: target ≥85% month-to-month in first 6 months",
          "Zero major safety incidents or negative reviews in opening quarter"
        ],
        supporting_evidence: "Current locations maintain ~90% monthly retention; achieving that in Ashburn will require top-notch service given high expectations. Ashburn's educated populace will quickly voice dissatisfaction online if service falters",
        citation: "[18]"
      },
      {
        priority: 5,
        action: "Program Mix & Schedule Optimization",
        description: "Based on initial sign-ups and waitlist data, adjust our class schedule and offerings to meet demand. For example, if toddler classes fill fastest, add more weekday morning parent-child sessions",
        owner: "Program Director",
        timeline: "Analyze enrollment trends starting week 1; adjust schedule by week 4",
        kpis: [
          "Class fill rates: aim >75% capacity for each class by 3 months",
          "Waitlisted students: minimize waitlisted numbers to <10% of total enrolled (by adding capacity)",
          "Event participation: 50+ attendees at first special event"
        ],
        supporting_evidence: "Rockville experienced lengthy waitlists (281 names) when class supply didn't keep up; we must proactively add classes to avoid lost opportunities. This is facilitated by our large facility – we have room to run simultaneous classes"
      }
    ],
    
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
      { name: "American Top Team Ashburn", distance: 2.3, price: 165, coordinates: [39.0583, -77.4466] },
      { name: "InCourage Martial Arts - Winkle Dr", distance: 3.1, price: 139, coordinates: [39.0555, -77.5169] },
      { name: "InCourage Martial Arts - Southern Walk", distance: 4.2, price: 139, coordinates: [39.0084, -77.5034] },
      { name: "Premier Martial Arts Ashburn", distance: 2.8, price: 152, coordinates: [39.007, -77.486] },
      { name: "Master Lee's Martial Arts", distance: 0.1, price: 155, coordinates: [39.0614426, -77.4705951] },
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
