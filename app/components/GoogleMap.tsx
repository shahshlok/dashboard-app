"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import type { Location } from "../data/locations"

interface GoogleMapProps {
  location: Location
}

export default function GoogleMap({ location }: GoogleMapProps) {
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

        // Create the main location marker
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat: location.coordinates[0], lng: location.coordinates[1] },
          title: location.name
        })

        // Add click listener for main Ashburn location
        if (location.name === "Ashburn VA") {
          marker.addListener("click", () => {
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; font-family: Arial, sans-serif;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">Ashburn Location</h3>
                  <p style="margin: 0; color: #666;">Planned opening: October 2025</p>
                </div>
              `
            })
            infoWindow.open(map, marker)
          })
        }

        // Add competitor markers for Ashburn location
        if (location.name === "Ashburn VA" && location.competitors) {
          location.competitors.forEach((competitor) => {
            // Create custom red marker with white center
            const markerElement = document.createElement('div')
            markerElement.innerHTML = `
              <div style="
                width: 24px; 
                height: 24px; 
                background-color: #dc2626; 
                border: 2px solid white; 
                border-radius: 50%; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 8px;
                  height: 8px;
                  background-color: white;
                  border-radius: 50%;
                "></div>
              </div>
            `
            
            const competitorMarker = new AdvancedMarkerElement({
              map: map,
              position: { lat: competitor.coordinates[0], lng: competitor.coordinates[1] },
              title: `${competitor.name} - $${competitor.price}/mo`,
              content: markerElement
            })

            // Add click listener to show info about competitor
            competitorMarker.addListener("click", () => {
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="padding: 8px; font-family: Arial, sans-serif;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${competitor.name}</h3>
                    <p style="margin: 0 0 4px 0; color: #666;">Distance: ${competitor.distance} miles</p>
                    <p style="margin: 0; color: #059669; font-weight: bold;">$${competitor.price}/month</p>
                  </div>
                `
              })
              infoWindow.open(map, competitorMarker)
            })
          })
        }

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