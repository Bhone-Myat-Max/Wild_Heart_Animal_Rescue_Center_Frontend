// import Card from '@/components/animal-card'
import ContentSection from '@/components/content-section'
import HeroSection from '@/components/hero-section'
import React from 'react'
import DonationAPI from '@/api/donations'
import DonationTemplate from '@/templates/DonatePg'
import RescueMissionAPI from '@/api/rescueMission'


export default async function page() {
  const rescueMission = await RescueMissionAPI.all()
     
  return <div>
    <HeroSection/>
    <ContentSection/>
    <DonationTemplate rescueMissions={rescueMission.data.data}/>
    {/* <Card/> */}
  </div>
}
