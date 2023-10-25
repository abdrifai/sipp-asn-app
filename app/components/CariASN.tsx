"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import CariAsnModal from "../hooks/useCariAsnModal";
import useCurrentPegawai from "../hooks/useCurrentPNS";

interface PnsSearch {
  id: string;
  nipBaru: string;
  orang: {
    nama: string;
  };
}

const CariASN = () => {
  const currentPegawai = useCurrentPegawai();

  const cariAsnModal = CariAsnModal();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<PnsSearch[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/pns?nama=${search}`
      );
      const result = await response.json().then((res) => res.data);
      setData(result);
    };

    fetchData();
  }, [search]);

  const getSearchValue = (e: any) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

  const selectPNS = (nip: string, id: string) => {
    console.log(data);
    localStorage.setItem("nip", nip);
    localStorage.setItem("id", id);
    currentPegawai.NIP = nip;
    currentPegawai.pegawaiId = id;
    cariAsnModal.onClose();
    setSearch("");
  };

  return (
    <div
      className={`${
        cariAsnModal.isOpen
          ? "scale-100 duration-500 origin-top-right"
          : "scale-x-0 duration-500 origin-top-right"
      } absolute top-0 right-0 overflow-auto bg-gray-600 bg-opacity-30 shadow-md z-10 w-full h-full `}
    >
      <div className="flex min-h-[calc(100vh-20vh)] items-center justify-center">
        <div className="bg-white p-4 min-w-[40vw] relative">
          <div className="bg-white rounded-r-lg absolute top-0 right-0 translate-x-full translate-y-100">
            <AiOutlineClose
              className="w-8 h-8 cursor-pointer hover:text-white hover:bg-gray-800 hover:rounded-r-lg"
              onClick={cariAsnModal.onClose}
            />
          </div>
          <div className="relative flex items-center w-full">
            <AiOutlineSearch className="absolute w-6 h-6 ml-3 pointer-events-none" />
            <input
              type="text"
              className="w-full pr-3 pl-10 py-2 font-semibold text-black border-none ring-2 ring-gray-300 focus:ring-1 placeholder-gray-300 hover:ring-1 active:ring-1"
              placeholder="Search NIP or Nama"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyUp={(e) => getSearchValue(e)}
            />
          </div>
          <div className="pt-5 transition min-h-[350px]">
            <table className="w-full border-b-2 border-gray-200 ">
              <thead className=" bg-slate-100 border-b-2 border-gray-300 text-left">
                <tr>
                  <th className="py-3 pl-2 text-sm font-semibold tracking-wide">
                    NIP
                  </th>
                  <th className="py-3 text-sm font-semibold tracking-wide text-left">
                    Nama
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((dt: any) => (
                    <tr
                      key={dt.id}
                      className="hover:bg-slate-50 hover:cursor-pointer"
                      onDoubleClick={() => selectPNS(dt.nipBaru, dt.id)}
                    >
                      <td className="pl-2">{dt.nipBaru}</td>
                      <td>{dt.orang.nama}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CariASN;
