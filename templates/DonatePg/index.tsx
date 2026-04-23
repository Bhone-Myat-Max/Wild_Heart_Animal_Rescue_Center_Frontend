// 'use client'

// import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import DonationForm from "./donationform"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import Image from "next/image"
// import { useDonationDialogStore } from "./store"
// import DonationDialog from "./donation-dialog"

// type rescueMissionProp = {
//   rescueMissions: RescueMission[]

// }

// export default function DonationTemplate({ rescueMissions }: rescueMissionProp) {
//     const { isOpen,setOpen } = useDonationDialogStore()

//   return <>

//     {/* <section className="bg-emerald-900 py-16 text-white"> */}
//     <div className="p-40 ">
//       <DonationDialog/>
//       {/* <div>
//         {rescueMissions.map((rescueMission) => (
//           <Card className="relative mx-auto w-full max-w-sm pt-0">
//           <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
//           <Image alt='Image' src={rescueMission.image_url} unoptimized width={60} height={60} className="relative z-20 aspect-video w-full object-cover  " />

//           <CardHeader>
//             <CardAction>
//               <Badge variant="secondary">Featured</Badge>
//             </CardAction>
//             <CardTitle>{rescueMission.title}</CardTitle>
//             <CardDescription>
//               {rescueMission.description}
//             </CardDescription>
//           </CardHeader>
//           <CardFooter>
//             <Button className="w-full">View Event</Button>
//           </CardFooter>
//         </Card>
//         ))}

//       </div> */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
//         {rescueMissions.map((rescueMission) => (
//           <Card
//             key={rescueMission.id}
//             className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition pt-0"
//           >

//             <div className="relative w-full h-48">
//               <Image
//                 src={rescueMission.image_url} // fix null issue
//                 alt="Rescue Mission"
//                 fill
//                 className=""
//                 unoptimized
//               />

//               {/* Category Badge */}
//               <Badge className="absolute top-3 left-3 bg-white text-black">
//                 {rescueMission.category}
//               </Badge>
//             </div>

//             <CardHeader>
//               <CardTitle>{rescueMission.title}</CardTitle>
//               <CardDescription>
//                 {rescueMission.description}
//               </CardDescription>
//             </CardHeader>

//             {/* Progress */}
//             <div className="px-6 pb-4">
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//                 <div
//                   className="bg-green-500 h-2 rounded-full"
//                   style={{
//                     width: `${(rescueMission.raised_amount /
//                       rescueMission.target_amount) *
//                       100
//                       }%`,
//                   }}
//                 />
//               </div>

//               <div className="flex justify-between text-sm">
//                 <div>
//                   <span className="font-bold">${rescueMission.raised_amount}</span> 
//                   <span className="ml-2 text-gray-500">raised</span> 
//                 </div>
//                 <span className=" text-emerald-700 font-bold">
//                   {Math.round(
//                     (rescueMission.raised_amount /
//                       rescueMission.target_amount) *
//                     100
//                   )}
//                   %
//                 </span>
//               </div>
//             </div>

//             {/* Button */}
//             <CardFooter>
//               <Button
//               onClick={()=>setOpen(true)}
//                className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-al">
//                 Fund This Mission
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//       <DonationForm />
//     </div>
//     {/* </section> */}


//   </>
// }

'use client'

import HeroSection from "@/components/hero-section";
// import DonationForm from "@/templates/DonatePg"
import { useRouter } from "next/navigation";
import { useRef } from "react";
import DonationForm from "./donationform";
import { useDonationDialogStore } from "./store"
// import DonationDialog from "./donation-dialog";
import { ChartPie, HeartHandshake, Hospital, MedalIcon } from "lucide-react";
import DonationDialog from "./donation-dialog";

type rescueMissionProp = {
  rescueMissions: RescueMission[]

}

export default function DonationTemplate({ rescueMissions }: rescueMissionProp) {  // const donationSectionRef = useRef<HTMLDivElement>(null);

  // console.log(rescueMissions);
  const router = useRouter();
  const navigation = () => {
    router.push('/volunteer-request')
  };
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
              <span className="text-sm font-bold text-blue-600">45% of Funds</span>
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
              <span className="text-sm font-bold text-orange-600">30% of Funds</span>
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
              <span className="text-sm font-bold text-emerald-600">25% of Funds</span>
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
          <button
            // onClick={scrollToDonation}
            className="text-emerald-700 font-bold flex items-center gap-2 hover:underline"
          >
            View All Needs <i className="fas fa-arrow-right text-xs"></i>
          </button>
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

                <button
                  onClick={() => router.push('#donate')}
                  className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
                >
                  Donate Now
                </button>

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

          {/* Campaign 2 */}
          {/* <div className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all">
            <div className="h-56 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600" alt="Forest" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 uppercase">Facilities</div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Winter Nesting Boxes</h4>
              <p className="text-gray-500 text-sm mb-6">Preparing 50 insulated nesting boxes for small mammals ahead of the winter freeze.</p>
              <div className="space-y-4">
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[45%]"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900 font-bold">$800 <span className="text-gray-400 font-normal">raised</span></span>
                  <span className="text-emerald-600 font-bold">45%</span>
                </div>
                <button
                  // onClick={scrollToDonation}
                  className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                >
                  Fund This Mission
                </button>
              </div>
            </div>
          </div> */}

          {/* Campaign 3 */}
          {/* <div className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all">
            <div className="h-56 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&q=80&w=600" alt="Parrot" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 uppercase">Medicine</div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Monthly Medical Supplies</h4>
              <p className="text-gray-500 text-sm mb-6">Replenishing our stock of antibiotics, bandages, and IV fluids for the incoming spring season.</p>
              <div className="space-y-4">
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[20%]"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900 font-bold">$2,000 <span className="text-gray-400 font-normal">raised</span></span>
                  <span className="text-emerald-600 font-bold">20%</span>
                </div>
                <button
                  // onClick={scrollToDonation}
                  className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                >
                  Fund This Mission
                </button>
              </div>
            </div>
          </div> */}
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

    {/* CTA Bottom Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="bg-gray-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Every dollar protects a life.</h2>
          <p className="text-gray-400 text-lg">
            Your donation is tax-deductible and 100% of it goes directly to the wildlife rescue operations. Start your monthly giving today and become a Forest Guardian.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              // onClick={scrollToDonation}
              className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all active:scale-95"
            >
              Give Now
            </button>
            <button className="px-10 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 active:scale-95" onClick={navigation}>

              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
}