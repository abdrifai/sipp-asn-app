"use client";

import useModalCompare from "@/app/hooks/useModalCompare";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  getPegawaiOfBKN,
  getPegawaiOfBKNRiwayatJabatan,
  getPegawaiOfBKNRiwayatGolongan,
} from "../../actions/getPegawaiOfBKN";
import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import DialogCompare from "../dialog/DialogCompare";
import TableCompareGolongan from "./TableCompareGolongan";
import TableCompareJabatan from "./TableCompareJabatan";

interface PegawaiOfBKN {
  nip: string;
  auth: string;
  authorization: string;
}

type RwtGolonganBKNType = {
  id?: string;
  golongan?: string;
  skNomor?: string;
  skTanggal?: string;
  tmtGolongan?: string;
  noPertekBkn?: string;
  tglPertekBkn?: string;
  jenisKPNama?: string;
};

interface DataRwtGolongan {
  id: string;
  sk: string;
  tmtSk: string;
  pertekBkn: string;
  tglPertek: string;
  golongan: {
    gol: string;
    pangkat: string;
  };
}

const ModalCompare = () => {
  const currentPNS = useCurrentPNS();
  const modalShow = useModalCompare();

  // const [dataBKN, setDataBKN] = useState<RwtGolonganBKNType[]>([]);
  // const [dataLocal, setDataLocal] = useState<DataRwtGolongan[]>([]);
  // const [error, setError] = useState(true);

  // useEffect(() => {
  // const nip = localStorage.getItem("nip");
  // const apim = localStorage.getItem("token_apim");
  // const sso = localStorage.getItem("token_sso");
  // if (nip && apim && sso) {
  //   if (modalShow.jenisRwt === "Riwayat Golongan") {
  //     getDataBKN(nip, apim, sso);
  //     getDataRiwayat("golongan", currentPNS.pegawaiId);
  //   } else if (modalShow.jenisRwt === "Riwayat Jabatan") {
  //     getDataRiwayat("jabatan", currentPNS.pegawaiId);
  //   }
  // }
  // }, [modalShow]);

  // const getDataRiwayat = async (jenis: string, pegawaiID: string) => {
  //   try {
  //     const response = await fetch(`/api/pns/riwayat/${jenis}/${pegawaiID}`);

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setDataLocal(data.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getDataBKN = async (nip: string, apim: string, sso: string) => {
  //   try {
  //     const response = await fetch(`/api/bkn/riwayat/golongan`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ nip: nip, apim: apim, sso: sso }),
  //     });

  //     const data = await response.json();
  //     // console.info(data);
  //     if (data.code !== "900901") {
  //       setDataBKN(data.data);
  //       setError(false);
  //     } else {
  //       console.error("Pesan Error :", data.description);
  //       setError(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div
      className={`${
        modalShow.isOpen
          ? "scale-100 duration-500 origin-top-right"
          : "scale-x-0 duration-500 origin-top-right"
      } absolute top-0 right-0 overflow-auto bg-gray-600 bg-opacity-30 shadow-md z-10 w-full h-full `}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-11/12 h-3/4 bg-white right-0 shadow-md">
          <div className="p-4 w-full bg-slate-200 font-bold flex justify-between items-center">
            <p>Compare of BKN</p>
            <div>
              <button onClick={modalShow.onClose}>
                <AiOutlineClose className="font-bold text-slate-600 text-3xl hover:text-red-500" />
              </button>
            </div>
          </div>

          {modalShow.jenisRwt === "Riwayat Golongan" && (
            <TableCompareGolongan />
          )}

          {modalShow.jenisRwt === "Riwayat Jabatan" && <TableCompareJabatan />}
        </div>
      </div>
    </div>
  );
};

export default ModalCompare;
