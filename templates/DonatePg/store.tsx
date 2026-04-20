import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DonationlDialogStore = {
    donation?:Donation | null,
    setDonation: (donation: Donation | null) => void, 
    isOpen: boolean,
    setOpen: (open : boolean) => void,
}

export const useDonationDialogStore = create<DonationlDialogStore>()(persist((set) => (
    {
        donation: undefined,
        setDonation: (donation) => set((state) => ({ ...state, donation: donation })),
        isOpen: false,
        setOpen: (open) => set((state) => ({ ...state, isOpen: open })),
    }
),
    {
        name: 'product dialog store'
    }))
