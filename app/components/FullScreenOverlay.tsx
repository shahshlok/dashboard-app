"use client"

import { Fragment, useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Location } from "../data/locations"
import { loadAshburnDetailedData, mergeAshburnData } from "../utils/locationData"
import MapPane from "./MapPane"
import Overview from "./tabs/Overview"
import PricingEconomics from "./tabs/PricingEconomics"
import Competition from "./tabs/Competition"
import ActionPlan from "./tabs/ActionPlan"
import { cn } from "@/lib/utils"

interface FullScreenOverlayProps {
  location: Location | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function FullScreenOverlay({ location, isOpen, onOpenChange }: FullScreenOverlayProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [enhancedLocation, setEnhancedLocation] = useState<Location | null>(location)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSwotCategory, setSelectedSwotCategory] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats' | null>(null)
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'base' | 'aggressive'>('base')

  // Load detailed data for Ashburn location
  useEffect(() => {
    if (!location || !isOpen) {
      setEnhancedLocation(location)
      return
    }

    if ((location.name || location.locationName) === "Ashburn VA") {
      setIsLoading(true)
      loadAshburnDetailedData().then(detailedData => {
        const merged = mergeAshburnData(location, detailedData)
        setEnhancedLocation(merged)
        setIsLoading(false)
      }).catch(error => {
        console.warn('Failed to load detailed Ashburn data:', error)
        setEnhancedLocation(location)
        setIsLoading(false)
      })
    } else {
      setEnhancedLocation(location)
    }
  }, [location, isOpen])

  if (!enhancedLocation) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none h-screen w-screen p-0 gap-0" hideClose>
        <VisuallyHidden>
          <DialogTitle>
            {enhancedLocation.name || enhancedLocation.locationName} - {enhancedLocation.status}
          </DialogTitle>
        </VisuallyHidden>
        <div className="flex h-screen w-screen">
          {/* Left Panel - Tabbed Content */}
          <div className="w-[70%] h-screen flex flex-col bg-white">
            {/* Header with Back Button */}
            <div className="flex-shrink-0 px-6 py-4 border-b">
              <div className="flex items-center">
                <button
                  onClick={() => onOpenChange(false)}
                  className="mr-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
                  type="button"
                  aria-label="Go back to dashboard"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>
                <h1 className="text-2xl font-semibold">
                  {enhancedLocation.name || enhancedLocation.locationName} - {enhancedLocation.status}
                  {isLoading && <span className="ml-2 text-base text-gray-500">(Loading...)</span>}
                </h1>
              </div>
            </div>

            {/* Tab List */}
            <div className="flex-shrink-0 px-6 py-3 border-b bg-white">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="pricingEconomics">Pricing</TabsTrigger>
                  <TabsTrigger value="competition">Competition</TabsTrigger>
                  <TabsTrigger value="actionPlan">Action Plan</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="overview" className="p-6">
                  <Overview 
                    location={enhancedLocation} 
                    selectedSwotCategory={selectedSwotCategory}
                    onSwotCategorySelect={setSelectedSwotCategory}
                  />
                </TabsContent>
                <TabsContent value="pricingEconomics" className="p-6">
                  <PricingEconomics location={enhancedLocation} selectedScenario={selectedScenario} />
                </TabsContent>
                <TabsContent value="competition" className="p-6">
                  <Competition location={enhancedLocation} />
                </TabsContent>
                <TabsContent value="actionPlan" className="p-6">
                  <ActionPlan location={enhancedLocation} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Panel - Map or SWOT Details (Fixed Height) */}
          <div className="w-[30%] h-screen border-l">
            <MapPane 
              location={enhancedLocation} 
              selectedSwotCategory={selectedSwotCategory}
              onSwotCategoryClose={() => setSelectedSwotCategory(null)}
              activeTab={activeTab}
              onScenarioChange={setSelectedScenario}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}