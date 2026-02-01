'use client'

import HeroSection from "@/components/hero-section";
import DonationForm from "@/templates/DonatePg"
import { useRef } from "react";
export default function page() {
  const donationSectionRef = useRef<HTMLDivElement>(null);
    const scrollToDonation = () => {
    donationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return <div>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Urgent Help Needed
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Saving Animals,<br />
              <span className="text-emerald-600">One Heart</span> at a Time
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              We rescue, rehabilitate, and rehome injured and abandoned wildlife. 
              Your support provides the specialized medical care and safe environments 
              they need to return to the wild.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToDonation}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Donate Now
              </button>
              <button 
                className="px-8 py-4 bg-white text-emerald-700 border-2 border-emerald-100 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-all active:scale-95"
              >
                Learn Our Mission
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
            <img 
              src="https://cdn.mjsmedia.co.uk/eswras/wp-content/uploads/2024/02/09162312/injured-fox-768x512.jpg" 
              alt="Wild Animal Rescue" 
              className="relative rounded-2xl shadow-2xl object-cover w-full h-[500px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden lg:block border border-gray-100 max-w-[240px]">
              <p className="text-sm font-bold text-gray-400 uppercase">Latest Rescue</p>
              <h4 className="text-lg font-bold text-gray-900">Luna the Red Fox</h4>
              <p className="text-sm text-gray-500 mt-1 italic">"Found with a broken wing, now recovering in our sanctuary."</p>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        {/* <section className="bg-emerald-900 py-16 text-white">
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
                  <i className="fas fa-hand-holding-medical"></i>
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
                  <i className="fas fa-utensils"></i>
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
                  <i className="fas fa-home"></i>
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
                onClick={scrollToDonation}
                className="text-emerald-700 font-bold flex items-center gap-2 hover:underline"
              >
                View All Needs <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Campaign 1 */}
              <div className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all">
                <div className="h-56 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1549480017-d76466a4b7e8?auto=format&fit=crop&q=80&w=600" alt="Owl" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 uppercase">Emergency</div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Barn Owl Orthopedic Surgery</h4>
                  <p className="text-gray-500 text-sm mb-6">Funding for specialized wing surgery and 3-month physical therapy for a rare Barn Owl.</p>
                  <div className="space-y-4">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[72%]"></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-900 font-bold">$1,250 <span className="text-gray-400 font-normal">raised</span></span>
                      <span className="text-emerald-600 font-bold">72%</span>
                    </div>
                    <button 
                      onClick={scrollToDonation}
                      className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      Fund This Mission
                    </button>
                  </div>
                </div>
              </div>

              {/* Campaign 2 */}
              <div className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all">
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
                      onClick={scrollToDonation}
                      className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      Fund This Mission
                    </button>
                  </div>
                </div>
              </div>

              {/* Campaign 3 */}
              <div className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all">
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
                      onClick={scrollToDonation}
                      className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      Fund This Mission
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                {/* Donation Form Section */}
        <section ref={donationSectionRef} id="donate" className="py-24 bg-white relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Support Our Mission</h2>
              <p className="text-gray-600 max-w-xl mx-auto text-lg">
                Your direct contribution makes immediate medical care possible for wildlife in need.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
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
                  onClick={scrollToDonation}
                  className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all active:scale-95"
                >
                  Give Now
                </button>
                <button className="px-10 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 active:scale-95">
                  Become a Volunteer
                </button>
              </div>
            </div>
          </div>
        </section>
  </div>
}