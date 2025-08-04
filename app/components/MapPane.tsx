"use client"

import dynamic from "next/dynamic"
import type { Location } from "../data/locations"

interface MapPaneProps {
  location: Location
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

export default function MapPane({ location }: MapPaneProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <DynamicMap location={location} />
      </div>
    </div>
  )
}
