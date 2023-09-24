import { create } from "zustand";

interface ModalCompare {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  jenisRwt: string;
}
const useModalCompare = create<ModalCompare>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  jenisRwt: "",
}));

export default useModalCompare;
