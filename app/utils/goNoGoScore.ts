/* -----------------------------------------------------------
   Location Risk Scorecard – TypeScript implementation
   ----------------------------------------------------------- */

export type RiskLevel = "Exceptional" | "Strong" | "Viable" | "High-Risk" | "Avoid";

export interface ScoreResult {
  totalScore: number;
  riskLevel: RiskLevel;
  breakdown: {
    marketPotential: {
      score: number;
      maxScore: 35;
      childPopulation: number;
      incomeScore: number;
    };
    financialViability: {
      score: number;
      maxScore: 30;
      rentRatio: number;
      saturationScore: number;
    };
    locationQuality: {
      score: number;
      maxScore: 20;
      trafficScore: number;
      anchorScore: number;
    };
    competitionDynamics: {
      score: number;
      maxScore: 15;
      gapScore: number;
      pricingScore: number;
    };
  };
  explanation: string;
}

/* ---------- Public API -------------------------------------------------- */

export function goNoGoScore(d: any): ScoreResult {
  // 1. Market Potential Score (35 points total)
  const childrenInArea = d.executive_summary?.market_opportunity?.children_in_trade_area || 
                        d.market_demographics?.population_data?.["7_mile_children_0_14"] || 0;
  
  // A. Child Population Density (20 points max)
  const childPopulationScore = Math.min((childrenInArea / 75000) * 20, 20);
  
  // B. Household Income Premium (15 points max)
  const medianIncome = d.executive_summary?.demographics?.median_household_income || 
                      d.market_demographics?.income_spending?.ashburn_median_income || "";
  
  let incomeScore = 4; // default for <$80K
  const incomeValue = extractIncomeValue(medianIncome);
  if (incomeValue >= 150000) incomeScore = 15;
  else if (incomeValue >= 100000) incomeScore = 12;
  else if (incomeValue >= 80000) incomeScore = 8;
  
  const marketPotentialScore = childPopulationScore + incomeScore;

  // 2. Financial Viability Score (30 points total)
  const baseRent = dollars(d.real_estate_evaluation?.lease_terms?.base_rent || 0);
  const squareFootage = d.real_estate_evaluation?.location_details?.square_footage || 15000;
  const annualRent = baseRent * squareFootage;
  const projectedRevenue = 1800000; // Industry benchmark
  const rentRatio = annualRent / projectedRevenue;
  
  // A. Rent-to-Revenue Ratio (20 points max)
  const rentRatioScore = Math.max(0, 20 - (rentRatio * 100));
  
  // B. Market Saturation Risk (10 points max)
  const competitorCount = (d.competitor_analysis?.direct_competitors ?? []).length;
  const childrenPerCompetitor = competitorCount > 0 ? childrenInArea / competitorCount : childrenInArea;
  const saturationScore = Math.min((childrenPerCompetitor / 5000) * 10, 10);
  
  const financialViabilityScore = rentRatioScore + saturationScore;

  // 3. Location Quality Score (20 points total)
  const trafficData = d.executive_summary?.location_advantages?.traffic_count || 
                     d.real_estate_evaluation?.traffic_data?.route_7 || "";
  const dailyTraffic = extractTrafficValue(trafficData);
  
  // A. Traffic & Accessibility (10 points max)
  let trafficScore = 4;
  if (dailyTraffic >= 50000) trafficScore = 10;
  else if (dailyTraffic >= 25000) trafficScore = 7;
  
  // B. Anchor Tenant Strength (10 points max)
  const coAnchor = d.executive_summary?.location_advantages?.co_anchor || "";
  const coTenants = d.real_estate_evaluation?.co_tenants || [];
  let anchorScore = 2; // default for weak/no anchor
  
  if (coAnchor.toLowerCase().includes("grocery") || 
      coTenants.some(t => t.type === "grocery" && t.role === "anchor")) {
    anchorScore = 10;
  } else if (coAnchor || coTenants.some(t => t.role === "anchor")) {
    anchorScore = 6;
  }
  
  const locationQualityScore = trafficScore + anchorScore;

  // 4. Competition Dynamics Score (15 points total)
  const marketGap = d.competitor_analysis?.market_insights?.market_gap || 
                   d.executive_summary?.competition_gap?.unique_offering || "";
  
  // A. Direct Competition Gap (10 points max)
  let gapScore = 2; // default for high direct competition
  if (marketGap.toLowerCase().includes("no current competitor") || 
      marketGap.toLowerCase().includes("no direct") ||
      marketGap.toLowerCase().includes("unique")) {
    gapScore = 8;
  } else if (marketGap.toLowerCase().includes("gap") || 
            marketGap.toLowerCase().includes("limited")) {
    gapScore = 6;
  }
  
  // B. Pricing Power Potential (5 points max)
  const membershipRange = d.executive_summary?.pricing_strategy?.membership_range || "";
  const maxPrice = extractMaxPrice(membershipRange);
  const pricingScore = maxPrice >= 180 ? 5 : maxPrice >= 150 ? 4 : maxPrice >= 120 ? 3 : 2;
  
  const competitionDynamicsScore = gapScore + pricingScore;

  // Calculate total score and risk level
  const totalScore = marketPotentialScore + financialViabilityScore + locationQualityScore + competitionDynamicsScore;
  
  let riskLevel: RiskLevel;
  let explanation: string;
  
  if (totalScore >= 90) {
    riskLevel = "Exceptional";
    explanation = "Outstanding opportunity with minimal risks across all categories";
  } else if (totalScore >= 80) {
    riskLevel = "Strong";
    explanation = "Solid opportunity with manageable risks and strong fundamentals";
  } else if (totalScore >= 70) {
    riskLevel = "Viable";
    explanation = "Acceptable opportunity with some concerns requiring monitoring";
  } else if (totalScore >= 60) {
    riskLevel = "High-Risk";
    explanation = "Significant risks identified requiring specific mitigation strategies";
  } else {
    riskLevel = "Avoid";
    explanation = "Multiple high-risk factors make this location unsuitable";
  }

  return {
    totalScore: Math.round(totalScore * 10) / 10,
    riskLevel,
    breakdown: {
      marketPotential: {
        score: Math.round(marketPotentialScore * 10) / 10,
        maxScore: 35,
        childPopulation: Math.round(childPopulationScore * 10) / 10,
        incomeScore: incomeScore,
      },
      financialViability: {
        score: Math.round(financialViabilityScore * 10) / 10,
        maxScore: 30,
        rentRatio: Math.round(rentRatio * 1000) / 10, // as percentage
        saturationScore: Math.round(saturationScore * 10) / 10,
      },
      locationQuality: {
        score: Math.round(locationQualityScore * 10) / 10,
        maxScore: 20,
        trafficScore: trafficScore,
        anchorScore: anchorScore,
      },
      competitionDynamics: {
        score: Math.round(competitionDynamicsScore * 10) / 10,
        maxScore: 15,
        gapScore: gapScore,
        pricingScore: pricingScore,
      },
    },
    explanation,
  };
}

