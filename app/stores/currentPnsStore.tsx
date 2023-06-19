import { create } from "zustand";

interface currentPnsPros {
  pns: {};
  getPns: (nip: string) => void;
}

export const currentPnsStore = create<currentPnsPros>()((set) => ({
  pns: {},
  getPns: async (value) => {
    const response = await fetch(`http://localhost:5000/pns/${value}`);
    response.json().then((result) => set({ pns: result.data[0] }));
    //     set({ pns: await response.json() });
  },
}));
