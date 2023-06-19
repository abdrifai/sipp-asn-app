"use client";

import { useRouter } from "next/navigation";
import useModalCompare from "@/app/hooks/useModalCompare";

interface BoxProps {
  title: string;
  children: React.ReactNode;
}

const BoxRiwayat: React.FC<BoxProps> = ({ title, children }) => {
  const router = useRouter();
  const modalCompare = useModalCompare();

  return (
    <div className="border-2 p-2 rounded-lg">
      <div className="flex flex-row justify-between items-center border-b-2 pb-2">
        <div className="font-bold pl-3">{title}</div>
        <div className="flex gap-3">
          <button
            className="bg-slate-200 px-3 py-2 shadow-md rounded-lg hover:font-semibold hover:bg-rose-500 hover:text-white transition"
            onClick={modalCompare.onOpen}
          >
            Compare Of SIASN
          </button>
          <button
            className="bg-slate-200 px-3 py-2 shadow-md rounded-lg hover:font-semibold hover:bg-green-500 hover:text-white transition"
            onClick={() => router.back()}
          >
            Back to Menu
          </button>
        </div>
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );
};

export default BoxRiwayat;
