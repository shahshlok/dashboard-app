"use client"

import { useEffect, useRef } from "react"
import type { Location } from "../data/locations"

interface GoogleMapProps {
  location: Location
  showHeatLayer: boolean
}

export default function GoogleMap({ location, showHeatLayer }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const loadGoogleMaps = () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        console.error("Google Maps API key is not configured")
        return
      }

      // Check if Google Maps API is already loaded
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      
      const initializeMap = () => {
        if (!mapRef.current) return

        // Clear the map container and create Google Map
        mapRef.current.innerHTML = `
          <gmp-map 
            center="${location.coordinates[0]},${location.coordinates[1]}" 
            zoom="14" 
            map-id="DEMO_MAP_ID"
            style="height: 100%; width: 100%;"
          >
            <gmp-advanced-marker 
              position="${location.coordinates[0]},${location.coordinates[1]}" 
              title="${location.name}"
            ></gmp-advanced-marker>
          </gmp-map>
        `
      }

      if (existingScript || (window as any).google?.maps) {
        // API already loaded, just initialize the map
        initializeMap()
      } else {
        // Load the API for the first time
        const script = document.createElement('script')
        script.async = true
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap&libraries=maps,marker&v=beta`
        
        // Use a unique callback name to avoid conflicts
        ;(window as any).initGoogleMap = () => {
          initializeMap()
        }

        document.head.appendChild(script)
      }
    }

    loadGoogleMaps()

    // Cleanup function
    return () => {
      // Clean up callback when component unmounts
      if ((window as any).initGoogleMap) {
        delete (window as any).initGoogleMap
      }
    }
  }, [location])

  return (
    <div 
      ref={mapRef} 
      style={{ height: "100%", width: "100%" }}
      className="google-map-container"
    >
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading Google Map...</div>
      </div>
    </div>
  )
}