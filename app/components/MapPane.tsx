"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import type { Location } from "../data/locations"

interface MapPaneProps {
  location: Location
}

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
})

export default function MapPane({ location }: MapPaneProps) {
  const [showHeatLayer, setShowHeatLayer] = useState(false)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Map View</span>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showHeatLayer}
              onChange={(e) => setShowHeatLayer(e.target.checked)}
              className="rounded"
            />
            <span className="text-xs">Show children-density heat layer</span>
          </label>
        </div>
      </div>

      <div className="flex-1">
        <DynamicMap location={location} showHeatLayer={showHeatLayer} />
      </div>
    </div>
  )
}
