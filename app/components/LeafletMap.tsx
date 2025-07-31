"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import type { Location } from "../data/locations"
import "leaflet/dist/leaflet.css"

interface LeafletMapProps {
  location: Location
  showHeatLayer: boolean
}

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Custom icons
const gymIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMxMGI5ODEiLz4KPHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI1IiB5PSI1Ij4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const competitorIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iIzZiNzI4MCIvPgo8L3N2Zz4=",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

export default function LeafletMap({ location, showHeatLayer }: LeafletMapProps) {
  return (
    <MapContainer
      center={location.coordinates}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Main location marker */}
      <Marker position={location.coordinates} icon={gymIcon}>
        <Popup>
          <div className="text-center">
            <h3 className="font-semibold">{location.name}</h3>
            <p className="text-sm text-gray-600">{location.status}</p>
          </div>
        </Popup>
      </Marker>

      {/* Competitor markers */}
      {location.competitors.map((competitor, index) => (
        <Marker key={index} position={competitor.coordinates} icon={competitorIcon}>
          <Popup>
            <div className="text-center">
              <h4 className="font-medium">{competitor.name}</h4>
              <p className="text-xs text-gray-600">
                {competitor.distance} mi • ${competitor.price}/mo
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
