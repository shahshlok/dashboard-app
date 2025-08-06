"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CompetitivePosChart } from '../charts/FinancialCharts'
import { getValueCalculationMethodology } from '../../utils/competitorValueCalculation'

interface CompetitorData {
  name: string
  price: number
  value: number
  note: string
}

interface CompetitivePositioningCardProps {
  competitors: CompetitorData[]
}

export default function CompetitivePositioningCard({ competitors }: CompetitivePositioningCardProps) {
  const [isMethodologyExpanded, setIsMethodologyExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Price vs. Value Positioning</h3>
        <p className="text-base text-gray-600 mb-6">
          DDGA Ashburn positioned as premium offering with superior value through Olympic brand, 
          state-of-the-art facility, and comprehensive program offerings. Value scores are calculated 
          using transparent methodology based on quantitative data.
        </p>
        {competitors.length > 0 && <CompetitivePosChart data={competitors} />}
      </div>

      {/* Value Calculation Methodology - Expandable */}
      <div className="border-t border-gray-200">
        <div 
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsMethodologyExpanded(!isMethodologyExpanded)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Value Calculation Methodology</h4>
              <p className="text-base text-gray-600 mt-1">
                Transparent scoring system for competitive value assessment
              </p>
            </div>
            <div className="ml-4 p-2">
              {isMethodologyExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>
        
        {isMethodologyExpanded && (
          <div className="border-t border-gray-100 px-6 py-5 bg-gray-50">
            <div className="prose max-w-none">
              <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {getValueCalculationMethodology()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}