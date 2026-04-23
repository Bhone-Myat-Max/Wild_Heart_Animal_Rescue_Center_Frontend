import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DonationlDialogStore = {
    isOpen: boolean,
    donation?:Donation | null,
    rescueMissionId?: number | null;
    setDonation: (donation: Donation | null) => void, 
    setRescueMissionId: (id: number | null) => void;
    setOpen: (open : boolean) => void,
}

export const useDonationDialogStore = create<DonationlDialogStore>()(persist((set) => (
    {
        donation: undefined,
        selectedMissionId: null,
        setDonation: (donation) => set((state) => ({ ...state, donation: donation })),
        isOpen: false,
        setRescueMissionId: (id) => set({ rescueMissionId: id }),
        setOpen: (open) => set((state) => ({ ...state, isOpen: open })),
    }
),
    {
        name: 'product dialog store'
    }))
