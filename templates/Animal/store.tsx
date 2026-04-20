import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AnimalDialogStore = {
    animal?:Animal | null,
    setAnimal: (animal: Animal | null) => void, 
    isOpen: boolean,
    setOpen: (open : boolean) => void,
}

export const useAnimalDialogStore = create<AnimalDialogStore>()(persist((set) => (
    {
        product: undefined,
        setAnimal: (animal) => set((state) => ({ ...state, animal: animal })),
        isOpen: false,
        setOpen: (open) => set((state) => ({ ...state, isOpen: open })),
    }
),
    {
        name: 'product dialog store'
    }))
