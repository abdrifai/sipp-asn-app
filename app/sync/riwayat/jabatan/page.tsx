"use client";

import BoxRiwayatBKN from "../box-riwayat-bkn";
import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type rwtJabBKN = {
  id?: string;
  nipBaru?: string;
  eselon?: string;
  jabatanFungsionalNama?: string;
  jabatanFungsionalUmumNama?: string;
  jenisJabatan?: string;
  namaJabatan?: string;
  namaUnor?: string;
  nomorSk?: string;
  path?: string;
  tanggalSk?: string;
  tmtJabatan?: string;
  tmtPelantikan?: string;
  unorIndukNama?: string;
  unorNama?: string;
};

const namaJabatan = (jenisJabatan: string, data: rwtJabBKN) => {
  if (jenisJabatan === "1") {
    return data.namaJabatan;
  } else if (jenisJabatan === "2") {
    return data.jabatanFungsionalNama;
  } else if (jenisJabatan === "3") {
  } else {
    return data.jabatanFungsionalUmumNama;
  }
};

const RiwayatJabatanBKN = () => {
  const currentPNS = useCurrentPNS();
  // const { data, error } = useSWR(`/api/bkn/riwayat/golongan`, fetcher);
  const [data, setData] = useState<rwtJabBKN[]>([]);
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
      const response = await fetch(`/api/bkn/riwayat/jabatan`, {
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
      <BoxRiwayatBKN title="Riwayat Jabatan">
        <div className="pt-3 overflow-scroll">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nama Jabatan
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nomor SK
                </th>
                <th scope="col" className="px-4 py-3">
                  Tanggal SK
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  TMT Jabatan
                </th>
                <th scope="col" className="px-4 py-3">
                  Eselon
                </th>
                <th scope="col" className="px-4 py-3">
                  Nama Unor
                </th>
                <th scope="col" className="px-4 py-3">
                  Unor Induk
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
                      {namaJabatan(item?.jenisJabatan || "", item)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.nomorSk}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center"></td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.tanggalSk}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      {item.tmtJabatan}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.unorNama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.unorIndukNama}
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

export default RiwayatJabatanBKN;
