"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
import BoxRiwayat from "../BoxRiwayat";

interface DataKGB {
  id: string;
  sk: string;
  tglSk: string;
  tmtSk: string;
  maskerThn: string;
  maskerBln: string;
  gapok: string;
  pengesahan: string;
  golongan: {
    gol: string;
    pangkat: string;
  };
}

const RiwayatKGB = () => {
  const currentPNS = useCurrentPNS();
  const [data, setData] = useState<DataKGB[]>([]);

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
    getDataRiwayat("kgb", currentPNS.pegawaiId);
  }, [currentPNS.pegawaiId]);

  return (
    <BoxRiwayat title="Riwayat Kenaikan Gaji Berkala">
      <div className="pt-3 overflow-scroll">
        <table className="table-auto min-w-full">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr onClick={() => {}}>
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Nomor SK
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Tanggal SK
              </th>
              <th scope="col" className="px-4 py-3">
                TMT SK
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Gaji Pokok
              </th>
              <th scope="col" className="px-4 py-3">
                Golongan
              </th>
              <th scope="col" className="px-4 py-3">
                Masa Kerja Tahun
              </th>
              <th scope="col" className="px-4 py-3">
                Masa Kerja Bulan
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item: DataKGB, index: number) => (
                <tr
                  key={index}
                  onClick={() => {}}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{item.sk}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {new Date(item.tglSk).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {new Date(item.tmtSk).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{item.gapok}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {item.golongan.gol}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {item.maskerThn}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {item.maskerBln}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </BoxRiwayat>
  );
};

export default RiwayatKGB;
