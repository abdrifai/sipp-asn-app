import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import useModalCompare from "@/app/hooks/useModalCompare";
import React, { useEffect, useState } from "react";

type RwtJabatanBKN = {
  id?: string;
  eselon?: string;
  namaJabatan?: string;
  namaUnor?: string;
  nomorSk?: string;
  tanggalSk?: string;
  tmtJabatan?: string;
  tmtPelantikan?: string;
  unorNama?: string;
  path?: string;
};

interface DataRwtJabatan {
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

const TableCompareJabatan = () => {
  const currentPNS = useCurrentPNS();
  const modalShow = useModalCompare();
  const [dataBKN, setDataBKN] = useState<RwtJabatanBKN[]>([]);
  const [dataLocal, setDataLocal] = useState<DataRwtJabatan[]>([]);
  const [error, setError] = useState(true);

  useEffect(() => {
    const nip = localStorage.getItem("nip");
    const apim = localStorage.getItem("token_apim");
    const sso = localStorage.getItem("token_sso");

    if (nip && apim && sso) {
      getDataBKN(nip, apim, sso);
      getDataRiwayat("jabatan", currentPNS.pegawaiId);
    }
  }, [modalShow]);

  const getDataRiwayat = async (jenis: string, pegawaiID: string) => {
    try {
      const response = await fetch(`/api/pns/riwayat/${jenis}/${pegawaiID}`);

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setDataLocal(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDataBKN = async (nip: string, apim: string, sso: string) => {
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
        setDataBKN(data.data);
        setError(false);
      } else {
        console.error("Pesan Error :", data.description);
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 overflow-scroll h-full bg-white">
      <span className="flex justify-center font-bold text-xl">
        Riwayat Jabatan
      </span>
      <div className="pt-3 divide-x-2">
        <table className="table-auto">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th colSpan={5} className="bg-slate-200 py-3">
                Kab.Tojo Una-Una
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-4 py-2">
                No
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Jabatan
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Nomor SK
              </th>
              <th scope="col" className="px-4 py-2">
                TMT
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Unit Organisasi
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {dataLocal &&
              dataLocal.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                  onDoubleClick={() => alert(JSON.stringify(item))}
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.jabatan.nmJab}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{item.sk}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {new Date(item.tmtSk).toLocaleDateString("id")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.subUnorSub.nmUnor}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Data BKN */}
        <table className="table-auto">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th colSpan={6} className="bg-violet-200 py-3">
                Data BKN
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-4 py-2">
                No
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Jabatan
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Nomor SK
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                TMT
              </th>
              <th scope="col" className="px-4 py-2">
                Unit Organisasi
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
              dataBKN?.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.namaJabatan}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.nomorSk}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.tmtJabatan}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.namaUnor}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCompareJabatan;
