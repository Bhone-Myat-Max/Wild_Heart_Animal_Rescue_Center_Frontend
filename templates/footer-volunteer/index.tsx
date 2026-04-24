'use client'
import { useRouter } from "next/navigation";
export default function VolunteerFooter() {
    const router = useRouter();
    const navigationdonate = () => {
      router.push('/donation')
    };
    const navigation = () => {
      router.push('/volunteer-request')
    };
    return (
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
              onClick={navigationdonate}
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
    )
}