"use client";

import BoxRiwayatBKN from "../box-riwayat-bkn";
import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type rwtDiklatBKN = {
  id?: string;
  nipBaru: string;
  nipLama: string;
  institusiPenyelenggara?: string;
  latihanStrukturalId?: string;
  latihanStrukturalNama?: string;
  nomor?: string;
  path?: string;
  tahun?: string;
  tanggal?: string;
  tanggalSelesai?: string;
};

const RiwayatDiklatBKN = () => {
  const currentPNS = useCurrentPNS();
  // const { data, error } = useSWR(`/api/bkn/riwayat/golongan`, fetcher);
  const [data, setData] = useState<rwtDiklatBKN[]>([]);
  const [error, setError] = useState(true);

  useEffect(() => {
    const nip = localStorage.getItem("nip");
    const apim = localStorage.getItem("token_apim");
    const sso = localStorage.getItem("token_sso");
    if (nip && apim && sso) {
      const pegawaiID = localStorage.getItem("id");
      getDataPns(nip, apim, sso);
      currentPNS.NIP = nip;
      currentPNS.pegawaiId = pegawaiID || "";
    }
  }, [currentPNS.NIP]);

  const getDataPns = async (nip: string, apim: string, sso: string) => {
    try {
      const response = await fetch(`/api/bkn/riwayat/diklat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nip: nip, apim: apim, sso: sso }),
      });

      const data = await response.json();

      console.info("Data Riwayat :", data);

      if (data.code !== "900901") {
        setData(data.data);
        setError(false);
      } else {
        console.error("Pesan Error :", data.description);
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // if (error) {
  //   return <div>Error fetching data</div>;
  // }

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <BoxRiwayatBKN title="Riwayat Diklat">
        <div className="pt-3 overflow-scroll">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nomor Diklat
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Tahun
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nomor Sertifikat
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Tangal Sertifikat
                </th>
                <th scope="col" className="px-4 py-3">
                  Penyelenggara
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
                data &&
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.latihanStrukturalNama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.tahun}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.nomor}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.tanggal}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.institusiPenyelenggara}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </BoxRiwayatBKN>
    </>
  );
};

export default RiwayatDiklatBKN;
