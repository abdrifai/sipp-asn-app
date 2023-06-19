import { create } from "zustand";

interface CariAsnModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CariAsnModal = create<CariAsnModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default CariAsnModal;
