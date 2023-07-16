import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import Link from "next/link";
import React, { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HeaderRiwayat = () => {
  const currentPNS = useCurrentPNS();
  const { data, error } = useSWR(`/api/pns/${currentPNS.NIP}`, fetcher);

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
    <div>
      <header className="bg-slate-100 p-3 flex justify-between items-center border-b-2">
        <div>
          <h3 className="text-md font-bold">
            {data && data?.data[0]?.orang?.nama}
          </h3>
          <h3 className="text-md">{data && data?.data[0]?.nipBaru}</h3>
        </div>

        <Link
          href={"/sync"}
          className="bg-slate-400 px-3 py-2 shadow-md rounded-lg hover:font-semibold hover:bg-slate-500 hover:text-white transition"
        >
          Back to Menu
        </Link>
      </header>
    </div>
  );
};

export default HeaderRiwayat;
