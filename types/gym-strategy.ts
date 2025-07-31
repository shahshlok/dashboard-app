export interface GymStrategy {
  report_title: string;
  prepared_by: string;
  date: string;
  opening_date: string;
  executive_summary: ExecutiveSummary;
  market_demographics: MarketDemographics;
  competitor_analysis: CompetitorAnalysis;
  pricing_strategy: PricingStrategy;
  swot_analysis: SwotAnalysis;
  real_estate_evaluation: RealEstateEvaluation;
  actionable_recommendations: ActionableRecommendation[];
  performance_benchmarks: PerformanceBenchmarks;
  seasonal_considerations: SeasonalConsiderations;
  key_citations: KeyCitations;
  data_tables: DataTables;
  methodology_note: string;
}

export interface ExecutiveSummary {
  market_opportunity: MarketOpportunity;
  demographics: ExecutiveDemographics;
  competition_gap: CompetitionGap;
  pricing_strategy: ExecutivePricingStrategy;
  location_advantages: LocationAdvantages;
  current_performance?: CurrentPerformance; // Optional for new locations
}

export interface MarketOpportunity {
  children_in_trade_area: number;
  trade_area_radius: string;
  age_range: string;
  citation: string;
}

export interface ExecutiveDemographics {
  median_household_income: string;
  income_comparison: string;
  child_poverty_rate: string;
  population_growth_since_2010?: string; // For new locations
  young_population?: string; // For existing locations
  extracurricular_participation?: string; // For existing locations
  annual_spending?: string; // For existing locations
  education_level?: string; // For new locations
  citations: string;
}

export interface CompetitionGap {
  little_gym_status?: string; // For new locations
  market_description: string;
  waitlist_indicators?: string; // For existing locations
  unique_offering: string;
  citation: string;
}

export interface ExecutivePricingStrategy {
  membership_range: string;
  benchmark_comparison?: string; // For new locations
  no_price_hikes?: string; // For existing locations
  family_discounts?: string; // For existing locations
  customer_acquisition?: string; // For existing locations
  average_membership_duration?: string; // For new locations
  average_member_duration?: string; // For existing locations
  monthly_fees?: string; // For existing locations
  lifetime_value: string;
  target_customer_acquisition_cost?: string; // For new locations
  acquisition_cost?: string; // For existing locations
  ltv_cac_ratio?: string; // For existing locations
  payback_period: string;
  citations: string;
}

export interface LocationAdvantages {
  traffic_count: string;
  co_anchor?: string; // For new locations
  lease_rate?: string; // For existing locations
  parking?: string; // For existing locations
  citation: string;
}

export interface CurrentPerformance {
  projection: string;
  goal: string;
  citation: string;
}

export interface MarketDemographics {
  population_data: PopulationData;
  population_growth?: PopulationGrowth; // For existing locations
  household_composition: HouseholdComposition;
  income_spending: IncomeSpending;
  education_workforce?: EducationWorkforce; // For new locations
  population_mobility?: PopulationMobility; // For new locations
  psychographics?: Psychographics; // For existing locations
}

export interface PopulationData {
  "5_mile_radius"?: number;
  "3_mile_radius"?: string;
  "7_mile_radius"?: number; // For existing locations
  "7_mile_children_0_14"?: number; // For new locations
  population_percentage: string;
  national_comparison?: string; // For new locations
  households?: number; // For existing locations
  citations: string;
}

export interface PopulationGrowth {
  growth_rate: string;
  area_description: string;
  howard_county_growth: string;
  stability: string;
  maryland_statewide: string;
  median_age: string;
  citations: string;
}

export interface HouseholdComposition {
  average_household_size?: string; // For new locations
  comparison?: string; // For new locations
  under_18_population?: string; // For new locations
  family_formation?: string; // For new locations
  birth_rates?: string; // For new locations
  households_with_children?: string; // For existing locations
  workforce: string;
  education_quality?: string; // For existing locations
  education_levels?: string; // For existing locations
  diversity?: string; // For existing locations
  citations: string;
}

export interface IncomeSpending {
  ashburn_median_income?: string; // For Ashburn
  columbia_median_income?: string; // For Columbia
  loudoun_county_median?: string; // For new locations
  "5_mile_radius_median"?: string; // For existing locations
  per_capita_income?: string; // For new locations
  high_earners?: string; // For existing locations
  low_income?: string; // For existing locations
  us_comparison?: string; // For new locations
  national_ranking?: string; // For existing locations
  recreation_spending?: string; // For new locations
  extracurricular_spending?: string; // For existing locations
  summer_spending?: string; // For existing locations
  poverty_rate?: string; // For new locations
  child_poverty?: string; // For new locations
  citations: string;
}

