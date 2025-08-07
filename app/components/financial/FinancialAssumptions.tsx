"use client"

import React, { useState } from 'react'
import { 
  getDetailedAssumptions, 
  getAssumptionCategories,
  getScenarioContext,
  getModelValidation,
  type AssumptionDetail 
} from '../../utils/financialAssumptions'

interface FinancialAssumptionsProps {
  scenario?: 'base' | 'conservative' | 'aggressive'
  className?: string
}

export default function FinancialAssumptions({ 
  scenario = 'base', 
  className = '' 
}: FinancialAssumptionsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('enrollment')
  const [selectedAssumption, setSelectedAssumption] = useState<AssumptionDetail | null>(null)

  const categories = getAssumptionCategories()
  const scenarioContext = getScenarioContext(scenario)
  const validation = getModelValidation()

  const categoryLabels = {
    enrollment: 'Enrollment & Growth',
    pricing: 'Pricing & Revenue',
    costs: 'Cost Structure',
    seasonality: 'Seasonal Adjustments',
    capex: 'Capital Investment',
    validation: 'Model Validation'
  }

  const categoryColors = {
    enrollment: 'bg-blue-50 border-blue-200 text-blue-800',
    pricing: 'bg-green-50 border-green-200 text-green-800',
    costs: 'bg-red-50 border-red-200 text-red-800',
    seasonality: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    capex: 'bg-purple-50 border-purple-200 text-purple-800',
    validation: 'bg-gray-50 border-gray-200 text-gray-800'
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Financial Model Assumptions
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Detailed rationale behind all cashflow projections and calculations
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {scenarioContext.name}
            </div>
            <div className="text-xs text-gray-500">
              {scenarioContext.confidence}
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Context */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Scenario Description</h4>
            <p className="text-sm text-gray-700">{scenarioContext.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Key Metrics</h4>
            <div className="space-y-1">
              <div className="text-sm text-gray-700">Breakeven: {scenarioContext.breakeven}</div>
              <div className="text-sm text-gray-700">Confidence: {scenarioContext.confidence}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Category Navigation */}
        <div className="w-64 border-r border-gray-200">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
            <nav className="space-y-2">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const count = categories[key as keyof typeof categories]?.length || 0
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeCategory === key
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>{label}</span>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Assumptions List */}
        <div className="flex-1">
          <div className="p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {categoryLabels[activeCategory as keyof typeof categoryLabels]}
            </h4>
            
            <div className="space-y-3">
              {categories[activeCategory as keyof typeof categories]?.map((assumption, index) => (
                <div
                  key={assumption.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedAssumption?.id === assumption.id
                      ? 'ring-2 ring-blue-500 border-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAssumption(
                    selectedAssumption?.id === assumption.id ? null : assumption
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="text-base font-medium text-gray-900">
                          {assumption.title}
                        </h5>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                          categoryColors[activeCategory as keyof typeof categoryColors]
                        }`}>
                          {assumption.id}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {assumption.description}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-semibold text-gray-900">
                        {typeof assumption.value === 'number' 
                          ? assumption.value.toLocaleString() 
                          : assumption.value}
                      </div>
                      {assumption.unit && (
                        <div className="text-xs text-gray-500">
                          {assumption.unit}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedAssumption?.id === assumption.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="space-y-3">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900">Rationale</h6>
                          <p className="text-sm text-gray-700 mt-1">
                            {assumption.rationale}
                          </p>
                        </div>
                        
                        {assumption.source && (
                          <div>
                            <h6 className="text-sm font-medium text-gray-900">Source</h6>
                            <a 
                              href={assumption.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 underline mt-1 inline-block"
                            >
                              {assumption.source}
                            </a>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Category: {assumption.category}</span>
                          <span>ID: {assumption.id}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Model Validation Footer */}
      {validation && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Model Validation</h4>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-700">{validation.summary}</p>
              {validation.clarksburgBackcast && (
                <div className="mt-2">
                  <span className="font-medium">Clarksburg Accuracy:</span>{' '}
                  <span className="text-green-600">{validation.clarksburgBackcast.accuracy}</span>
                </div>
              )}
            </div>
            <div className="text-gray-600">
              <p>{validation.conclusion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}