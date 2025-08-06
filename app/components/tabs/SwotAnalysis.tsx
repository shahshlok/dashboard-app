"use client"

import { useState } from "react"
import type { Location } from "../../data/locations"

interface SwotAnalysisProps {
  location: Location
}

export default function SwotAnalysis({ location }: SwotAnalysisProps) {
  const enhancedLocation = location as any
  const [selectedSwotCategory, setSelectedSwotCategory] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats' | null>(null)

  return (
    <div className="space-y-6 text-xl pb-8">
      <div>
        <h3 className="font-semibold mb-3">SWOT Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div 
            className="bg-green-50 border border-green-200 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:shadow-green-200/50 hover:-translate-y-1 hover:scale-[1.02] hover:bg-green-100 hover:border-green-300"
            onClick={() => setSelectedSwotCategory(selectedSwotCategory === 'strengths' ? null : 'strengths')}
          >
            <h4 className="font-medium text-green-800 mb-2">
              Strengths
            </h4>
            <ul className="text-sm text-green-700 space-y-1">
              {enhancedLocation.swot.strengths.map((item: string, index: number) => (
                <li key={index}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div 
            className="bg-red-50 border border-red-200 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:shadow-red-200/50 hover:-translate-y-1 hover:scale-[1.02] hover:bg-red-100 hover:border-red-300"
            onClick={() => setSelectedSwotCategory(selectedSwotCategory === 'weaknesses' ? null : 'weaknesses')}
          >
            <h4 className="font-medium text-red-800 mb-2">
              Weaknesses
            </h4>
            <ul className="text-sm text-red-700 space-y-1">
              {enhancedLocation.swot.weaknesses.map((item: string, index: number) => (
                <li key={index}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div 
            className="bg-blue-50 border border-blue-200 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-200/50 hover:-translate-y-1 hover:scale-[1.02] hover:bg-blue-100 hover:border-blue-300"
            onClick={() => setSelectedSwotCategory(selectedSwotCategory === 'opportunities' ? null : 'opportunities')}
          >
            <h4 className="font-medium text-blue-800 mb-2">
              Opportunities
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              {enhancedLocation.swot.opportunities.map((item: string, index: number) => (
                <li key={index}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div 
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:shadow-yellow-200/50 hover:-translate-y-1 hover:scale-[1.02] hover:bg-yellow-100 hover:border-yellow-300"
            onClick={() => setSelectedSwotCategory(selectedSwotCategory === 'threats' ? null : 'threats')}
          >
            <h4 className="font-medium text-yellow-800 mb-2">
              Threats
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {enhancedLocation.swot.threats.map((item: string, index: number) => (
                <li key={index}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed SWOT Analysis for selected category */}
      {selectedSwotCategory && (enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA" && (enhancedLocation as any)?._detailedData && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3 capitalize text-gray-900">
            {selectedSwotCategory} - Detailed Analysis
          </h4>
          <div className="space-y-4">
            {(() => {
              const detailedData = (enhancedLocation as any)._detailedData;
              const swotCategoryData = detailedData?.swotAnalysis?.[selectedSwotCategory];
              
              if (swotCategoryData && Array.isArray(swotCategoryData)) {
                return swotCategoryData.map((item: any, index: number) => (
                  <div key={index} className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-base text-gray-900 flex-1 pr-4">
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
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    {item.citation && (() => {
                      const detailedData = (enhancedLocation as any)._detailedData;
                      const citationRef = detailedData?.citationReferences?.[item.citation.toString()];
                      
                      if (citationRef) {
                        return (
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <div className="text-xs text-gray-500">
                              <div className="flex items-start gap-2">
                                <span className="font-medium">Source:</span>
                                <div className="flex-1">
                                  <div className="mb-1">{citationRef.source}</div>
                                  {citationRef.url ? (
                                    <a 
                                      href={citationRef.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 underline break-all"
                                    >
                                      {citationRef.title}
                                    </a>
                                  ) : citationRef.note ? (
                                    <span className="italic">{citationRef.note}</span>
                                  ) : (
                                    <span>{citationRef.title}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500 italic">
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
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No detailed analysis available for this category.</p>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  )
}