export interface EducationWorkforce {
  education_level: string;
  workforce: string;
  commute: string;
  foreign_born: string;
  citations: string;
}

export interface PopulationMobility {
  annual_net_influx: string;
  annual_turnover: string;
  citations: string;
}

export interface Psychographics {
  lifestyle_description: string;
  weekend_activities: string;
  culture: string;
  health_orientation: string;
  diversity_inclusion: string;
  community_engagement: string;
  citations: string;
}

export interface CompetitorAnalysis {
  direct_competitors: DirectCompetitor[];
  other_notables?: OtherNotable[]; // For existing locations
  market_insights: MarketInsights;
}

export interface DirectCompetitor {
  name: string;
  location: string;
  distance: string;
  focus: string;
  pricing: string;
  facility_size?: string; // For existing locations
  strengths: string;
  notes?: string;
  citation: string;
}

export interface OtherNotable {
  name: string;
  location: string;
  type: string;
  model: string;
  relevance: string;
  citation: string;
}

export interface MarketInsights {
  pricing_range?: string; // For new locations
  competitive_assessment?: string; // For existing locations
  capacity_constraints?: string; // For existing locations
  franchise_positioning?: string; // For existing locations
  ninja_differentiator?: string; // For existing locations
  demand_indicators?: string; // For existing locations
  willingness_to_pay?: string; // For new locations
  market_gap?: string; // For new locations
  citations: string;
}

export interface PricingStrategy {
  membership_tiers: MembershipTier[];
  additional_pricing: AdditionalPricing;
  price_strategy?: PriceStrategy; // For existing locations
  financial_projections: FinancialProjections;
}

export interface MembershipTier {
  tier: string;
  price: string;
  description?: string; // For new locations
  benchmark: string;
}

export interface AdditionalPricing {
  sibling_discounts?: string; // For new locations
  toddlers_only?: string; // For new locations
  annual_membership_fee?: string; // For new locations
  events_and_camps?: string; // For new locations
  birthday_parties?: string; // For new locations
  membership_model?: string; // For existing locations
  family_discounts?: string; // For existing locations
  free_trials?: string; // For existing locations
  no_contracts?: string; // For existing locations
}

export interface PriceStrategy {
  hold_steady_2025: string;
  location_based_pricing: string;
  value_proposition: string;
  citations: string;
}

export interface FinancialProjections {
  average_revenue_per_member?: string; // For new locations
  digital_lead_costs?: string; // For existing locations
  conversion_rate?: string; // For existing locations
  customer_acquisition_cost?: string; // For existing locations
  average_membership_duration?: string; // For new locations
  customer_lifetime_value?: string; // For new locations
  monthly_tuition?: string; // For existing locations
  payback_period?: string; // For existing locations
  lifetime_value?: string; // For existing locations
  ltv_cac_ratio?: string; // For existing locations
  target_cac?: string; // For new locations
  cac_payback_period?: string; // For new locations
  citations: string;
}

export interface SwotAnalysis {
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
}

export interface SwotItem {
  item: string;
  description: string;
  citation?: string;
}

export interface RealEstateEvaluation {
  location_details: LocationDetails;
  lease_terms: LeaseTerms;
  traffic_data: TrafficData;
  co_tenants: CoTenant[];
  area_amenities?: AreaAmenities; // For existing locations
}

export interface LocationDetails {
  address: string;
  square_footage: string;
  center_size?: string; // For new locations
  building_type?: string; // For existing locations
  zoning?: string; // For existing locations
  previous_tenant?: string; // For new locations
}

export interface LeaseTerms {
  base_rent: string;
  nnn_estimate?: string; // For new locations
  total_annual_rent?: string; // For existing locations
  market_comparison?: string; // For existing locations
  escalations?: string; // For existing locations
  total_occupancy_cost?: string; // For new locations
  occupancy_cost?: string; // For existing locations
  escalator?: string; // For new locations
  citation: string;
}

export interface TrafficData {
  route_7?: string; // For Ashburn
  ashburn_village_blvd?: string; // For Ashburn
  snowden_river_parkway?: string; // For Columbia
  visibility?: string; // For existing locations
  speed?: string; // For existing locations
  access?: string; // For existing locations
  regional_access?: string; // For existing locations
  citation: string;
}

