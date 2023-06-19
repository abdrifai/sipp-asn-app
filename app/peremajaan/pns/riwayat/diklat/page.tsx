"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
import BoxRiwayat from "../BoxRiwayat";

interface DataRwtDiklat {
  id: string;
  nmDiklat: string;
  noSertifikat: string;
  tglSertifikat: string;
  penyelenggara: string;
}

const RiwayatDiklat = () => {
  const currentPNS = useCurrentPNS();
  const [data, setData] = useState<DataRwtDiklat[]>([]);

  const getDataRiwayat = async (jenis: string, pegawaiID: string) => {
    try {
      const response = await fetch(`/api/pns/riwayat/${jenis}/${pegawaiID}`);

      if (response.ok) {
        const data = await response.json();
        setData(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataRiwayat("diklat", currentPNS.pegawaiId);
  }, [currentPNS.pegawaiId]);

  return (
    <BoxRiwayat title="Riwayat Diklat">
      <div className="pt-3 overflow-scroll">
        <table className="table-auto min-w-full">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr onClick={() => {}}>
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Nama Diklat
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Nomor Sertifikat
              </th>
              <th scope="col" className="px-4 py-3">
                Tanggal Sertifikat
              </th>
              <th scope="col" className="px-4 py-3">
                Ket
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item: DataRwtDiklat, index: number) => (
                <tr
                  key={index}
                  onClick={() => {}}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.nmDiklat}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.noSertifikat}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {new Date(item.tglSertifikat).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">-</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </BoxRiwayat>
  );
};

export default RiwayatDiklat;
