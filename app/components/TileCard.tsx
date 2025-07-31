"use client"

import type { Location } from "../data/locations"

interface TileCardProps {
  location: Location
  onClick: () => void
}

export default function TileCard({ location, onClick }: TileCardProps) {
  const isActive = location.status === "Active"
  const displayNumber = isActive ? location.students : location.targetStudents
  const numberLabel = isActive ? "Students" : "Target Students"

  // Generate SVG sparkline
  const sparklinePoints = location.sparklineData
    .map((value, index) => {
      const x = (index / (location.sparklineData.length - 1)) * 60
      const maxValue = Math.max(...location.sparklineData)
      const y = 20 - (value / maxValue) * 20
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Header ribbon */}
      <div className={`h-2 rounded-t-lg ${isActive ? "bg-emerald-500" : "bg-zinc-300"}`} />

      <div className="p-4">
        {/* Location name and status */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{location.name}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-800"
            }`}
          >
            {location.status}
          </span>
        </div>

        {/* Big number */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900">{displayNumber}</div>
          <div className="text-sm text-gray-600">{numberLabel}</div>
        </div>

        {/* Sparkline */}
        <div className="mb-4">
          <svg width="60" height="20" className="text-gray-400">
            <polyline
              points={sparklinePoints}
              fill="none"
              stroke={isActive ? "#10b981" : "#6b7280"}
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Micro KPIs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-600">CAC</div>
            <div className="font-semibold">${location.cac}</div>
          </div>
          <div>
            <div className="text-gray-600">Lease $/sq ft</div>
            <div className="font-semibold">${location.leasePerSqFt}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
