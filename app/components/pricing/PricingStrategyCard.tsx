"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface PricingTier {
  program: string
  price: string
  duration: string
  ages?: string
  frequency?: string
  type: 'core' | 'premium' | 'event' | 'camp' | 'party'
  details?: {
    description?: string
    marketPosition?: string
    competitors?: Array<{ name: string; price: string }>
    assumptions?: string[]
    notes?: string[]
  }
}

interface PricingStrategyCardProps {
  tier: PricingTier
}

export default function PricingStrategyCard({ tier }: PricingStrategyCardProps) {
  const [expanded, setExpanded] = useState(false)
  const handleToggle = () => setExpanded(!expanded)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'core': return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'premium': return 'bg-purple-50 border-purple-200 text-purple-700'
      case 'event': return 'bg-green-50 border-green-200 text-green-700'
      case 'camp': return 'bg-orange-50 border-orange-200 text-orange-700'
      case 'party': return 'bg-pink-50 border-pink-200 text-pink-700'
      default: return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'core': return 'Core Membership'
      case 'premium': return 'Premium'
      case 'event': return 'Special Event'
      case 'camp': return 'Camp'
      case 'party': return 'Birthday Party'
      default: return type
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden" data-testid="pricing-card">
      <div 
        className="p-4 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">{tier.program}</h3>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getTypeColor(tier.type)}`} data-testid="pricing-tag">
                {getTypeLabel(tier.type)}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm mb-2">
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">Price:</span>
                <span className="font-semibold text-green-600" data-testid="price">{tier.price}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">Duration:</span>
                <span className="font-medium text-gray-900" data-testid="duration">{tier.duration}</span>
              </div>
              {tier.ages && (
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">Ages:</span>
                  <span className="font-medium text-gray-900">{tier.ages}</span>
                </div>
              )}
              {tier.frequency && (
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">Frequency:</span>
                  <span className="font-medium text-gray-700">{tier.frequency}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="ml-3 p-1">
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" data-testid="chevron-up" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" data-testid="chevron-down" />
            )}
          </div>
        </div>
      </div>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {tier.details && (
          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50" data-testid="expanded-details">
            <div className="space-y-3">
              {tier.details.description && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                  <p className="text-sm text-gray-600">{tier.details.description}</p>
                </div>
              )}
              
              {tier.details.marketPosition && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Market Position</h4>
                  <p className="text-sm text-gray-600">{tier.details.marketPosition}</p>
                </div>
              )}
              
              {tier.details.competitors && tier.details.competitors.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Competitor Comparison</h4>
                  <div className="space-y-1">
                    {tier.details.competitors.map((comp, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{comp.name}</span>
                        <span className="font-medium text-gray-900">{comp.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {tier.details.assumptions && tier.details.assumptions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Key Assumptions</h4>
                  <ul className="space-y-0.5">
                    {tier.details.assumptions.map((assumption, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-1.5 text-xs">•</span>
                        <span>{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {tier.details.notes && tier.details.notes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Additional Notes</h4>
                  <ul className="space-y-0.5">
                    {tier.details.notes.map((note, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-gray-400 mr-1.5 text-xs">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function PricingTiersList({ tiers }: { tiers: PricingTier[] }) {
  const groupedTiers = {
    core: tiers.filter(t => t.type === 'core'),
    premium: tiers.filter(t => t.type === 'premium'),
    events: tiers.filter(t => t.type === 'event' || t.type === 'camp' || t.type === 'party')
  }

  return (
    <div className="space-y-6" data-testid="pricing-tiers-list">
      {groupedTiers.core.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Memberships</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
            {groupedTiers.core.map((tier, index) => (
              <PricingStrategyCard
                key={`core-${index}`}
                tier={tier}
              />
            ))}
          </div>
        </div>
      )}
      
      {groupedTiers.premium.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
            {groupedTiers.premium.map((tier, index) => (
              <PricingStrategyCard
                key={`premium-${index}`}
                tier={tier}
              />
            ))}
          </div>
        </div>
      )}
      
      {groupedTiers.events.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Events & Special Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
            {groupedTiers.events.map((tier, index) => (
              <PricingStrategyCard
                key={`event-${index}`}
                tier={tier}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}