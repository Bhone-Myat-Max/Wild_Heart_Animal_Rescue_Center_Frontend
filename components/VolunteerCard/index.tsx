
import React from 'react';
// import { Volunteer } from '../types';

interface VolunteerCardProps {
  pending_volunteer: Volunteers;
  onAccept: (id: number) => void;
}

export const VolunteerCard: React.FC<VolunteerCardProps> = ({ pending_volunteer, onAccept }) => {
console.log(pending_volunteer);

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-indigo-100 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <img 
        //   src={pending_volunteer.avatar} 
          alt={pending_volunteer.name} 
          className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-50"
        />
        <div className="overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{pending_volunteer.name}</h3>
          <p className="text-sm text-gray-500 truncate">{pending_volunteer.email}</p>
        </div>
      </div>
      
      <div className="flex-grow mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
            {pending_volunteer.skill}
          </span>
          <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
            {pending_volunteer.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 italic">"I'm eager to contribute my skills to the team and help make a difference."</p>
      </div>

      <button
        onClick={() => onAccept(pending_volunteer.id)}
        className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Approve Volunteer
      </button>
    </div>
  );
};
