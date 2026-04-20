
import { Button } from '@/components/ui/button';
import { Delete, Edit, Edit2, Edit3, EditIcon, Trash, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteAnimal, updateAnimal } from '../action';
import { useAnimalDialogStore } from '../store';


interface AnimalTableProp {
  animals: Animal[];
}

export const Animaltable: React.FC<AnimalTableProp> = ({ animals }) => {

  const { isOpen, setOpen, animal } = useAnimalDialogStore()

  if (animals.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No animal data yet.</p>
      </div>
    );
  }
  // export default function Page() {
  const router = useRouter();
  const navigateAnimalForm = (resId: number) => {
    
    router.push('animal-form/' + resId);
  };
  

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden  ">
      <div className="overflow-x-auto bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-white">image</th>
              <th className="px-6 py-4 text-sm font-semibold text-white">tagcode</th>
              <th className="px-6 py-4 text-sm font-semibold text-white">species</th>
              <th className="px-6 py-4 text-sm font-semibold text-white">health_status</th>
              <th className="px-6 py-4 text-sm font-semibold text-white">current_status</th>
              <th className="px-6 py-4 text-sm font-semibold text-white text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {animals.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">Image</span>
              
                  <Image alt='Image' src={a.image} unoptimized width={60} height={60} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* <img src={accepted_v.avatar} className="w-8 h-8 rounded-full" alt={v.name} /> */}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{a.tagcode}</div>
                      {/* <div className="text-xs ">{a.species}</div> */}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="">{a.species}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {/* <div className="w-2 h-2 rounded-full bg-emerald-500"></div> */}
                    <span className="">{a.current_status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {/* <span className=" font-medium text-emerald-800 rounded-2x">{a.current_status}
                    
                  </span> */}
                  <span
                    className={`font-medium rounded-2xl ${a.current_status === "under_treatment"
                        ? "text-red-600"
                        : "text-emerald-800"
                      }`}
                  >
                    {a.current_status}
                  </span>

                </td>

                <td className="px-6 py-4 text-right">
                  <Button className='bg-black w-10  text-white p-1 rounded-lg mr-1 ' onClick={() => navigateAnimalForm(a.id)}><Edit/></Button>
                  <Button className="bg-black w-10 text-white p-1 rounded-lg" onClick={() => deleteAnimal(a.id)}><Trash2/></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
