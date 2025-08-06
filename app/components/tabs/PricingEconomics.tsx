"use client"

import { useState } from "react"
import type { Location } from "../../data/locations"

interface PricingEconomicsProps {
  location: Location
}

export default function PricingEconomics({ location }: PricingEconomicsProps) {
  const enhancedLocation = location as any
  const [selectedPricingItem, setSelectedPricingItem] = useState<{type: 'membershipTier' | 'unitEconomic', index?: number, key?: string} | null>(null)

  return (
    <div className="space-y-6 text-xl pb-8">
      <div>
        <h3 className="font-semibold mb-3">Pricing & Unit Economics</h3>
        
        {/* Membership Tiers */}
        {(enhancedLocation as any)?._detailedData?.pricing?.membershipTiers ? (
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-800">Membership Tiers</h4>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Program</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Duration</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(enhancedLocation as any)._detailedData.pricing.membershipTiers.map((item: any, index: number) => (
                    <tr 
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedPricingItem({type: 'membershipTier', index})}
                    >
                      <td className="px-4 py-2 text-sm font-medium">{item.program}</td>
                      <td className="px-4 py-2 text-sm font-semibold text-green-600">{item.price}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{item.duration}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{item.brief}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : enhancedLocation.pricing && (
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-800">Pricing</h4>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Program</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enhancedLocation.pricing.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm">{item.program}</td>
                      <td className="px-4 py-2 text-sm font-medium">${item.price}</td>
                      <td className="px-4 py-2 text-sm">{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Unit Economics */}
        {(enhancedLocation as any)?._detailedData?.pricing?.unitEconomics && (
          <div>
            <h4 className="font-medium mb-3 text-gray-800">Unit Economics</h4>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries((enhancedLocation as any)._detailedData.pricing.unitEconomics).map(([key, metric]: [string, any]) => (
                <div 
                  key={key}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-all"
                  onClick={() => setSelectedPricingItem({type: 'unitEconomic', key})}
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm font-medium text-gray-700 mb-2">{key.toUpperCase()}</div>
                  <div className="text-xs text-gray-600">{metric.brief}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Pricing Analysis */}
      {selectedPricingItem && (enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA" && (enhancedLocation as any)?._detailedData && (
        <div className="mt-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-gray-900">
                {selectedPricingItem.type === 'membershipTier' 
                  ? `${(enhancedLocation as any)._detailedData.pricing.membershipTiers[selectedPricingItem.index!].program} Analysis`
                  : `${selectedPricingItem.key!.toUpperCase()} Breakdown`
                }
              </h3>
              <button 
                onClick={() => setSelectedPricingItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {selectedPricingItem.type === 'membershipTier' 
                ? 'Detailed pricing methodology and rationale'
                : 'Unit economics calculation and assumptions'
              }
            </p>
          </div>
          
          <div className="space-y-6">
            {(() => {
              if (selectedPricingItem.type === 'membershipTier') {
                const tier = (enhancedLocation as any)._detailedData.pricing.membershipTiers[selectedPricingItem.index!];
                const detail = tier.detail;
                
                return (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-base text-gray-900 mb-3">Summary</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{detail.summary}</p>
                    </div>

                    {/* Pricing Math */}
                    {detail.pricingMath && (
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-base text-gray-900 mb-3">Pricing Breakdown</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {Object.entries(detail.pricingMath).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                              <span className="ml-2 font-medium text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Market Benchmarks */}
                    {detail.marketBenchmarks && detail.marketBenchmarks.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-base text-gray-900 mb-3">Market Benchmarks</h4>
                        <div className="space-y-3">
                          {detail.marketBenchmarks.map((benchmark: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-medium text-sm text-gray-900">{benchmark.competitor}</div>
                                <div className="text-xs text-gray-600">{benchmark.note}</div>
                              </div>
                              <div className="font-semibold text-sm text-green-600">{benchmark.price}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Assumptions */}
                    {detail.assumptions && detail.assumptions.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-base text-gray-900 mb-3">Key Assumptions</h4>
                        <ul className="space-y-2">
                          {detail.assumptions.map((assumption: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              <span>{assumption}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              } else if (selectedPricingItem.type === 'unitEconomic') {
                const metric = (enhancedLocation as any)._detailedData.pricing.unitEconomics[selectedPricingItem.key!];
                const detail = metric.detail;
                
                return (
                  <div className="space-y-6">
                    {/* Value & Summary */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-base text-gray-900">Value</h4>
                        <div className="text-2xl font-bold text-green-600">{metric.value}</div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{detail.summary}</p>
                    </div>

                    {/* Formula */}
                    {detail.formula && (
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-base text-gray-900 mb-3">Calculation</h4>
                        <div className="bg-gray-50 rounded p-3 font-mono text-sm text-gray-800">{detail.formula}</div>
                      </div>
                    )}

                    {/* Assumptions */}
                    {detail.assumptions && detail.assumptions.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-base text-gray-900 mb-3">Assumptions</h4>
                        <ul className="space-y-2">
                          {detail.assumptions.map((assumption: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              <span>{assumption}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }
            })()}
          </div>
        </div>
      )}
    </div>
  )
}