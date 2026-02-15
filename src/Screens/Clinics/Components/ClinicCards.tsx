// components/ClinicCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Clinic } from "@/Types/Clinic.type"



export function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <Card className="w-full shadow-lg border-2 border-red hover:shadow-sxl shadow-gray-600 transition duration-300">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            {clinic.name}
          </CardTitle>
          <Badge variant={clinic.verified ? "default" : "secondary"}>
            {clinic.verified ? "Verified" : "Unverified"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          📍 {clinic.address} - {clinic.pincode}
        </p>
         <p className="text-sm text-muted-foreground">
          {clinic.mobile}
        </p>
       
       
      </CardHeader>

      <CardContent className="space-y-4">
       

        {/* Timings */}
        <div>
          <p className="text-sm font-medium mb-1">Season Timings</p>
          <div className="flex gap-2 flex-wrap">
            {clinic.seasonTimings.map((season, index) => (
              <Badge key={index} variant="outline">
                {season.name}: {season.start} - {season.end}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

       
      </CardContent>
    </Card>
  )
}
