// // type HeroProp = {
// //   animal: Animal[]

// "use client"
// import { getAllAnimal } from "@/templates/Animal/action";
// import { useState } from "react"

// export default async function HeroTemplate({ animal }: { animal: any[] }) {

  

//   const [index, setIndex] = useState(0)

//   const next = () => {
//     setIndex((prev) => (prev + 1) % animal.length)
//   }

//   const prev = () => {
//     setIndex((prev) => (prev - 1 + animal.length) % animal.length)
//   }

//   const current = animal[index]

//   return (
//     <section className="relative min-h-screen flex items-center">

//       {/* BACKGROUND */}
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1502082553048-f009c37129b9"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/30"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

//         {/* LEFT (same as yours) */}
//         <div>
//           <h1 className="text-5xl md:text-7xl font-extrabold text-white">
//             Saving Animals,
//             <br />
//             <span className="text-emerald-600">One Heart</span> at a Time
//           </h1>
//         </div>

//         {/* 🔥 RIGHT SLIDER */}
//         <div className="relative">

//           {/* Card */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-3xl h-[400px] shadow-xl border overflow-hidden">

//             {/* Image */}
//             <img
//               src={current.image || "/placeholder.jpg"}
//               className="w-full h-[70%] object-cover"
//             />

//             {/* Info */}
//             <div className="p-4">
//               <p className="text-xs text-gray-400 font-bold">LATEST RESCUE</p>
//               <h4 className="font-bold text-gray-900 text-lg">
//                 {current.species}
//               </h4>
//               <p className="text-sm text-gray-500 italic">
//                 {current.health_status}
//               </p>
//             </div>
//           </div>

//           {/* ⬅️➡️ Buttons */}
//           <button
//             onClick={prev}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//           >
//             ←
//           </button>

//           <button
//             onClick={next}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//           >
//             →
//           </button>

//         </div>
//       </div>
//     </section>
//   )
// }