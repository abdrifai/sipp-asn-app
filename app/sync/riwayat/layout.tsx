"use client";

import CariAsnModal from "@/app/hooks/useCariAsnModal";
import HeaderRiwayat from "./header-riwayat";
import MenuRiwayatBKN from "./menu-riwayat-bkn";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showModal = CariAsnModal();
  return (
    <div className="grid grid-cols-12 pt-3">
      <div className="col-span-2">
        <nav>
          <div className="p-4">
            <button
              onClick={showModal.onOpen}
              className="font-semibold text-slate-500 rounded-md bg-green-300 hover:text-white hover:bg-green-500 hover:rounded-md hover:shadow-md px-3 py-2 w-full trnsition"
            >
              Search ASN
            </button>
          </div>
          <div className="h-[calc(100%-200px)]">
            <MenuRiwayatBKN />
          </div>
        </nav>
      </div>
      <div className="col-span-10">
        <HeaderRiwayat />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
