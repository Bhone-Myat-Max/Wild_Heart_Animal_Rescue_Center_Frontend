
// import Card from '@/components/animal-card'
import HeroSection from '@/components/hero-section'
import React from 'react'
import DonationAPI from '@/api/donations'
import DonationTemplate from '@/templates/DonatePg'
import RescueMissionAPI from '@/api/rescueMission'
import { getAll_AcceptedVolunteer } from '@/templates/Volunteers/actions'
import { getAllDonations } from '@/templates/DonatePg/action'
import { getAll_RescueCase } from '@/templates/RescueCase/action'
import ContentSection from '@/templates/HomePage'
import VolunteerFooter from '@/templates/footer-volunteer'
import RescueCaseAPI from '@/api/rescuecase'


export default async function page() {
 
  const rescueMission = await RescueMissionAPI.all()
  const volunteer = await getAll_AcceptedVolunteer("");
  const donation = await getAllDonations("");
  const rescue_case = await RescueCaseAPI.all();
  // const rescueMission = await RescueMissionAPI.all();
  return <div>
    <HeroSection />
    <ContentSection volunteer={volunteer} donation={donation} rescueMission={rescueMission.data.data} rescue_case={rescue_case.data.data} />
    {/* CTA Bottom Section */}
   <VolunteerFooter/>
    {/* <DonationTemplate Missions={rescueMission.data.data}/> */}
    {/* <Card/> */}
  </div>
}