/* ---------- Helper functions ------------------------------------------- */

function dollars(raw: string | number): number {
  if (typeof raw === "number") return raw;
  if (!raw) return 0;
  const str = raw
    .toString()
    .replace(/[^\d\-–\.kK]/g, "")   // drop $, commas, etc.
    .toLowerCase();

  const parts = str.split(/[-–]/); // handle ranges
  const nums  = parts.map(p => {
    const mult = p.includes("k") ? 1_000 : 1;
    return parseFloat(p.replace("k", "")) * mult;
  }).filter(n => !isNaN(n));

  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length; // midpoint if range
}

function extractIncomeValue(raw: string): number {
  if (!raw) return 0;
  
  // Look for patterns like "$150–$200K", "approximately $150K", "$152,000"
  const matches = raw.match(/\$?([\d,]+)(?:k|K|,000)?(?:\s*[-–]\s*\$?([\d,]+)(?:k|K|,000)?)?/g);
  if (!matches) return 0;
  
  const values: number[] = [];
  matches.forEach(match => {
    const nums = match.match(/[\d,]+/g);
    if (nums) {
      nums.forEach(num => {
        let value = parseInt(num.replace(/,/g, ""), 10);
        // Check if it's in thousands format (like 150K)
        if (match.toLowerCase().includes('k') && value < 1000) {
          value *= 1000;
        }
        values.push(value);
      });
    }
  });
  
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length; // average if range
}

function extractTrafficValue(raw: string): number {
  if (!raw) return 0;
  
  // Look for patterns like "89,000 vehicles/day", "~89K vehicles"
  const match = raw.match(/([\d,]+)(?:k|K)?(?:\s*vehicles)/i);
  if (!match) return 0;
  
  let value = parseInt(match[1].replace(/,/g, ""), 10);
  if (raw.toLowerCase().includes('k') && value < 1000) {
    value *= 1000;
  }
  
  return value;
}

function extractMaxPrice(raw: string): number {
  if (!raw) return 0;
  
  // Look for price ranges like "$120 to $180", "roughly from $120 to $180"
  const matches = raw.match(/\$?([\d,]+)/g);
  if (!matches) return 0;
  
  const prices = matches.map(match => parseInt(match.replace(/[\$,]/g, ""), 10))
                       .filter(price => price > 0);
  
  return prices.length > 0 ? Math.max(...prices) : 0;
}