export interface CoTenant {
  name: string;
  type?: string;
  location?: string;
  size?: string;
  unit?: string;
  role: string;
  relevance?: string;
  impact?: string;
  status?: string;
}

export interface AreaAmenities {
  nearby_retail: string;
  convenience: string;
  parking: string;
  citation: string;
}

export interface ActionableRecommendation {
  priority: string;
  action: string;
  description: string;
  owner?: string; // For new locations
  timeline: string;
  rationale?: string; // For existing locations
  expected_impact?: string; // For existing locations
  kpis: string[];
  supporting_evidence?: string;
  citation?: string;
}

export interface PerformanceBenchmarks {
  internal_data: InternalData[];
  projections_ashburn?: ProjectionsAshburn; // For Ashburn
  projections_columbia?: ProjectionsColumbia; // For Columbia
}

export interface InternalData {
  location: string;
  opened?: string;
  facility_size?: string;
  lease_rate?: string;
  market_size?: string;
  peak_students?: string;
  stable_students?: string;
  current_students?: string;
  current_enrollment?: string;
  peak_enrollment?: string;
  peak_revenue?: string;
  avg_revenue?: string;
  avg_membership?: string;
  avg_membership_duration?: string;
  monthly_tuition_range?: string;
  waitlist?: string;
  peak_waitlist?: string;
  seasonal_pattern?: string;
  notes?: string;
}

export interface ProjectionsAshburn {
  year_1_target: string;
  growth_strategy: string;
  success_factors: string;
}

export interface ProjectionsColumbia {
  growth_target: string;
  duration_improvement: string;
  pricing_positioning: string;
}

export interface SeasonalConsiderations {
  summer_challenge: SummerChallenge;
  growth_pattern?: GrowthPattern; // For new locations
  back_to_school_surge?: BackToSchoolSurge; // For existing locations
}

export interface SummerChallenge {
  clarksburg_data?: string; // For new locations
  pattern?: string; // For existing locations
  mitigation_strategy: string;
  opportunity?: string; // For existing locations
  citation?: string;
}

export interface GrowthPattern {
  rapid_ramp: string;
  waitlist_management: string;
}

export interface BackToSchoolSurge {
  pattern: string;
  strategy: string;
  citation: string;
}

export interface KeyCitations {
  location_sources?: CitationSource[]; // For existing locations
  demographics_sources: CitationSource[];
  competitor_sources: CitationSource[];
  market_research_sources?: CitationSource[]; // For existing locations
  internal_sources?: CitationSource[]; // For new locations
  real_estate_sources?: CitationSource[]; // For new locations
}

export interface CitationSource {
  id: string;
  source: string;
  data: string;
}

export interface DataTables {
  children_population_7mi_radius?: ChildrenPopulation[]; // For new locations
  demographic_indicators?: DemographicIndicator[]; // For existing locations
  performance_comparison?: PerformanceComparison[]; // For existing locations
  competitive_pricing?: CompetitivePricing[]; // For existing locations
  ashbrook_commons_tenants?: AshbrookTenant[]; // For new locations
}

export interface ChildrenPopulation {
  location: string;
  children_0_14: number;
}

export interface DemographicIndicator {
  indicator: string;
  value: string;
  "7_mile_estimate"?: string;
  "7_mile_value"?: string;
  county_wide?: string;
  percentage?: string;
  notes?: string;
  description?: string;
  breakdown?: string;
}

export interface PerformanceComparison {
  location: string;
  facility_sqft: string;
  lease_rate: string;
  children_market: string;
  enrollment: string;
  waitlist: string;
  duration: string;
  tuition_range: string;
}

export interface CompetitivePricing {
  provider: string;
  program: string;
  price: string;
}

export interface AshbrookTenant {
  tenant: string;
  unit: string;
  sq_ft: string;
  role: string;
}

// Utility types for distinguishing between new and existing locations
export type NewLocationStrategy = GymStrategy & {
  executive_summary: ExecutiveSummary & {
    current_performance?: never;
  };
};

export type ExistingLocationStrategy = GymStrategy & {
  executive_summary: ExecutiveSummary & {
    current_performance: CurrentPerformance;
  };
};

// Type guards
export function isNewLocation(strategy: GymStrategy): strategy is NewLocationStrategy {
  return !strategy.executive_summary.current_performance;
}

export function isExistingLocation(strategy: GymStrategy): strategy is ExistingLocationStrategy {
  return !!strategy.executive_summary.current_performance;
}
