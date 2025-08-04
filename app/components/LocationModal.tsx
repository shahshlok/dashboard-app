"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import type { Location } from "../data/locations"
import MapPane from "./MapPane"

interface LocationModalProps {
  location: Location | null
  isOpen: boolean
  onClose: () => void
}

export default function LocationModal({ location, isOpen, onClose }: LocationModalProps) {
  if (!location) return null

  const capacityPercentage =
    location.status === "Active" ? Math.round((location.students / location.targetStudents) * 100) : 0

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto text-xl">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[90vw] h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="flex h-full">
                  {/* Left Panel - 70% */}
                  <div className="w-[70%] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                      <Dialog.Title className="text-xl font-semibold">
                        {location.name} - {location.status}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
                        type="button"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xl">
                      <div>
                        {location.executive_summary && (
                          <div> 
                            <h4 className="font-semibold mb-3">Market Overview</h4>
                            <div className="grid grid-cols-2 gap-4 text-base">
                              {location.executive_summary.market_opportunity && (
                                <div>
                                  <span className="text-gray-600">Children in Trade Area:</span>
                                  <span className="ml-2 font-medium">{location.executive_summary.market_opportunity.children_in_trade_area.toLocaleString()}</span>
                                </div>
                              )}
                              {location.executive_summary.demographics?.median_household_income && (
                                <div>
                                  <span className="text-gray-600">Median Income:</span>
                                  <span className="ml-2 font-medium">{location.executive_summary.demographics.median_household_income}</span>
                                </div>
                              )}
                              {location.executive_summary.pricing_strategy?.membership_range && (
                                <div>
                                  <span className="text-gray-600">Pricing Range:</span>
                                  <span className="ml-2 font-medium">{location.executive_summary.pricing_strategy.membership_range}</span>
                                </div>
                              )}
                              {location.executive_summary.location_advantages?.traffic_count && (
                                <div>
                                  <span className="text-gray-600">Daily Traffic:</span>
                                  <span className="ml-2 font-medium">{location.executive_summary.location_advantages.traffic_count}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Market Demographics */}
                      {location.market_demographics && (
                        <div>
                          <h3 className="font-semibold mb-3">Market Demographics</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {location.market_demographics.population_data && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <h4 className="font-medium text-blue-800 mb-2">Population Data</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                  {location.market_demographics.population_data["5_mile_radius"] && (
                                    <div>5-mile radius: {location.market_demographics.population_data["5_mile_radius"].toLocaleString()}</div>
                                  )}
                                  {location.market_demographics.population_data["7_mile_children_0_14"] && (
                                    <div>Children 0-14: {location.market_demographics.population_data["7_mile_children_0_14"].toLocaleString()}</div>
                                  )}
                                  {location.market_demographics.population_data.population_percentage && (
                                    <div>Child percentage: {location.market_demographics.population_data.population_percentage}</div>
                                  )}
                                </div>
                              </div>
                            )}
                            {location.market_demographics.income_spending && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                <h4 className="font-medium text-green-800 mb-2">Income & Spending</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                  {location.market_demographics.income_spending.ashburn_median_income && (
                                    <div>Median Income: {location.market_demographics.income_spending.ashburn_median_income}</div>
                                  )}
                                  {location.market_demographics.income_spending.recreation_spending && (
                                    <div>Recreation Spending: {location.market_demographics.income_spending.recreation_spending}</div>
                                  )}
                                  {location.market_demographics.income_spending.poverty_rate && (
                                    <div>Poverty Rate: {location.market_demographics.income_spending.poverty_rate}</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Real Estate */}
                      {location.real_estate_evaluation && (
                        <div>
                          <h3 className="font-semibold mb-3">Real Estate</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {location.real_estate_evaluation.location_details && (
                              <div className="bg-gray-50 rounded-lg p-3">
                                <h4 className="font-medium mb-2">Location Details</h4>
                                <div className="text-sm space-y-1">
                                  {location.real_estate_evaluation.location_details.address && (
                                    <div><span className="text-gray-600">Address:</span> {location.real_estate_evaluation.location_details.address}</div>
                                  )}
                                  {location.real_estate_evaluation.location_details.square_footage && (
                                    <div><span className="text-gray-600">Size:</span> {location.real_estate_evaluation.location_details.square_footage.toLocaleString()} sq ft</div>
                                  )}
                                  {location.real_estate_evaluation.location_details.previous_tenant && (
                                    <div><span className="text-gray-600">Previous:</span> {location.real_estate_evaluation.location_details.previous_tenant}</div>
                                  )}
                                </div>
                              </div>
                            )}
                            {location.real_estate_evaluation.lease_terms && (
                              <div className="bg-gray-50 rounded-lg p-3">
                                <h4 className="font-medium mb-2">Lease Terms</h4>
                                <div className="text-sm space-y-1">
                                  {location.real_estate_evaluation.lease_terms.base_rent && 
                                    <div><span className="text-gray-600">Base Rent:</span> {location.real_estate_evaluation.lease_terms.base_rent}</div>
                                  }
                                  {location.real_estate_evaluation.lease_terms.escalator && 
                                    <div><span className="text-gray-600">Escalator:</span> {location.real_estate_evaluation.lease_terms.escalator}</div>
                                  }
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* SWOT Analysis */}
                      <div>
                        <h3 className="font-semibold mb-3">SWOT Analysis</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              {location.swot.strengths.map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <h4 className="font-medium text-red-800 mb-2">Weaknesses</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              {location.swot.weaknesses.map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h4 className="font-medium text-blue-800 mb-2">Opportunities</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              {location.swot.opportunities.map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <h4 className="font-medium text-yellow-800 mb-2">Threats</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              {location.swot.threats.map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Pricing Table */}
                      <div>
                        <h3 className="font-semibold mb-3">Pricing</h3>
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
                              {location.pricing.map((item, index) => (
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

                      {/* Detailed Competitor Analysis */}
                      {location.competitor_analysis?.direct_competitors ? (
                        <div>
                          <h3 className="font-semibold mb-3">Detailed Competitor Analysis</h3>
                          <div className="space-y-4">
                            {location.competitor_analysis.direct_competitors.map((competitor, index) => (
                              <div key={index} className="border rounded-lg p-4 bg-white">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <div className="font-medium text-lg">{competitor.name}</div>
                                    <div className="text-sm text-gray-600">{competitor.location} • {competitor.distance}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-green-600">{competitor.pricing.split(';')[0]}</div>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-700 mb-2">
                                  <strong>Focus:</strong> {competitor.focus}
                                </div>
                                <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                                  <strong>Strengths:</strong> {competitor.strengths}
                                </div>
                              </div>
                            ))}
                            {location.competitor_analysis.market_insights && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <h4 className="font-medium text-blue-800 mb-2">Market Insights</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                  <div><strong>Pricing Range:</strong> {location.competitor_analysis.market_insights.pricing_range}</div>
                                  <div><strong>Market Gap:</strong> {location.competitor_analysis.market_insights.market_gap}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold mb-3">Competitors</h3>
                          <div className="space-y-2">
                            {location.competitors.map((competitor, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <div className="font-medium">{competitor.name}</div>
                                  <div className="text-sm text-gray-600">{competitor.distance} miles away</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">${competitor.price}/mo</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actionable Recommendations */}
                      {location.actionable_recommendations ? (
                        <div>
                          <h3 className="font-semibold mb-3">Actionable Recommendations</h3>
                          <div className="space-y-4">
                            {location.actionable_recommendations
                              .sort((a, b) => a.priority - b.priority)
                              .map((rec, index) => (
                                <div key={index} className="border rounded-lg p-4 bg-white">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                          rec.priority === 1 ? 'bg-red-100 text-red-800' :
                                          rec.priority === 2 ? 'bg-orange-100 text-orange-800' :
                                          rec.priority === 3 ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          Priority {rec.priority}
                                        </span>
                                        <span className="font-medium">{rec.action}</span>
                                      </div>
                                      <div className="text-sm text-gray-700 mb-2">{rec.description}</div>
                                      <div className="text-xs text-gray-600 mb-2">
                                        <strong>Owner:</strong> {rec.owner} • <strong>Timeline:</strong> {rec.timeline}
                                      </div>
                                      <div className="text-xs">
                                        <strong>KPIs:</strong>
                                        <ul className="mt-1 space-y-1">
                                          {rec.kpis.map((kpi, kpiIndex) => (
                                            <li key={kpiIndex} className="text-gray-600">• {kpi}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold mb-3">Action Plan Timeline</h3>
                          <div className="space-y-3">
                            {location.actionPlan.map((action, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex-1">
                                  <div className="font-medium">{action.task}</div>
                                  <div className="text-sm text-gray-600">Owner: {action.owner}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">{action.weeks} weeks</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Panel - 30% */}
                  <div className="w-[30%] border-l">
                    <MapPane location={location} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
