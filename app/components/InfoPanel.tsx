"use client";

import Image from "next/image";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useCariASNModal from "../hooks/useCariAsnModal";
import useCurrentPNS from "../hooks/useCurrentPNS";

interface PNS {
  id: string;
  nipBaru: string;
  orang: {
    nama: string;
  };
  lastJabatan: {
    jabatan: {
      nmJab: string;
    };
    unorInduk: {
      nmUnor: string;
    };
    subUnorSub: {
      nmUnor: string;
    };
  };
  lastGolongan: {
    golongan: {
      gol: string;
      pangkat: string;
    };
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const InfoPanel = () => {
  const currentPNS = useCurrentPNS();
  const { data, error } = useSWR(`/api/pns/${currentPNS.NIP}`, fetcher);
  // const [data, setData] = useState<PNS[]>([]);

  const cariModal = useCariASNModal();

  useEffect(() => {
    const nip = localStorage.getItem("nip");
    if (nip) {
      const pegawaiID = localStorage.getItem("id");
      getDataPns(nip);
      currentPNS.NIP = nip;
      currentPNS.pegawaiId = pegawaiID || "";
    }
  }, [currentPNS.NIP]);

  const getDataPns = async (nip: string) => {
    try {
      const response = await fetch(`/api/pns/${nip}`);
      const data = await response.json();

      // const response = await fetch(`/api/pns/${nip}`);

      // if (response.ok) {
      //   const data = await response.json();
      //   setData(data.data);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-3 w-full border rounded-lg shadow-lg p-2 items-center">
      <div className="col-span-1 col-row">
        <Image
          src="/default.png"
          width={100}
          height={100}
          alt="photo"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div className="flex col-span-5">
        <div className="space-y-0">
          <p className="block font-bold">{data && data[0]?.nipBaru}</p>
          <p className="block">{data && data[0]?.orang?.nama}</p>
          <p className="block">
            {data && data[0]?.lastGolongan?.golongan?.gol},{" "}
            {data && data[0]?.lastGolongan?.golongan?.pangkat}
          </p>
          <p className="block">
            {data && data[0]?.lastJabatan?.jabatan?.nmJab}
          </p>
        </div>
      </div>
      <div className="ml-4 text-left col-span-5">
        <span className="block">
          {data && data[0]?.lastJabatan?.unorInduk?.nmUnor}
        </span>
        <span className="block">
          {data && data[0]?.lastJabatan?.subUnorSub?.nmUnor}
        </span>
      </div>
      <div className="col-span-1 group">
        <AiOutlineSearch
          className="w-10 h-10 m-2  hover:font-bold hover:text-green-700 hover:cursor-pointer hover:scale-150"
          onClick={() => cariModal.onOpen()}
        />
      </div>
    </div>
  );
};

export default InfoPanel;
