"use client"

import { useState, useMemo } from "react"
import { locations, type Location } from "../data/locations"
import TileCard from "./TileCard"
import LocationModal from "./LocationModal"

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [stateFilter, setStateFilter] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter locations based on current filters
  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesStatus = statusFilter === "All" || location.status === statusFilter
      const matchesState = stateFilter === "All" || location.state === stateFilter
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesStatus && matchesState && matchesSearch
    })
  }, [statusFilter, stateFilter, searchQuery])

  // Calculate KPIs
  const kpis = useMemo(() => {
    const openSites = locations.filter((l) => l.status === "Active").length
    const plannedSites = locations.filter((l) => l.status === "Planned").length
    const totalChildren = locations.reduce((sum, l) => sum + l.students, 0)
    const totalArea = locations.length * 5000 // Assuming 5000 sq ft per location

    return {
      openSites,
      plannedSites,
      totalChildren,
      totalArea,
    }
  }, [])

  const handleCardClick = (location: Location) => {
    setSelectedLocation(location)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLocation(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Title & Filters */}
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h1>
              
              <div className="flex items-center space-x-4">
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border-0 bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
                <div>
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="border-0 bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    <option value="All">All States</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Virginia">Virginia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-sm mx-8">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-0 bg-gray-50 rounded-lg px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            {/* Right: KPI Metrics */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{kpis.openSites}</div>
                <div className="text-xs text-gray-500">Open Sites</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{kpis.plannedSites}</div>
                <div className="text-xs text-gray-500">Planned</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{kpis.totalChildren}</div>
                <div className="text-xs text-gray-500">Students</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{Math.round(kpis.totalArea/1000)}K</div>
                <div className="text-xs text-gray-500">sq ft</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-8" style={{ width: "fit-content" }}>
          {filteredLocations.map((location) => (
            <div key={location.id} style={{ width: "360px" }}>
              <TileCard location={location} onClick={() => handleCardClick(location)} />
            </div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No locations match your current filters.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <LocationModal location={selectedLocation} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
