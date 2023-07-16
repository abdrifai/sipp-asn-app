"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
import BoxRiwayat from "../BoxRiwayat";

interface DataRwtPendidikan {
  id: string;
  noIjazah: string;
  tglIjazah: string;
  thnLulus: string;
  nmSekolah: string;
  jurusan: string;
  gd: string;
  gb: string;
  pengesahan: string;
  ReferensiTktPendidikanbatan: {
    id: string;
    tktpend: string;
  };
  ReferensiPendidikan: {
    id: string;
    pend: string;
  };
}

const RiwayatPendidikan = () => {
  const currentPNS = useCurrentPNS();
  const [data, setData] = useState<DataRwtPendidikan[]>([]);

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
    getDataRiwayat("pendidikan", currentPNS.pegawaiId);
  }, [currentPNS.pegawaiId]);

  return (
    <BoxRiwayat title="Riwayat Pendidikan">
      <div className="pt-3">
        <table className="table-auto min-w-full">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr onClick={() => {}}>
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Pendidikan
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Sekolah/Universitas
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Jurusan
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                No. Ijazah
              </th>
              <th scope="col" className="px-4 py-3">
                Tgl Ijazah
              </th>
              <th scope="col" className="px-4 py-3">
                Gelar Depan
              </th>
              <th scope="col" className="px-4 py-3">
                Gelar Belakang
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item: DataRwtPendidikan, index: number) => (
                <tr
                  key={index}
                  onClick={() => {}}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.ReferensiPendidikan.pend}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.nmSekolah}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {item.jurusan}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.noIjazah}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {new Date(item.tglIjazah).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{item.gd}</td>
                  <td className="whitespace-nowrap px-4 py-3">{item.gb}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </BoxRiwayat>
  );
};

export default RiwayatPendidikan;
