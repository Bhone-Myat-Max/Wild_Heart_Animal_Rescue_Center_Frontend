import heroImg1 from '@/assets/image/Img2.jpg'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowDown } from 'lucide-react'
import DonationDialog from '@/components/donation-session'

export default function HeroSection () {

   
    return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* <Image alt=''className="" src={heroImg1} width={300} height={400}/> */}
        
        <div className=" " />
      </div>

      {/* Content */}
      <div className=" relative z-10 container m-18 px-4 pt-20">
        <div className="max-w-2xl">


          <h1 className="text-black text-4xl md:text-6xl lg:text-7xl font-bold  mb-6">
            Saving Animals,
            <br />
            <span className="text-green-700">One Heart</span> at a Time
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            We rescue, rehabilitate, and rehome injured and abandoned animals. 
            Your support gives them a second chance at life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4" >
            <Button
              size="lg"
              className=" hover:opacity-90 transition-opacity text-lg px-8 py-6"
            //   onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Donate Now
            </Button>
            <Button
              size="lg"
             
              className=" text-primary-foreground bg-green-800 hover:bg-green-700 text-lg px-8 py-6"
            //   onClick={() => document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Report Injured Animal
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="text-primary-foreground/60">
          <ArrowDown className="w-6 h-6" />
        </div>
      </div>
    </section>
    )
}