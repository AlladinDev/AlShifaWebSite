import { create } from "zustand";
import type { IAppointment } from "../types/appointment";

type KeyValuePair<T> = {
  [K in keyof T]?: T[K];
};

type IStore = {
  currentStage: number;
  maxStages: number;
  appointmentData: IAppointment;
};

interface IStoreActions {
  moveToNextStage: () => void;
  moveToPreviousStage: () => void;
  addAppointmentDate: (data: KeyValuePair<IAppointment>) => void;
}

export const useAppointmentStore = create<IStore & IStoreActions>()((set) => ({
  currentStage: 1,
  maxStages: 3,

  appointmentData: {
    patientAge: 0,
    patientAddress: "",
    patientMobile: 0,
    patientName: "",
    clinicAddress: "",
    doctorID: "",
    clinicID: "",
    appointmentDate: "",
  },

  moveToNextStage: () =>
    set((state) => ({
      currentStage: Math.min(state.currentStage + 1, state.maxStages),
    })),

  moveToPreviousStage: () =>
    set((state) => ({
      currentStage: Math.max(state.currentStage - 1, 1),
    })),

  //this is the function which components can call to dump appointment form data
  addAppointmentDate: (data: KeyValuePair<IAppointment>) =>
    set((state) => ({
      appointmentData: {
        ...state.appointmentData,
        ...data,
      },
    })),
}));
