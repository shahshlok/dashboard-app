# Gym Strategy Data Structure

This directory contains standardized JSON data files for gym location strategies and the unified schema to handle both new and existing gym locations.

## Overview

The gym strategy data comes in two types:
- **New Locations**: Gyms that haven't opened yet (like Ashburn)
- **Existing Locations**: Gyms that are already operational (like Columbia)

## Files

### Data Files
- `ashburn_gym_strategy.json` - Strategy for new Ashburn location
- `columbia_gym_strategy.json` - Strategy for existing Columbia location

### Schema & Types
- `gym_strategy_schema.json` - Unified JSON schema template
- `../types/gym-strategy.ts` - TypeScript interfaces
- `../utils/gym-strategy-utils.ts` - Utility functions

## Structure Differences

While both files share the same top-level structure, they differ in some subsections due to the nature of new vs. existing locations:

### New Locations (Ashburn)
- No `current_performance` section
- Has `education_workforce` and `population_mobility` in demographics
- Includes `children_population_7mi_radius` and `ashbrook_commons_tenants` in data tables
- 5 actionable recommendations

### Existing Locations (Columbia)
- Includes `current_performance` section
- Has `population_growth` and `psychographics` in demographics
- Includes `demographic_indicators`, `performance_comparison`, and `competitive_pricing` in data tables
- 7 actionable recommendations
- Additional `price_strategy` section

## Using the Data

### TypeScript/JavaScript

```typescript
import { GymStrategy, normalizeGymStrategy, extractKeyMetrics } from '../utils/gym-strategy-utils';

// Load and normalize data
const rawData = require('./ashburn_gym_strategy.json');
const strategy: GymStrategy = normalizeGymStrategy(rawData);

// Extract key metrics for dashboard
const metrics = extractKeyMetrics(strategy);
console.log(metrics);

// Check if it's a new or existing location
import { isNewLocation, isExistingLocation } from '../types/gym-strategy';

if (isNewLocation(strategy)) {
  console.log('This is a new location');
} else if (isExistingLocation(strategy)) {
  console.log('This is an existing location');
  console.log('Current performance:', strategy.executive_summary.current_performance);
}
```

### Dashboard Integration

The `normalizeGymStrategy()` function ensures both files conform to the same structure:

```typescript
// Load both files
const ashburnData = normalizeGymStrategy(require('./ashburn_gym_strategy.json'));
const columbiaData = normalizeGymStrategy(require('./columbia_gym_strategy.json'));

// Both now have the same structure, with optional fields handled gracefully
const locations = [ashburnData, columbiaData];

// Safe to iterate and display in dashboard
locations.forEach(location => {
  console.log(`Location: ${extractKeyMetrics(location).location}`);
  console.log(`Children in trade area: ${location.executive_summary.market_opportunity.children_in_trade_area}`);
  
  // Handle optional fields
  if (location.executive_summary.current_performance) {
    console.log(`Current performance: ${location.executive_summary.current_performance.projection}`);
  }
});
```

## Field Mapping

### Common Fields (Both Types)
- `report_title`, `prepared_by`, `date`, `opening_date`
- `executive_summary.market_opportunity`
- `executive_summary.demographics` (core fields)
- `executive_summary.competition_gap`
- `executive_summary.pricing_strategy`
- `executive_summary.location_advantages`
- All SWOT analysis sections
- Basic real estate evaluation

### New Location Specific
- `market_demographics.education_workforce`
- `market_demographics.population_mobility`
- `data_tables.children_population_7mi_radius`
- `data_tables.ashbrook_commons_tenants`
- `performance_benchmarks.projections_ashburn`

### Existing Location Specific
- `executive_summary.current_performance`
- `market_demographics.population_growth`
- `market_demographics.psychographics`
- `pricing_strategy.price_strategy`
- `data_tables.demographic_indicators`
- `data_tables.performance_comparison`
- `data_tables.competitive_pricing`
- `performance_benchmarks.projections_columbia`
- `seasonal_considerations.back_to_school_surge`

## Validation

Use the validation utility to ensure data integrity:

```typescript
import { validateGymStrategy } from '../utils/gym-strategy-utils';

const validation = validateGymStrategy(rawData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

## Comparison

Compare multiple locations:

```typescript
import { compareStrategies } from '../utils/gym-strategy-utils';

const comparison = compareStrategies(ashburnData, columbiaData);
console.log('Comparison:', comparison);
```

## Best Practices

1. **Always normalize data** using `normalizeGymStrategy()` before processing
2. **Use type guards** (`isNewLocation()`, `isExistingLocation()`) to handle differences
3. **Check for optional fields** before accessing them
4. **Validate data** when loading from external sources
5. **Extract key metrics** for dashboard display using `extractKeyMetrics()`

## Adding New Locations

When adding new gym location data:

1. Follow the schema structure in `gym_strategy_schema.json`
2. Use appropriate fields based on whether it's new or existing
3. Validate the data using the utility functions
4. Test with both dashboard components and type checking

## Schema Evolution

If you need to add new fields:

1. Update `gym_strategy_schema.json`
2. Update TypeScript interfaces in `gym-strategy.ts`
3. Update normalization function in `gym-strategy-utils.ts`
4. Add appropriate validation logic
5. Update this README