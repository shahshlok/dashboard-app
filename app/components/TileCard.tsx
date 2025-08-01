"use client"

import { useState } from "react"
import type { Location } from "../data/locations"

interface TileCardProps {
  location: Location
  onClick: () => void
}

export default function TileCard({ location, onClick }: TileCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isActive = location.status === "Active"
  const displayNumber = isActive ? location.students : location.targetStudents
  const numberLabel = isActive ? "Students" : "Target Students"

  // Generate SVG sparkline
  const sparklinePoints = location.sparklineData
    .map((value, index) => {
      const x = (index / (location.sparklineData.length - 1)) * 80
      const maxValue = Math.max(...location.sparklineData)
      const y = 24 - (value / maxValue) * 24
      return `${x},${y}`
    })
    .join(" ")

  // Extract key metrics from strategy data
  const getKeyMetrics = () => {
    if (location.executive_summary) {
      return {
        childrenInArea: location.executive_summary.market_opportunity?.children_in_trade_area?.toLocaleString() || 'N/A',
        tradeRadius: location.executive_summary.market_opportunity?.trade_area_radius || 'N/A',
        medianIncome: location.executive_summary.demographics?.median_household_income || 'N/A',
        ltv: location.executive_summary.pricing_strategy?.lifetime_value || `$${location.ltv}`,
        trafficCount: location.executive_summary.location_advantages?.traffic_count || 'N/A'
      }
    }
    return {
      childrenInArea: 'N/A',
      tradeRadius: 'N/A', 
      medianIncome: 'N/A',
      ltv: `$${location.ltv}`,
      trafficCount: 'N/A'
    }
  }

  const metrics = getKeyMetrics()

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-xl shadow-sm border cursor-pointer transition-all duration-300 overflow-hidden ${
        isHovered ? "shadow-xl -translate-y-1 border-gray-300" : "hover:shadow-md"
      }`}
    >
      {/* Header ribbon with gradient */}
      <div className={`h-3 rounded-t-xl bg-gradient-to-r ${
        isActive 
          ? "from-emerald-500 to-emerald-600" 
          : "from-slate-400 to-slate-500"
      }`} />

      <div className="p-5">
        {/* Location name and status */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{location.name}</h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isActive ? "bg-emerald-500" : "bg-slate-400"
            }`} />
            <span className={`text-xs font-medium ${
              isActive ? "text-emerald-700" : "text-slate-600"
            }`}>
              {location.status}
            </span>
          </div>
        </div>

        {/* Primary metric with context */}
        <div className="mb-5">
          <div className="flex items-baseline gap-2 mb-1">
            <div className="text-3xl font-bold text-gray-900">{displayNumber.toLocaleString()}</div>
            {isActive && location.targetStudents && (
              <div className="text-sm text-gray-500">/ {location.targetStudents.toLocaleString()}</div>
            )}
          </div>
          <div className="text-sm font-medium text-gray-600">{numberLabel}</div>
          {/* Progress bar for active locations */}
          {isActive && location.targetStudents && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((location.students / location.targetStudents) * 100, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Enhanced sparkline with area fill */}
        <div className="mb-5">
          <div className="text-xs text-gray-500 mb-2">Growth Trend</div>
          <svg width="100%" height="28" className="w-full">
            <defs>
              <linearGradient id={`gradient-${location.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isActive ? "#10b981" : "#6b7280"} stopOpacity="0.3" />
                <stop offset="100%" stopColor={isActive ? "#10b981" : "#6b7280"} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,28 ${sparklinePoints} 80,28`}
              fill={`url(#gradient-${location.id})`}
            />
            <polyline
              points={sparklinePoints}
              fill="none"
              stroke={isActive ? "#10b981" : "#6b7280"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Base KPIs - always visible */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-600 text-xs font-medium">CAC</div>
            <div className="font-bold text-gray-900">${location.cac}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-600 text-xs font-medium">LTV</div>
            <div className="font-bold text-gray-900">{metrics.ltv}</div>
          </div>
        </div>
      </div>

      {/* Expanded section on hover */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isHovered ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="border-t border-gray-100 p-5 bg-gray-50">
          <div className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Market Insights</div>
          
          <div className="grid grid-cols-1 gap-3 text-sm">
            {/* Market size */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Children in Trade Area</span>
              <span className="font-semibold text-gray-900">{metrics.childrenInArea}</span>
            </div>
            
            {/* Trade radius */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trade Area Radius</span>
              <span className="font-semibold text-gray-900">{metrics.tradeRadius}</span>
            </div>
            
            {/* Income */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Median HH Income</span>
              <span className="font-semibold text-gray-900">{metrics.medianIncome}</span>
            </div>
            
            {/* Lease rate */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lease Rate</span>
              <span className="font-semibold text-gray-900">${location.leasePerSqFt}/sq ft</span>
            </div>
            
            {/* Traffic count */}
            {metrics.trafficCount !== 'N/A' && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Traffic</span>
                <span className="font-semibold text-gray-900">{metrics.trafficCount}</span>
              </div>
            )}
          </div>
          
          {/* Action indicator */}
          <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
            <span>Click for detailed analysis</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}