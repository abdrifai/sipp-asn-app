"use client";

import useModalCompare from "@/app/hooks/useModalCompare";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  getPegawaiOfBKN,
  getPegawaiOfBKNRiwayatJabatan,
  getPegawaiOfBKNRiwayatGolongan,
} from "../../actions/getPegawaiOfBKN";

interface PegawaiOfBKN {
  nip: string;
  auth: string;
  authorization: string;
}

type RwtJabatanType = {
  idPns: string;
  nipBaru: string;
  golongan: string;
  skNomor: string;
  skTanggal: string;
  tmtGolongan: string;
  noPertekBkn: string;
  tglPertekBkn: string;
  jumlahKreditUtama: string;
  jumlahKreditTambahan: string;
  jenisKPNama: string;
  masaKerjaGolonganTahun: string;
  masaKerjaGolonganBulan: string;
  path: string;
};

const ModalCompare = () => {
  const modalShow = useModalCompare();
  const [data, setData] = useState<RwtJabatanType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getPegawaiOfBKNRiwayatGolongan(
        localStorage.getItem("nip") as string,
        localStorage.getItem("token_sso") as string,
        localStorage.getItem("token_apim") as string
      );
      setData(result);
    };
    getData();
  }, [modalShow]);

  const handleShowData = () => {
    console.log(data);
  };

  return (
    <div
      className={`${
        modalShow.isOpen
          ? "scale-100 duration-500 origin-top-right"
          : "scale-x-0 duration-500 origin-top-right"
      } absolute top-0 right-0 overflow-auto bg-gray-600 bg-opacity-30 shadow-md z-10 w-full h-full `}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-3/4 h-3/4 bg-white right-0 shadow-md ">
          <div className="p-4 w-full bg-slate-200 font-bold flex justify-between items-center">
            <p>Compare of BKN</p>
            <div>
              <button onClick={modalShow.onClose}>
                <AiOutlineClose className="font-bold text-slate-600 text-3xl hover:text-red-500" />
              </button>
            </div>
          </div>
          <div className="p-4 overflow-scroll h-full bg-white">
            <button onClick={handleShowData}>Show Data</button>
            <div>{JSON.stringify(data)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCompare;
