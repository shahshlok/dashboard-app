"use client"

import type { Location } from "../../data/locations"

interface RealEstateProps {
  location: Location
}

export default function RealEstate({ location }: RealEstateProps) {
  const enhancedLocation = location as any

  return (
    <div className="space-y-6 text-xl pb-8">
      {enhancedLocation.real_estate_evaluation && (
        <div>
          <h3 className="font-semibold mb-3">Real Estate</h3>
          <div className="grid grid-cols-2 gap-4">
            {enhancedLocation.real_estate_evaluation.location_details && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium mb-2">Location Details</h4>
                <div className="text-sm space-y-1">
                  {enhancedLocation.real_estate_evaluation.location_details.address && (
                    <div><span className="text-gray-600">Address:</span> {enhancedLocation.real_estate_evaluation.location_details.address}</div>
                  )}
                  {enhancedLocation.real_estate_evaluation.location_details.square_footage && (
                    <div><span className="text-gray-600">Size:</span> {enhancedLocation.real_estate_evaluation.location_details.square_footage.toLocaleString()} sq ft</div>
                  )}
                  {enhancedLocation.real_estate_evaluation.location_details.previous_tenant && (
                    <div><span className="text-gray-600">Previous:</span> {enhancedLocation.real_estate_evaluation.location_details.previous_tenant}</div>
                  )}
                </div>
              </div>
            )}
            {enhancedLocation.real_estate_evaluation.lease_terms && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium mb-2">Lease Terms</h4>
                <div className="text-sm space-y-1">
                  {enhancedLocation.real_estate_evaluation.lease_terms.base_rent && 
                    <div><span className="text-gray-600">Base Rent:</span> {enhancedLocation.real_estate_evaluation.lease_terms.base_rent}</div>
                  }
                  {enhancedLocation.real_estate_evaluation.lease_terms.escalator && 
                    <div><span className="text-gray-600">Escalator:</span> {enhancedLocation.real_estate_evaluation.lease_terms.escalator}</div>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}