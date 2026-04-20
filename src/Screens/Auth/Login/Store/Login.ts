import { create } from "zustand"

export type LoginDialogType = {
  isOpen: boolean
  toggleDialog: (shouldOpen: boolean) => void
}

export const LoginDialogStore = create<LoginDialogType>((set) => ({
  isOpen: false,

  toggleDialog: (shouldOpen: boolean) =>
    set(() => ({
      isOpen: shouldOpen,
    })),
}))