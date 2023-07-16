"use client";

import { useEffect, useState } from "react";
import BoxRiwayat from "../BoxRiwayat";

interface DataKinerja {
  id: string;
  noIjazah: string;
  tglIjazah: string;
  thnLulus: string;
  nmSekolah: string;
  jurusan: string;
  gd: string;
  gb: string;
  pengesahan: string;
  jaReferensiTktPendidikanbatan: {
    id: string;
    tktpend: string;
  };
  ReferensiPendidikan: {
    id: string;
    pend: string;
  };
}

const RiwayatKinerja = () => {
  let pegawaiId: string = "";
  const [data, setData] = useState<DataKinerja[]>([]);

  useEffect(() => {
    pegawaiId = localStorage.getItem("id") || "";

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/riwayat/diklat/${pegawaiId}`
      );
      const result = await response.json().then((res) => res.data);
      setData(result);
    };

    fetchData();
  }, []);

  const handleOnClick = () => {
    console.log(data);
  };

  return (
    <BoxRiwayat title="Riwayat Kinerja">
      <div className="pt-3">
        <table className="table-auto min-w-full">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr onClick={handleOnClick}>
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Pendidikan
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Sekolah/Universitas
              </th>
              <th scope="col" className="px-4 py-3">
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
              data.map((item: DataKinerja, index: number) => (
                <tr
                  key={item.id}
                  onClick={() => {}}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {/* {item.ReferensiPendidikan.pend} */}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {/* {item.nmSekolah} */}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {/* {new Date(item.jurusan).toLocaleDateString("id")} */}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">-</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {/* {item.pengesahan} */}
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

export default RiwayatKinerja;
