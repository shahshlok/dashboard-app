"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import type { Location } from "../data/locations"

interface GoogleMapProps {
  location: Location
  showHeatLayer: boolean
}

export default function GoogleMap({ location, showHeatLayer }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeMap = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        setError("Google Maps API key is not configured")
        setIsLoading(false)
        return
      }

      if (!mapRef.current) {
        setError("Map container not found")
        setIsLoading(false)
        return
      }

      try {
        // Initialize the loader
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
          libraries: ["maps", "marker"]
        })

        // Load the Maps library
        await loader.load()
        
        // Import the Maps library
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary

        // Create the map
        const map = new Map(mapRef.current, {
          center: { lat: location.coordinates[0], lng: location.coordinates[1] },
          zoom: 14,
          mapId: "DEMO_MAP_ID"
        })

        // Create the marker
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat: location.coordinates[0], lng: location.coordinates[1] },
          title: location.name
        })

        // Store references
        mapInstanceRef.current = map
        markerRef.current = marker

        setIsLoading(false)
        setError(null)

      } catch (err) {
        console.error("Error loading Google Maps:", err)
        setError("Failed to load Google Maps")
        setIsLoading(false)
      }
    }

    initializeMap()

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null
        markerRef.current = null
      }
      mapInstanceRef.current = null
    }
  }, [location])

  // Update marker position when location changes
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && !isLoading) {
      const newCenter = { lat: location.coordinates[0], lng: location.coordinates[1] }
      
      // Update map center
      mapInstanceRef.current.setCenter(newCenter)
      
      // Update marker position
      markerRef.current.position = newCenter
    }
  }, [location, isLoading])

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-red-50">
        <div className="text-red-500 text-center">
          <div className="font-medium">Error loading map</div>
          <div className="text-sm mt-1">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <div 
        ref={mapRef} 
        style={{ height: "100%", width: "100%" }}
        className="google-map-container"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-500">Loading Google Map...</div>
        </div>
      )}
    </div>
  )
}