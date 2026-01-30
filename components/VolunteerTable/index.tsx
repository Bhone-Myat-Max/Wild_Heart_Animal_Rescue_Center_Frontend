
import React from 'react';


interface VolunteerTableProps {
  acceptedvolunteer: Volunteers[];
}

export const VolunteerTable: React.FC<VolunteerTableProps> = ({ acceptedvolunteer }) => {
  if (acceptedvolunteer.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No accepted volunteers yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Volunteer</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Expertise</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date Joined</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {acceptedvolunteer.map((accepted_v) => (
              <tr key={accepted_v.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* <img src={accepted_v.avatar} className="w-8 h-8 rounded-full" alt={v.name} /> */}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{accepted_v.name}</div>
                      <div className="text-xs text-gray-500">Email</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{accepted_v.skill}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-emerald-700">{accepted_v.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">Date</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
