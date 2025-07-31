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
      {/* TopBar */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Filters */}
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All</option>
                  <option value="Maryland">Maryland</option>
                  <option value="Virginia">Virginia</option>
                </select>
              </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-8">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Right: KPI Chips */}
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded-full text-sm font-medium">
                Open Sites: {kpis.openSites}
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                Planned Sites: {kpis.plannedSites}
              </div>
              <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                Total Children: {kpis.totalChildren}
              </div>
              <div className="bg-orange-100 text-orange-800 px-3 py-2 rounded-full text-sm font-medium">
                Total Area: {kpis.totalArea.toLocaleString()} sq ft
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-6" style={{ width: "fit-content" }}>
          {filteredLocations.map((location) => (
            <div key={location.id} style={{ width: "280px" }}>
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
