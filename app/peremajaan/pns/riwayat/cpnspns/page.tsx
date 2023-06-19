"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
import BoxRiwayat from "../BoxRiwayat";

interface DataCpnsPns {
  id: string;
  sk: string;
  tglsk: string;
  tmtsk: string;
  pertekBkn: string;
  tglPertekBkn: string;
  status: {
    spns: string;
  };
}

const RiwayatCpnsPns = () => {
  const currentPNS = useCurrentPNS();
  const [data, setData] = useState<DataCpnsPns[]>([]);

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
    getDataRiwayat("cpnspns", currentPNS.pegawaiId);
  }, [currentPNS.pegawaiId]);

  return (
    <BoxRiwayat title="CPNS/PNS">
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
                Nomor Pertek
              </th>
              <th scope="col" className="px-4 py-3">
                Tanggal Pertek
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item: DataCpnsPns, index: number) => (
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
                    {new Date(item.tglsk).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {new Date(item.tmtsk).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.pertekBkn}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {item.tglPertekBkn &&
                      new Date(item.tglPertekBkn).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {item.status.spns}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </BoxRiwayat>
  );
};

export default RiwayatCpnsPns;
