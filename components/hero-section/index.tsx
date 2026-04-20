import heroImg1 from '@/assets/image/Img2.jpg'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'
// import DonationDialog from '@/components/donation-session'

export default function HeroSection () {

   
    return (
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
                // onClick={{scrollToDonation}}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
              <Link href={"/donation"} className='w-full'> Donate Now</Link> 
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
    )
}