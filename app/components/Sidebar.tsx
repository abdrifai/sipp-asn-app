"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineSplitCells } from "react-icons/ai";
import useSidebarModal from "../hooks/useSidebarModal";

const Sidebar = () => {
  const sidebarModal = useSidebarModal();
  const [openRef, setOpenRef] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [openSync, setOpenSync] = useState(false);
  const [openLayanan, setOpenLayanan] = useState(false);
  const [openMLaporan, setOpenMLaporan] = useState(false);

  return (
    <div
      className={`${
        sidebarModal.isOpen
          ? "scale-100 duration-500 origin-top-right"
          : "scale-x-0 duration-500 origin-top-right"
      } absolute top-0 right-0 overflow-auto bg-gray-600 bg-opacity-30 shadow-md z-10 w-full h-full `}
    >
      <div className=" absolute top-0 w-64 h-full bg-white right-0 shadow-md ml-0">
        <div className="p-4  w-full bg-slate-200 font-bold hover:text-red-500 flex justify-center">
          <button onClick={sidebarModal.onClose}>
            <AiOutlineClose className="font-bold text-slate-600 text-3xl hover:text-red-500" />
          </button>
        </div>
        <ul className="p-4">
          <li>
            <button
              onClick={() => setOpenData((openData) => !openData)}
              className={`${
                openData ? "text-red-700" : "text-slate-600"
              } font-semibold  hover:text-red-700 hover:bg-slate-200 hover:rounded-md hover:shadow-md px-3 py-2 w-full text-left`}
            >
              Data
            </button>
            <ul>
              <li>
                <nav
                  className={`${
                    openData ? "" : "hidden"
                  } absolute top-16 right-0 py-1 bg-white shadow-lg rounded-lg w-full z-40`}
                >
                  <ul className="block">
                    <li className="group" onClick={sidebarModal.onClose}>
                      <Link
                        href="/peremajaan/pns"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        PNS
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        href="#"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        PPPK
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Non ASN
                      </Link>
                    </li>
                    <li className="group border-t-2">
                      <button
                        className="font-semibold py-2 px-4 w-full text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md flex justify-center"
                        onClick={() => setOpenData(!openData)}
                      >
                        <AiOutlineSplitCells className="text-2xl" />
                        <span className="ml-4">Tutup</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => setOpenLayanan(!openLayanan)}
              className={`${
                openLayanan ? "text-red-700" : "text-slate-600"
              } font-semibold  hover:text-red-700 hover:bg-slate-200 hover:rounded-md hover:shadow-md px-3 py-2 w-full text-left`}
            >
              Pelayanan
            </button>
            <ul>
              <li>
                <nav
                  className={`${
                    openLayanan ? "" : "hidden"
                  } absolute top-16 right-0 py-1 bg-white shadow-lg rounded-lg w-full z-40`}
                >
                  <ul className="block">
                    <li className="group" onClick={sidebarModal.onClose}>
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Kenaikan Pangkat
                      </Link>
                    </li>
                    <li className="group" onClick={sidebarModal.onClose}>
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Cuti
                      </Link>
                    </li>
                    <li className="group" onClick={sidebarModal.onClose}>
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Diklat
                      </Link>
                    </li>
                    <li className="group" onClick={sidebarModal.onClose}>
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Tugas Belajar
                      </Link>
                    </li>
                    <li className="group" onClick={sidebarModal.onClose}>
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Izin Belajar
                      </Link>
                    </li>
                    <li className="group" onClick={sidebarModal.onClose}>
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Disiplin
                      </Link>
                    </li>
                    <li className="group" onClick={sidebarModal.onClose}>
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Pengadaan ASN
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Kenaikan Gaji Berkala
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        href="/"
                        className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                      >
                        Pensiun
                      </Link>
                    </li>
                    <li className="group border-t-2">
                      <button
                        className="font-semibold py-2 px-4 w-full text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md flex justify-center"
                        onClick={() => setOpenLayanan(!openLayanan)}
                      >
                        <AiOutlineSplitCells className="text-2xl" />
                        <span className="ml-4">Tutup</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => setOpenMLaporan(!openMLaporan)}
              className={`${
                openMLaporan ? "text-red-700" : "text-slate-600"
              } font-semibold  hover:text-red-700 hover:bg-slate-200 hover:rounded-md hover:shadow-md px-3 py-2 w-full text-left`}
            >
              Laporan
            </button>
          </li>

          <li>
            <button
              onClick={() => setOpenRef((openRef) => !openRef)}
              className={`${
                openRef ? "text-red-700" : "text-slate-600"
              } font-semibold  hover:text-red-700 hover:bg-slate-200 hover:rounded-md hover:shadow-md px-3 py-2 w-full text-left`}
            >
              Referensi
            </button>
            <nav
              className={`${
                openRef ? "" : "hidden"
              } py-1 absolute top-16 right-0 bg-white shadow-lg rounded-lg max-w-[250px] w-full z-40`}
            >
              <ul className="block">
                <li className="group" onClick={sidebarModal.onClose}>
                  <Link
                    href="/"
                    className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                  >
                    Organisasi
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/"
                    className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                  >
                    Orang
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/"
                    className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                  >
                    Agama
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/"
                    className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                  >
                    Golongan
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/"
                    className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                  >
                    Jabatan ASN
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/"
                    className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                  >
                    Jabatan Non ASN
                  </Link>
                </li>

                <li className="group border-t-2">
                  <button
                    className="font-semibold py-2 px-4 w-full text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md flex justify-center"
                    onClick={() => setOpenRef(!openRef)}
                  >
                    <AiOutlineSplitCells className="text-2xl" />
                    <span className="ml-4">Tutup</span>
                  </button>
                </li>
              </ul>
            </nav>
          </li>

          <li onClick={() => {}}>
            <button
              onClick={() => setOpenSync(!openSync)}
              className={`${
                openSync ? "text-red-700" : "text-slate-600"
              } font-semibold  hover:text-red-700 hover:bg-slate-200 hover:rounded-md hover:shadow-md px-3 py-2 w-full text-left`}
            >
              Sync Data BKN
            </button>
            <nav
              className={`${
                openSync ? "" : "hidden"
              } py-1 absolute top-16 right-0 bg-white shadow-lg rounded-lg max-w-[250px] w-full z-40`}
            >
              <ul className="block">
                <li className="group" onClick={sidebarModal.onClose}>
                  <Link
                    href="/sync"
                    className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                  >
                    Data Utama
                  </Link>
                </li>
                <li className="group" onClick={sidebarModal.onClose}>
                  <Link
                    href="/sync/riwayat"
                    className="font-semibold py-2 px-4 w-full block text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md"
                  >
                    Riwayat
                  </Link>
                </li>

                <li className="group border-t-2">
                  <button
                    className="font-semibold py-2 px-4 w-full text-slate-600 group-hover:text-red-700 group-hover:bg-slate-200 group-hover:rounded-md flex justify-center"
                    onClick={() => setOpenSync(!openSync)}
                  >
                    <AiOutlineSplitCells className="text-2xl" />
                    <span className="ml-4">Tutup</span>
                  </button>
                </li>
              </ul>
            </nav>
          </li>

          <li onClick={() => {}}>
            <button>
              <Link
                href="/setting"
                className="block font-semibold  hover:text-red-700 hover:bg-slate-200 hover:rounded-md hover:shadow-md px-3 py-2 w-full text-left"
              >
                Setting
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
