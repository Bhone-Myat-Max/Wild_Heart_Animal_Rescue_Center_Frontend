'use client'
import InjuryReportForm from "@/components/InjuryReportForm";
import { useRef } from "react";

export default function ReportPage() {
     const donationSectionRef = useRef<HTMLDivElement>(null);
        const scrollToDonation = () => {
        donationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
    return(
       <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* <InjuryReportForm /> */}
                    <section ref={donationSectionRef} id="donate" className="py-24 bg-white relative">
                      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 space-y-4">
                          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Support Our Mission</h2>
                          <p className="text-gray-600 max-w-xl mx-auto text-lg">
                            Your direct contribution makes immediate medical care possible for wildlife in need.
                          </p>
                        </div>
                        
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                           <InjuryReportForm />
                        </div>
                      </div>
                    </section>
        </div>
    );
}