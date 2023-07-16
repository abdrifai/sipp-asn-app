"use client";

import BoxRiwayatBKN from "../box-riwayat-bkn";
import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type rwtPnsUnorBKN = {
  id?: string;
  asalNama?: string;
  namaUnorBaru?: string;
  path?: string;
  skNomor?: string;
  skTanggal?: string;
};

const RiwayatPnsUnorBKN = () => {
  const currentPNS = useCurrentPNS();
  // const { data, error } = useSWR(`/api/bkn/riwayat/golongan`, fetcher);
  const [data, setData] = useState<rwtPnsUnorBKN[]>([]);
  const [error, setError] = useState(true);
  const [statusCode, setStatusCode] = useState("");

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
      const response = await fetch(`/api/bkn/riwayat/dp3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nip: nip, apim: apim, sso: sso }),
      });

      const data = await response.json();

      setStatusCode(data.code);
      console.info(data);
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
      <BoxRiwayatBKN title="Riwayat DP3">
        <div className="pt-3 overflow-scroll">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nama Unor
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nomor SK
                </th>
                <th scope="col" className="px-4 py-3">
                  Tanggal SK
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Sumber
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
                    Get Data to API Error
                  </td>
                </tr>
              ) : statusCode == "0" ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-6 font-semibold text-slate-300"
                  >
                    No Data
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.namaUnorBaru}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.skNomor}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.skTanggal}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.asalNama}
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

export default RiwayatPnsUnorBKN;
