"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

interface CompetitorCardProps {
  name: string
  type: string
  location: string
  distance: string
  programs: string[]
  facilitySize: string
  primaryPrice: string
  pricing: any
  differentiators: string
  marketShare: string
}

export default function CompetitorCard({
  name,
  type,
  location,
  distance,
  programs,
  facilitySize,
  primaryPrice,
  pricing,
  differentiators,
  marketShare
}: CompetitorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Format pricing details for display
  const formatPricingDetails = () => {
    const details = []
    
    if (pricing.membership_tiers?.length > 0) {
      pricing.membership_tiers.forEach((tier: any) => {
        details.push({
          label: tier.description,
          value: `$${tier.price_per_month}/mo`
        })
      })
    }
    
    if (pricing.open_gym?.price) {
      details.push({
        label: 'Open Gym',
        value: pricing.open_gym.price
      })
    }
    
    if (pricing.camps?.price) {
      details.push({
        label: 'Camps',
        value: pricing.camps.price
      })
    }
    
    if (pricing.parties?.price) {
      details.push({
        label: 'Birthday Parties',
        value: pricing.parties.price
      })
    }
    
    if (pricing.admission) {
      details.push({
        label: 'Admission (Weekday)',
        value: pricing.admission.weekdays?.price || 'N/A'
      })
      details.push({
        label: 'Admission (Weekend)',
        value: pricing.admission.weekends?.price || 'N/A'
      })
    }
    
    if (pricing.entry_tickets?.length > 0) {
      pricing.entry_tickets.forEach((ticket: any) => {
        details.push({
          label: ticket.duration,
          value: `$${ticket.price}`
        })
      })
    }
    
    return details
  }

  const pricingDetails = formatPricingDetails()

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
          <p className="text-base text-gray-600 mt-1">{type}</p>
          {distance && (
            <p className="text-base text-gray-500 mt-1">{location} • {distance}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold text-green-600">{primaryPrice}</div>
          <div className="text-sm text-gray-500 mt-1">{marketShare}</div>
        </div>
      </div>

      {/* Programs */}
      <div className="mb-4">
        <h4 className="text-base font-medium text-gray-700 mb-2">Programs & Offerings</h4>
        <div className="flex flex-wrap gap-2">
          {programs.slice(0, 3).map((program, idx) => (
            <span key={idx} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {program}
            </span>
          ))}
          {programs.length > 3 && (
            <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{programs.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Facility Size */}
      {facilitySize && (
        <div className="mb-4">
          <span className="text-base text-gray-600">Facility: </span>
          <span className="text-base font-medium text-gray-900">{facilitySize}</span>
        </div>
      )}

      {/* Differentiators */}
      <div className="mb-4">
        <h4 className="text-base font-medium text-gray-700 mb-2">Key Differentiators</h4>
        <p className="text-base text-gray-600 line-clamp-2">{differentiators}</p>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 text-base text-gray-600 hover:text-gray-800 font-medium py-2 border-t border-gray-100 mt-4"
      >
        {isExpanded ? (
          <>
            <span>Show Less</span>
            <ChevronUpIcon className="h-4 w-4" />
          </>
        ) : (
          <>
            <span>View Detailed Pricing</span>
            <ChevronDownIcon className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {/* Detailed Pricing */}
          {pricingDetails.length > 0 && (
            <div className="mb-4">
              <h4 className="text-base font-medium text-gray-700 mb-3">Detailed Pricing</h4>
              <div className="space-y-2">
                {pricingDetails.map((detail, idx) => (
                  <div key={idx} className="flex justify-between items-center text-base">
                    <span className="text-gray-600">{detail.label}</span>
                    <span className="font-medium text-gray-900">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Programs */}
          <div className="mb-4">
            <h4 className="text-base font-medium text-gray-700 mb-2">All Programs</h4>
            <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
              {programs.map((program, idx) => (
                <li key={idx}>{program}</li>
              ))}
            </ul>
          </div>

          {/* Full Differentiators */}
          <div>
            <h4 className="text-base font-medium text-gray-700 mb-2">Value Proposition</h4>
            <p className="text-base text-gray-600">{differentiators}</p>
          </div>
        </div>
      )}
    </div>
  )
}