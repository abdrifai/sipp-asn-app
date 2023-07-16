"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
import DetailData from "../BoxRiwayat";
import DropdownMenu from "@/app/components/DropdownMenu";
import CardBox from "@/app/components/cards/CardBox";
import DetailGolongan from "./DetailGolongan";

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
  const [toggelDetail, setToggelDetail] = useState(false);
  const [rwtIDSelect, setRwtIDSelect] = useState("");

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

  const handleToggelDetail = () => {
    setToggelDetail((prev) => !prev);
  };

  const handleShowDetail = () => {
    setToggelDetail(true);
  };

  return (
    <>
      {toggelDetail && (
        <DetailGolongan handleToggle={handleToggelDetail} RwtID={rwtIDSelect} />
      )}
      <DetailData title="Riwayat Golongan">
        <div className="pt-3">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-4 py-2">
                  No
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Golongan
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Nomor SK
                </th>
                <th scope="col" className="px-4 py-2">
                  TMT
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Nomor Pertek
                </th>
                <th scope="col" className="px-4 py-2">
                  Tgl Pertek
                </th>
                <th scope="col" className="px-4 py-2">
                  Keterangan
                </th>
                <th scope="col" className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
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
                    <td className="whitespace-nowrap px-4 py-3">
                      <DropdownMenu
                        title="Action"
                        onClickEdit={() => {
                          setRwtIDSelect(item.id);
                          handleShowDetail();
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </DetailData>
    </>
  );
};

export default RiwayatGolongan;
