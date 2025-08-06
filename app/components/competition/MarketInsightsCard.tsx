"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon, LightBulbIcon } from "@heroicons/react/24/outline"

interface MarketInsight {
  title: string
  analysis: string
  conclusion?: string
}

interface MarketInsightsCardProps {
  insights: MarketInsight[]
  summary: string
  conclusion: string
}

export default function MarketInsightsCard({ insights, summary, conclusion }: MarketInsightsCardProps) {
  const [expandedInsights, setExpandedInsights] = useState<number[]>([])

  const toggleInsight = (index: number) => {
    setExpandedInsights(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Get icon and color based on insight title
  const getInsightStyle = (title: string) => {
    if (title.includes('Pricing')) return { color: 'green', icon: '💰' }
    if (title.includes('Program')) return { color: 'blue', icon: '📋' }
    if (title.includes('Quality')) return { color: 'purple', icon: '⭐' }
    if (title.includes('Market')) return { color: 'orange', icon: '📊' }
    return { color: 'gray', icon: '📌' }
  }

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <LightBulbIcon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Market Analysis Summary</h3>
            <p className="text-sm text-blue-800 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Market Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const style = getInsightStyle(insight.title)
            const isExpanded = expandedInsights.includes(index)
            
            return (
              <div 
                key={index} 
                className={`border rounded-lg overflow-hidden transition-all ${
                  isExpanded ? 'shadow-md' : 'shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleInsight(index)}
                  className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{style.icon}</span>
                      <h4 className="text-lg font-medium text-gray-900 text-left">
                        {insight.title}
                      </h4>
                    </div>
                    {isExpanded ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Preview text when collapsed */}
                  {!isExpanded && (
                    <p className="mt-2 text-sm text-gray-600 text-left line-clamp-2">
                      {insight.analysis}
                    </p>
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-6 pb-4 bg-gray-50 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Analysis</h5>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {insight.analysis}
                        </p>
                      </div>
                      
                      {insight.conclusion && (
                        <div className="pt-3 border-t border-gray-200">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Strategic Implication</h5>
                          <p className="text-sm text-gray-800 leading-relaxed font-medium">
                            {insight.conclusion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-3">Strategic Positioning</h3>
        <p className="text-sm text-indigo-800 leading-relaxed">{conclusion}</p>
      </div>
    </div>
  )
}