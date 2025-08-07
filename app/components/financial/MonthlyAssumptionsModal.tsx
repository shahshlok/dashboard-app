"use client"

import React from 'react'
import { X } from 'lucide-react'
import { type MonthlyAssumption } from '../../utils/financialAssumptions'

interface MonthlyAssumptionsModalProps {
  isOpen: boolean
  onClose: () => void
  monthData: MonthlyAssumption | null
  scenario: 'base' | 'conservative' | 'aggressive'
}

export default function MonthlyAssumptionsModal({
  isOpen,
  onClose,
  monthData,
  scenario
}: MonthlyAssumptionsModalProps) {
  if (!isOpen || !monthData) return null

  const scenarioLabels = {
    base: 'Base Case',
    conservative: 'Conservative Case',
    aggressive: 'Aggressive Case'
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {monthData.month} - Detailed Assumptions
              </h2>
              <p className="text-sm text-gray-600">
                {scenarioLabels[scenario]} • Complete financial model breakdown
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Enrollment Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Enrollment Assumptions
              </h3>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800">End of Month Enrollment</span>
                  <span className="text-2xl font-bold text-blue-900">
                    {monthData.enrollment.value} students
                  </span>
                </div>
                {monthData.enrollment.seasonalFactors && (
                  <div className="mt-2 text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded">
                    Seasonal Factor: {monthData.enrollment.seasonalFactors}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {monthData.enrollment.assumptions.map((assumption, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{assumption}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Revenue Assumptions
              </h3>
              
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">Monthly Revenue</span>
                  <span className="text-2xl font-bold text-green-900">
                    ${monthData.revenue.value.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 text-sm text-green-700">
                  Avg per student: ${Math.round(monthData.revenue.value / monthData.enrollment.value)}
                </div>
                {monthData.revenue.seasonalFactors && (
                  <div className="mt-2 text-sm text-green-700 bg-green-100 px-3 py-1 rounded">
                    Seasonal Factor: {monthData.revenue.seasonalFactors}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {monthData.revenue.assumptions.map((assumption, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{assumption}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Structure Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Cost Structure Breakdown
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Direct Costs */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-orange-800 mb-2">Direct Costs</div>
                  <div className="text-xl font-bold text-orange-900">
                    ${monthData.costs.direct.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-orange-700 mt-1">
                    {((monthData.costs.direct.value / monthData.revenue.value) * 100).toFixed(1)}% of revenue
                  </div>
                </div>

                {/* Fixed Costs */}
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-red-800 mb-2">Fixed Costs</div>
                  <div className="text-xl font-bold text-red-900">
                    ${monthData.costs.fixed.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-red-700 mt-1">
                    Rent, utilities, insurance
                  </div>
                </div>

                {/* Admin & OpEx */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-purple-800 mb-2">Admin & OpEx</div>
                  <div className="text-xl font-bold text-purple-900">
                    ${monthData.costs.admin.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-purple-700 mt-1">
                    Marketing, payroll, misc
                  </div>
                </div>
              </div>

              {/* Detailed Cost Assumptions */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-orange-800 mb-3">Direct Cost Details</h4>
                  <div className="space-y-2">
                    {monthData.costs.direct.assumptions.map((assumption, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{assumption}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-red-800 mb-3">Fixed Cost Details</h4>
                  <div className="space-y-2">
                    {monthData.costs.fixed.assumptions.map((assumption, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{assumption}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-purple-800 mb-3">Admin & OpEx Details</h4>
                  <div className="space-y-2">
                    {monthData.costs.admin.assumptions.map((assumption, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{assumption}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Financial Summary</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Revenue:</span>
                    <span className="font-semibold text-green-600">
                      ${monthData.revenue.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Costs:</span>
                    <span className="font-semibold text-red-600">
                      ${(monthData.costs.direct.value + monthData.costs.fixed.value + monthData.costs.admin.value).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">EBITDA:</span>
                      <span className={`font-bold ${
                        (monthData.revenue.value - monthData.costs.direct.value - monthData.costs.fixed.value - monthData.costs.admin.value) >= 0
                          ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${(monthData.revenue.value - monthData.costs.direct.value - monthData.costs.fixed.value - monthData.costs.admin.value).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue per Student:</span>
                    <span className="font-semibold">
                      ${Math.round(monthData.revenue.value / monthData.enrollment.value)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cost per Student:</span>
                    <span className="font-semibold">
                      ${Math.round((monthData.costs.direct.value + monthData.costs.fixed.value + monthData.costs.admin.value) / monthData.enrollment.value)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Profit per Student:</span>
                      <span className={`font-bold ${
                        (monthData.revenue.value - monthData.costs.direct.value - monthData.costs.fixed.value - monthData.costs.admin.value) / monthData.enrollment.value >= 0
                          ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${Math.round((monthData.revenue.value - monthData.costs.direct.value - monthData.costs.fixed.value - monthData.costs.admin.value) / monthData.enrollment.value)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}