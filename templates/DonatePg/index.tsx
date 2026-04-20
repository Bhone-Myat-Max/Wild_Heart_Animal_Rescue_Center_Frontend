'use client'

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import DonationForm from "./donationform"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type rescueMissionProp = {
rescueMissions: RescueMission[]
}

export default function DonationTemplate({rescueMissions}:rescueMissionProp) {
  console.log(rescueMissions);
  return <>
    {/* <section className="bg-emerald-900 py-16 text-white"> */}
    <div className="p-28 ">
      <div>
        {rescueMissions.map((rescueMission) => (
          <Card className="relative mx-auto w-full max-w-sm pt-0">
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <Image alt='Image' src={rescueMission.image_url} unoptimized width={60} height={60} className="relative z-20 aspect-video w-full object-cover  " />
          
          <CardHeader>
            <CardAction>
              <Badge variant="secondary">Featured</Badge>
            </CardAction>
            <CardTitle>{rescueMission.title}</CardTitle>
            <CardDescription>
              {rescueMission.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">View Event</Button>
          </CardFooter>
        </Card>
        ))}
        
      </div>
      <DonationForm />
    </div>
    {/* </section> */}


  </>
}