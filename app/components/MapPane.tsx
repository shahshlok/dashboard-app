"use client"

import dynamic from "next/dynamic"
import type { Location } from "../data/locations"
import ScenarioAnalyzer from "./pricing/ScenarioAnalyzer"

interface MapPaneProps {
  location: Location
  selectedSwotCategory?: 'strengths' | 'weaknesses' | 'opportunities' | 'threats' | null
  onSwotCategoryClose?: () => void
  activeTab?: string
  onScenarioChange?: (scenario: 'conservative' | 'base' | 'aggressive') => void
}

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import("./GoogleMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
})

export default function MapPane({ location, selectedSwotCategory, onSwotCategoryClose, activeTab, onScenarioChange }: MapPaneProps) {
  const enhancedLocation = location as any

  // Show ScenarioAnalyzer for Pricing tab on Ashburn location
  if (activeTab === 'pricingEconomics' && (enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA") {
    return <ScenarioAnalyzer onScenarioChange={onScenarioChange} />
  }

  // Show SWOT details if a category is selected
  if (selectedSwotCategory && (enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA" && enhancedLocation?._detailedData) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl capitalize text-gray-900">
              {selectedSwotCategory} Analysis
            </h3>
            <button 
              onClick={onSwotCategoryClose}
              className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Close SWOT details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-base text-gray-600 mt-2">
            Detailed insights and explanations
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {(() => {
              const detailedData = enhancedLocation._detailedData;
              const swotCategoryData = detailedData?.swotAnalysis?.[selectedSwotCategory];
              
              if (swotCategoryData && Array.isArray(swotCategoryData)) {
                return swotCategoryData.map((item: any, index: number) => (
                  <div key={index} className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-base text-gray-900 flex-1 pr-3">
                        {item.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                        selectedSwotCategory === 'strengths' ? 'bg-green-100 text-green-700' :
                        selectedSwotCategory === 'weaknesses' ? 'bg-red-100 text-red-700' :
                        selectedSwotCategory === 'opportunities' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    {item.citation && (() => {
                      const citationRef = detailedData?.citationReferences?.[item.citation.toString()];
                      
                      if (citationRef) {
                        return (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="text-sm text-gray-500">
                              <div className="flex items-start gap-2">
                                <span className="font-medium text-gray-600">Source:</span>
                                <div className="flex-1">
                                  <div className="mb-1 text-gray-600">{citationRef.source}</div>
                                  {citationRef.url ? (
                                    <a 
                                      href={citationRef.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 underline break-all text-sm"
                                    >
                                      {citationRef.title}
                                    </a>
                                  ) : citationRef.note ? (
                                    <span className="italic text-sm">{citationRef.note}</span>
                                  ) : (
                                    <span className="text-sm">{citationRef.title}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="text-sm text-gray-500 italic">
                            <strong>Source:</strong> Citation {item.citation}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ));
              }
              
              return (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No detailed analysis available for this category.</p>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    );
  }

  // Show fallback SWOT details for non-Ashburn locations
  if (selectedSwotCategory && enhancedLocation.swot) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl capitalize text-gray-900">
              {selectedSwotCategory} Analysis
            </h3>
            <button 
              onClick={onSwotCategoryClose}
              className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Close SWOT details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-base text-gray-600 mt-2">
            Strategic insights for this location
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {enhancedLocation.swot[selectedSwotCategory].map((item: string, index: number) => (
              <div key={index} className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-sm text-gray-900 flex-1 pr-3">
                    {selectedSwotCategory.slice(0, -1)} #{index + 1}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                    selectedSwotCategory === 'strengths' ? 'bg-green-100 text-green-700' :
                    selectedSwotCategory === 'weaknesses' ? 'bg-red-100 text-red-700' :
                    selectedSwotCategory === 'opportunities' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    #{index + 1}
                  </span>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default: show the map
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <DynamicMap location={location} />
      </div>
    </div>
  )
}
