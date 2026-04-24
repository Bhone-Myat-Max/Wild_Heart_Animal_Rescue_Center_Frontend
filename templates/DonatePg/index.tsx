

'use client'

import HeroSection from "@/components/hero-section";
// import DonationForm from "@/templates/DonatePg"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import DonationForm from "./donationform";
import { useDonationDialogStore } from "./store"
// import DonationDialog from "./donation-dialog";
import { ChartPie, HeartHandshake, Hospital, MedalIcon } from "lucide-react";
import DonationDialog from "./donation-dialog";

type rescueMissionProp = {
  Missions: RescueMission[]
  donation: Donation[]

}

export default function DonationTemplate({ Missions, donation }: rescueMissionProp) {  // const donationSectionRef = useRef<HTMLDivElement>(null);

  const totalDonation = donation.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const foodFound = donation.filter(d => d.purpose === "Food & Nutrition");
  console.log('FoodFund', foodFound);
  const totalfoodDonation = foodFound.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const MedicalCare = donation.filter(d => d.purpose === "Medical Care");
  console.log('Medical', MedicalCare);
  const totalMedicalCare = MedicalCare.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const HabitatConstruction = donation.filter(d => d.purpose === "Habitat Construction");
  console.log('Medical', HabitatConstruction);
  const totalHabitatConstruction = HabitatConstruction.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const GeneralFund = donation.filter(d => d.purpose === "General Fund");
  console.log('Medical', GeneralFund);
  const totalGeneralFund = GeneralFund.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const Other = donation.filter(d => d.purpose === "Other");
  console.log('Medical', Other);
  const totalOther = Other.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const purposeTotals = donation.reduce((acc, d) => {
    const purpose = d.purpose || "Other"
    acc[purpose] = (acc[purpose] || 0) + Number(d.amount)
    return acc
  }, {} as Record<string, number>)

  const getPercentage = (amount: number) => {
    if (totalDonation === 0) return 0
    return Math.round((amount / totalDonation) * 100)
  }
  const rescueMissions = Missions.filter(
  mission => mission.status === "active"
)
  // console.log(rescueMissions);
 
  const { isOpen, setOpen, setRescueMissionId } = useDonationDialogStore()
 

  return <div>
    <DonationDialog />


    {/* Impact Statistics */}
    {/* 
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-extrabold">2.5k+</h3>
                <p className="text-emerald-200 font-medium">Animals Rescued</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-extrabold">85%</h3>
                <p className="text-emerald-200 font-medium">Release Rate</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-extrabold">12k+</h3>
                <p className="text-emerald-200 font-medium">Monthly Meals</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-extrabold">24/7</h3>
                <p className="text-emerald-200 font-medium">Emergency Response</p>
              </div>
            </div>
          </div>
        </section> */}

    {/* Where Your Money Goes */}
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">How Your Donation Helps</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparency is our priority. Every dollar you contribute goes directly towards the care and survival of the animals in our sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
              {/* <i className="fas fa-hand-holding-medical"></i> */}
              <Hospital />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Critical Care</h4>
            <p className="text-gray-600 leading-relaxed">
              Covers surgeries, medications, and specialized veterinary staff for animals arriving with severe injuries or illnesses.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-sm font-bold text-blue-600">{getPercentage(totalMedicalCare)}% of Funds</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
              <ChartPie />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Nutrition & Food</h4>
            <p className="text-gray-600 leading-relaxed">
              Provides species-specific diets, milk substitutes for orphaned babies, and natural foraging supplies.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-sm font-bold text-orange-600">{getPercentage(totalfoodDonation)}% of Funds</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
              <HeartHandshake />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Safe Habitats</h4>
            <p className="text-gray-600 leading-relaxed">
              Maintains and constructs outdoor aviaries, enclosures, and release-ready habitats that mimic natural environments.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-600">{getPercentage(totalHabitatConstruction)}% of Funds</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Active Missions / Campaigns */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Active Rescue Missions</h2>
            <p className="text-gray-600">Help us fund these specific urgent needs right now.</p>
          </div>
          {/* <button
            // onClick={scrollToDonation}
            className="text-emerald-700 font-bold flex items-center gap-2 hover:underline"
          >
            View All Needs <i className="fas fa-arrow-right text-xs"></i>
          </button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Campaign 1 */}
          {
            rescueMissions.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">

                <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <HeartHandshake className="text-gray-400" size={28} />
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                  No Active Missions
                </h3>

                <p className="text-gray-500 mt-2 max-w-sm">
                  There are currently no rescue missions available. Please check back later or support us through general donations.
                </p>

                {/* <button
                  onClick={() => router.push('#donate')}
                  className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
                >
                  Donate Now
                </button> */}

              </div>
            ) : rescueMissions.map((rescueMission) => (
              <div className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all">
                <div className="h-56 overflow-hidden relative">
                  <img src={rescueMission.image_url} alt="Owl" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 uppercase">Emergency</div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{rescueMission.title}</h4>
                  <p className="text-gray-500 text-sm mb-6">{rescueMission.description}</p>
                  <div className="space-y-4">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{
                        width: `${(rescueMission.raised_amount /
                          rescueMission.target_amount) *
                          100
                          }%`,
                      }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-900 font-bold">${rescueMission.raised_amount} <span className="text-gray-400 font-normal">raised</span></span>
                      <span className="text-emerald-600 font-bold">{Math.round(
                        (rescueMission.raised_amount /
                          rescueMission.target_amount) *
                        100
                      )}%</span>
                    </div>

                    {/* Progress */}

                    <button
                      onClick={() => {
                        setOpen(true)
                        setRescueMissionId(rescueMission.id)
                      }}
                      // onClick={scrollToDonation}
                      className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      Fund This Mission
                    </button>
                  </div>
                </div>
              </div>
            ))
          }

        
        </div>
      </div>
    </section>

    {/* Donation Form Section */}
    <section id="donate" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Support Our Mission</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Your direct contribution makes immediate medical care possible for wildlife in need.
          </p>
        </div>

        <div className="">
          <DonationForm />
        </div>
      </div>
    </section>


  </div>
}