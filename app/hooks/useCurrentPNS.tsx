import { create } from "zustand";

interface CurrentPNSProps {
  NIP: string;
  pegawaiId: string;
}

const useCurrentPNS = create<CurrentPNSProps>((set) => ({
  NIP: "",
  pegawaiId: "",
}));

export default useCurrentPNS;
