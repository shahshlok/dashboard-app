"use client"

import type { Location } from "../../data/locations"

interface ActionPlanProps {
  location: Location
}

export default function ActionPlan({ location }: ActionPlanProps) {
  const enhancedLocation = location as any

  return (
    <div className="space-y-8 text-2xl pb-8">
      {/* Actionable Recommendations */}
      {enhancedLocation.actionable_recommendations ? (
        <div>
          <h3 className="font-semibold mb-4 text-2xl">Actionable Recommendations</h3>
          <div className="space-y-6">
            {enhancedLocation.actionable_recommendations
              .sort((a: any, b: any) => a.priority - b.priority)
              .map((rec: any, index: number) => (
                <div key={index} className="border rounded-lg p-5 bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-3 py-1 rounded text-base font-medium ${
                          rec.priority === 1 ? 'bg-red-100 text-red-800' :
                          rec.priority === 2 ? 'bg-orange-100 text-orange-800' :
                          rec.priority === 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          Priority {rec.priority}
                        </span>
                        <span className="font-medium text-lg">{rec.action}</span>
                      </div>
                      <div className="text-base text-gray-700 mb-2">{rec.description}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Owner:</strong> {rec.owner} • <strong>Timeline:</strong> {rec.timeline}
                      </div>
                      <div className="text-sm">
                        <strong>KPIs:</strong>
                        <ul className="mt-1 space-y-1">
                          {rec.kpis.map((kpi: string, kpiIndex: number) => (
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
      ) : enhancedLocation.actionPlan && (
        <div>
          <h3 className="font-semibold mb-3">Action Plan Timeline</h3>
          <div className="space-y-3">
            {enhancedLocation.actionPlan.map((action: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-lg">{action.task}</div>
                  <div className="text-base text-gray-600">Owner: {action.owner}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-base">{action.weeks} weeks</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}