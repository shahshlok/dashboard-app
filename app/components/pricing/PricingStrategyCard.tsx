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
  isExpanded?: boolean
  onToggle?: () => void
}

export default function PricingStrategyCard({ tier, isExpanded = false, onToggle }: PricingStrategyCardProps) {
  const [localExpanded, setLocalExpanded] = useState(isExpanded)
  const expanded = onToggle ? isExpanded : localExpanded
  const handleToggle = onToggle || (() => setLocalExpanded(!localExpanded))

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
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200">
      <div 
        className="p-5 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{tier.program}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(tier.type)}`}>
                {getTypeLabel(tier.type)}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Price:</span>
                <span className="ml-2 font-semibold text-green-600">{tier.price}</span>
              </div>
              <div>
                <span className="text-gray-500">Duration:</span>
                <span className="ml-2 font-medium text-gray-900">{tier.duration}</span>
              </div>
              {tier.ages && (
                <div>
                  <span className="text-gray-500">Ages:</span>
                  <span className="ml-2 font-medium text-gray-900">{tier.ages}</span>
                </div>
              )}
            </div>
            
            {tier.frequency && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="text-gray-500">Frequency:</span>
                <span className="ml-2">{tier.frequency}</span>
              </div>
            )}
          </div>
          
          <div className="ml-4 p-2">
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
      
      {expanded && tier.details && (
        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
          <div className="space-y-4">
            {tier.details.description && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600">{tier.details.description}</p>
              </div>
            )}
            
            {tier.details.marketPosition && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Market Position</h4>
                <p className="text-sm text-gray-600">{tier.details.marketPosition}</p>
              </div>
            )}
            
            {tier.details.competitors && tier.details.competitors.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Competitor Comparison</h4>
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
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Assumptions</h4>
                <ul className="space-y-1">
                  {tier.details.assumptions.map((assumption, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{assumption}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {tier.details.notes && tier.details.notes.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Additional Notes</h4>
                <ul className="space-y-1">
                  {tier.details.notes.map((note, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
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
  )
}

export function PricingTiersList({ tiers }: { tiers: PricingTier[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  
  const groupedTiers = {
    core: tiers.filter(t => t.type === 'core'),
    premium: tiers.filter(t => t.type === 'premium'),
    events: tiers.filter(t => t.type === 'event' || t.type === 'camp' || t.type === 'party')
  }

  return (
    <div className="space-y-6">
      {groupedTiers.core.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Memberships</h3>
          <div className="space-y-3">
            {groupedTiers.core.map((tier, index) => (
              <PricingStrategyCard
                key={`core-${index}`}
                tier={tier}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      )}
      
      {groupedTiers.premium.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Premium Options</h3>
          <div className="space-y-3">
            {groupedTiers.premium.map((tier, index) => {
              const globalIndex = groupedTiers.core.length + index
              return (
                <PricingStrategyCard
                  key={`premium-${index}`}
                  tier={tier}
                  isExpanded={expandedIndex === globalIndex}
                  onToggle={() => setExpandedIndex(expandedIndex === globalIndex ? null : globalIndex)}
                />
              )
            })}
          </div>
        </div>
      )}
      
      {groupedTiers.events.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Events & Special Programs</h3>
          <div className="space-y-3">
            {groupedTiers.events.map((tier, index) => {
              const globalIndex = groupedTiers.core.length + groupedTiers.premium.length + index
              return (
                <PricingStrategyCard
                  key={`event-${index}`}
                  tier={tier}
                  isExpanded={expandedIndex === globalIndex}
                  onToggle={() => setExpandedIndex(expandedIndex === globalIndex ? null : globalIndex)}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}