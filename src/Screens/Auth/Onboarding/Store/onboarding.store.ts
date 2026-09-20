import { create } from "zustand";

type IOnboardingStore = {
    showUserTypeTabs: boolean,
    hideUserTypeTabs: (hide: boolean) => void
}
export const UseOnboardingStore = create<IOnboardingStore>((set) => ({
    showUserTypeTabs: true,
    hideUserTypeTabs: (hide) => set(() => ({ showUserTypeTabs: !hide }))
}))