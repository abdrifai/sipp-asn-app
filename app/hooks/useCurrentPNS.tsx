import { create } from "zustand";

interface CurrentPNSProps {
  NIP: string;
  pegawaiId: string;
  pnsIdBKN: string;
}

const useCurrentPNS = create<CurrentPNSProps>((set) => ({
  NIP: "",
  pegawaiId: "",
  pnsIdBKN: "",
}));

export default useCurrentPNS;
