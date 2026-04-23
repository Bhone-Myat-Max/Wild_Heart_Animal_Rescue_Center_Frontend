import { getAllAnimal } from "@/templates/Animal/action";

// }
const animal = await getAllAnimal("");

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">

      {/* 🌿 Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 text-white text-sm font-bold mb-6 backdrop-blur-md">
            ● URGENT HELP NEEDED
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Saving Animals,
            <br />
            <span className="text-emerald-600">One Heart</span> at a Time
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-lg">
            We rescue, rehabilitate, and rehome injured wildlife.
            Your support provides life-saving care.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-black">
              Donate Now
            </button>
            <button className="px-6 py-3 border border-emerald-200 text-emerald-700 rounded-lg font-bold hover:bg-emerald-50">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        {/* <div className="relative">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl h-[400px] shadow-xl border border-gray-100"></div>

          <div className="absolute bottom-6 left-6 bg-white p-5 rounded-xl shadow-lg border">
            <p className="text-xs text-gray-400 font-bold">LATEST RESCUE</p>
            <h4 className="font-bold text-gray-900">
              Luna the Red Fox
            </h4>
            <p className="text-sm text-gray-500 italic">
              "Now recovering in our sanctuary."
            </p>
          </div>
        </div> */}
      </div>
    </section>
  )
} 