"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
import DetailData from "../BoxRiwayat";

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

const RiwayatGolongan = () => {
  const currentPNS = useCurrentPNS();

  const [data, setData] = useState<DataRwtGolongan[]>([]);

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
    getDataRiwayat("golongan", currentPNS.pegawaiId);
  }, [currentPNS.pegawaiId]);

  return (
    <DetailData title="Riwayat Golongan">
      <div className="pt-3 overflow-scroll">
        <table className="table-auto min-w-full">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Golongan
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Nomor SK
              </th>
              <th scope="col" className="px-4 py-3">
                TMT
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Nomor Pertek
              </th>
              <th scope="col" className="px-4 py-3">
                Tgl Pertek
              </th>
              <th scope="col" className="px-4 py-3">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item: any, index: number) => (
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
                  <td className="whitespace-nowrap px-4 py-3">{item.sk}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {new Date(item.tmtSk).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.pertekBkn}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {new Date(item.tglPertek).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">-</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DetailData>
  );
};

export default RiwayatGolongan;
