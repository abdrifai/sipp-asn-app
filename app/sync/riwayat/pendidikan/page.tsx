"use client";

import BoxRiwayatBKN from "../box-riwayat-bkn";
import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type rwtPendidikanBKN = {
  id?: string;
  nipBaru: string;
  nipLama: string;
  gelarBelakang?: string;
  gelarDepan?: string;
  isPendidikanPertama?: string;
  namaSekolah?: string;
  nomorIjasah?: string;
  path?: string;
  pendidikanNama?: string;
  tahunLulus?: string;
  tglLulus?: string;
  tkPendidikanNama?: string;
};

const RiwayatPendidikanBKN = () => {
  const currentPNS = useCurrentPNS();
  // const { data, error } = useSWR(`/api/bkn/riwayat/golongan`, fetcher);
  const [data, setData] = useState<rwtPendidikanBKN[]>([]);
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
      const response = await fetch(`/api/bkn/riwayat/pendidikan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nip: nip, apim: apim, sso: sso }),
      });

      const data = await response.json();

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
      <BoxRiwayatBKN title="Riwayat Pendidikan">
        <div className="pt-3 overflow-scroll">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nama Pendidikan
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Gelar Depan
                </th>
                <th scope="col" className="px-4 py-3">
                  Gelar Belakang
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nama Sekolah
                </th>
                <th scope="col" className="px-4 py-3">
                  Nomor Ijazah
                </th>
                <th scope="col" className="px-4 py-3">
                  Tahun Lulus
                </th>
                <th scope="col" className="px-4 py-3">
                  -
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
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.pendidikanNama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.gelarDepan}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.gelarBelakang}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.namaSekolah}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.nomorIjasah}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      {item.tahunLulus}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">-</td>
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

export default RiwayatPendidikanBKN;
