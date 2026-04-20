
// import React from 'react';
// import { Check, Phone } from 'lucide-react';

// interface UserCardProps {
//   user: User[];
//   selected: boolean;
//   onClick: () => void;
// }

// const UserCard: React.FC<UserCardProps> = ({ user, selected, onClick }) => {
//   return (
//     <button 
//       onClick={onClick}
//       className={`w-full group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left ${
//         selected 
//           ? 'bg-blue-50 border-blue-200 shadow-sm' 
//           : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
//       }`}
//     >
//       <div className="relative shrink-0">
//         <img 
//           src={user.avatar} 
//           alt={user.name} 
//           className="w-12 h-12 rounded-xl object-cover shadow-sm border-2 border-white"
//         />
//         {selected && (
//           <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
//             <Check size={12} strokeWidth={4} />
//           </div>
//         )}
//       </div>

//       <div className="flex-1 overflow-hidden">
//         <div className="flex items-center justify-between mb-0.5">
//           <p className={`font-bold transition-colors truncate ${selected ? 'text-blue-900' : 'text-slate-900'}`}>
//             {user.name}
//           </p>
//           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//             {user.role}
//           </span>
//         </div>
//         <div className="flex items-center gap-1.5 text-slate-500 text-xs">
//           <Phone size={12} className="opacity-50" />
//           {user.phone}
//         </div>
//       </div>

//       {/* Hover visual feedback */}
//       {!selected && (
//         <div className="opacity-0 group-hover:opacity-100 transition-opacity">
//           <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
//             <Check size={16} />
//           </div>
//         </div>
//       )}
//     </button>
//   );
// };

// export default UserCard;
