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
  const [dataBKN, setDataBKN] = useState<RwtGolonganBKNType[]>([]);
  const [dataLocal, setDataLocal] = useState<DataRwtGolongan[]>([]);
  const [error, setError] = useState(true);

  useEffect(() => {
    const nip = localStorage.getItem("nip");
    const apim = localStorage.getItem("token_apim");
    const sso = localStorage.getItem("token_sso");

    if (nip && apim && sso) {
      getDataBKN(nip, apim, sso);
    }

    // const getData = async () => {
    //   const resultBKN = await getPegawaiOfBKNRiwayatGolongan(
    //     localStorage.getItem("nip") as string,
    //     localStorage.getItem("token_sso") as string,
    //     localStorage.getItem("token_apim") as string
    //   );
    //   setDataBKN(resultBKN);
    // };

    const getDataRiwayat = async (jenis: string, pegawaiID: string) => {
      try {
        const response = await fetch(`/api/pns/riwayat/${jenis}/${pegawaiID}`);

        if (response.ok) {
          const data = await response.json();
          setDataLocal(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getDataRiwayat("golongan", currentPNS.pegawaiId);
  }, [modalShow]);

  const handleShowData = () => {
    console.log(dataBKN);
  };

  const getDataBKN = async (nip: string, apim: string, sso: string) => {
    try {
      const response = await fetch(`/api/bkn/riwayat/golongan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nip: nip, apim: apim, sso: sso }),
      });

      const data = await response.json();
      // console.info(data);
      if (data.code !== "900901") {
        setDataBKN(data.data);
        setError(false);
      } else {
        console.error("Pesan Error :", data.description);
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
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
        <div className="relative w-11/12 h-3/4 bg-white right-0 shadow-md ">
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

            <div className="pt-3 flex divide-x-2">
              <table className="table-auto">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th colSpan={5} className="bg-slate-200 py-3">
                      Kab.Tojo Una-Una
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-4 py-2">
                      No
                    </th>
                    <th scope="col" className="px-4 py-2 text-left">
                      Golongan
                    </th>
                    <th scope="col" className="px-4 py-2 text-left">
                      Nomor SK
                    </th>
                    <th scope="col" className="px-4 py-2">
                      TMT
                    </th>
                    <th scope="col" className="px-4 py-2 text-left">
                      Nomor Pertek
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                  {dataLocal &&
                    dataLocal.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => {}}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {item.golongan.gol}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {item.sk}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center">
                          {new Date(item.tmtSk).toLocaleDateString("id")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {item.pertekBkn}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <table className="table-auto">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th colSpan={6} className="bg-violet-200 py-3">
                      Data BKN
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-4 py-2">
                      No
                    </th>
                    <th scope="col" className="px-4 py-2 text-left">
                      Golongan
                    </th>
                    <th scope="col" className="px-4 py-2 text-left">
                      Nomor SK
                    </th>
                    {/* <th scope="col" className="px-4 py-2">
                      Tanggal SK
                    </th> */}
                    <th scope="col" className="px-4 py-2 text-left">
                      Nomor Pertek
                    </th>
                    {/* <th scope="col" className="px-4 py-2">
                      Tanggal Pertek
                    </th> */}
                    <th scope="col" className="px-4 py-2">
                      TMT
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Jenis KP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {error ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center p-6 font-semibold text-slate-300"
                      >
                        No Data
                      </td>
                    </tr>
                  ) : (
                    dataBKN?.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {item.golongan}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {item.skNomor}
                        </td>
                        {/* <td className="whitespace-nowrap px-4 py-3 text-center"></td> */}
                        <td className="whitespace-nowrap px-4 py-3">
                          {item.noPertekBkn}
                        </td>
                        {/* <td className="whitespace-nowrap px-4 py-3 text-center"></td> */}
                        <td className="whitespace-nowrap px-4 py-3">-</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {item.jenisKPNama}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCompare;
