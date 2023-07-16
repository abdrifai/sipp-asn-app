"use client";

import format from "date-fns/format";
import { PnsModelSIASN, PnsModelSimpeg } from "@/types";
import { useEffect, useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import useCariASNModal from "../hooks/useCariAsnModal";
import {
  getPegawaiOfBKN,
  getPegawaiOfBKNRiwayatJabatan,
  getPegawaiOfBKNRiwayatGolongan,
} from "../actions/getPegawaiOfBKN";
import { AiOutlineMinus } from "react-icons/ai";
import useCurrentPNS from "../hooks/useCurrentPNS";
import Link from "next/link";

function formatDateBKN(dateStr: string) {
  if (dateStr) {
    const [day, month, year] = dateStr.split("-");
    const formattedDateStr = `${year}-${month}-${day}`;
    return formattedDateStr;
  } else {
    return "";
  }
}

function formatGender(genderCode: string) {
  if (genderCode === "M") {
    return "Laki-Laki";
  } else if (genderCode === "F") {
    return "Perempuan";
  } else {
    return "tidak diketahui";
  }
}

interface ItemPros {
  title?: string;
  data?: string;
  siasn?: string;
}

const Item: React.FC<ItemPros> = ({ title, data, siasn }) => {
  return (
    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer">
      <td className="whitespace-nowrap pl-10 py-3 text-slate-400">{title}</td>
      {/* <td>:</td> */}
      <td className="px-4 py-3 text-left font-medium">{data}</td>
      <td className="px-4 py-3 text-left font-medium">{siasn}</td>
      <td className="px-2text-center">
        {data || siasn ? (
          data === siasn ? (
            <div className="flex justify-center items-center">
              <RiCheckLine size={25} className="text-green-700" />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <RiCloseLine size={25} className="text-red-700" />
            </div>
          )
        ) : (
          ""
          // <div className="flex justify-center items-center">
          //   <AiOutlineMinus size={25} className="text-red-700" />
          // </div>
        )}
      </td>
      <td></td>
    </tr>
  );
};

type PegawaiOfBKN = {
  nip: string;
  auth: string;
  authorization: string;
};

interface BoxProps {
  title: string;
  body?: React.ReactElement;
}

const Box: React.FC<BoxProps> = ({ title, body }) => {
  const cariModal = useCariASNModal();
  const currentPNS = useCurrentPNS();
  const [nip, setNip] = useState("");
  const [dataSimpeg, setDataSimpeg] = useState<PnsModelSimpeg[]>([]);
  const [dataSiasn, setDataSiasn] = useState<PnsModelSIASN[]>([]);
  const [data, setData] = useState<PegawaiOfBKN | null>(null);

  const options = {
    //     weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as any;

  useEffect(() => {
    const storedNip = localStorage.getItem("nip");
    const storedAuth = localStorage.getItem("token_sso");
    const storedAuthorization = localStorage.getItem("token_apim");

    if (storedNip) setNip(storedNip);

    if (storedNip && storedAuth && storedAuthorization) {
      setData({
        nip: storedNip,
        auth: storedAuth,
        authorization: storedAuthorization,
      });
    }
  }, [currentPNS.NIP]);

  const getPegawaiSIMPEG = async () => {
    const res = await fetch(`/api/pns/${nip}`);
    const result = await res.json().then((res) => res.data);
    console.log(result);
    setDataSimpeg(result);
  };

  const getPegawaiSIASN = async () => {
    if (data) {
      const result = await getPegawaiOfBKN(
        data.nip,
        data.auth,
        data.authorization
      );
      console.log(result);
      setDataSiasn([result?.data]);
    } else {
      console.log("get Pegawai SIASN kosong");
    }
  };

  const handleGetData = async () => {
    await getPegawaiSIMPEG();
    await getPegawaiSIASN();
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center pb-3">
        <div className="flex justify-between items-center gap-4">
          <div className="font-bold text-lg">{title}</div>
          <p>( {nip} )</p>
          <button
            className="bg-slate-200 px-3 py-2 shadow-md rounded-lg hover:font-semibold hover:bg-rose-500 hover:text-white transition"
            onClick={handleGetData}
          >
            Get Data
          </button>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button
            className="bg-slate-200 px-3 py-2 shadow-md rounded-lg hover:font-semibold hover:bg-rose-500 hover:text-white transition"
            onClick={() => cariModal.onOpen()}
          >
            Cari PNS
          </button>
          <Link
            href={"/sync"}
            className="bg-slate-200 px-3 py-2 shadow-md rounded-lg hover:font-semibold hover:bg-rose-500 hover:text-white transition"
          >
            Back to Menu
          </Link>
        </div>
      </div>
      <div className="pt-4">
        <table className="table-auto min-w-full">
          <thead className="border-b border-t bg-slate-200 font-medium dark:border-neutral-500">
            <tr>
              <td></td>
              <td className="px-4 py-3 text-left">DATA SIMPEG</td>
              <td className="px-4 py-3 text-left">DATA BKN</td>
              <td className="px-2 text-center">Verifikasi</td>
              <td className="px-4 py-3 text-left">Action</td>
            </tr>
          </thead>
          <tbody>
            <Item
              title="Nama"
              data={dataSimpeg[0]?.orang?.nama}
              siasn={dataSiasn[0]?.nama}
            />
            <Item
              title="Tempat Lahir"
              data={dataSimpeg[0]?.orang?.t4Lhr}
              siasn={dataSiasn[0]?.tempatLahir}
            />
            <Item
              title="Tanggal Lahir"
              data={new Date(dataSimpeg[0]?.orang?.tglLhr).toLocaleDateString(
                "id",
                options
              )}
              siasn={
                dataSiasn[0]?.tglLahir
                  ? new Date(
                      formatDateBKN(dataSiasn[0]?.tglLahir)
                    ).toLocaleDateString("id", options)
                  : ""
              }
            />
            <Item
              title="No. Akte Kelahiran"
              data={dataSimpeg[0]?.orang?.akte_kelahiran}
              siasn={dataSiasn[0]?.akteKelahiran}
            />
            <Item
              title="Nomor KTP"
              data={dataSimpeg[0]?.orang?.nik}
              siasn={dataSiasn[0]?.nomorIdDocument}
            />
            <Item
              title="Agama"
              data={dataSimpeg[0]?.orang?.agama?.agama}
              siasn={dataSiasn[0]?.agama}
            />
            <Item
              title="Gelar Depan"
              data={dataSimpeg[0]?.lastPendidikan?.gd}
              siasn={dataSiasn[0]?.gelarDepan}
            />
            <Item
              title="Gelar Belakang"
              data={dataSimpeg[0]?.lastPendidikan?.gb}
              siasn={dataSiasn[0]?.gelarBelakang}
            />
            <Item
              title="Jenis Kelamin"
              data={dataSimpeg[0]?.orang?.jkl?.jkl}
              siasn={formatGender(dataSiasn[0]?.jenisKelamin)}
            />
            <Item
              title="Status Pegawai"
              data={dataSimpeg[0]?.spns?.spns}
              siasn={dataSiasn[0]?.statusPegawai}
            />
            <Item title="Jenis Jabatan" siasn={dataSiasn[0]?.jenisJabatan} />
            <Item
              title="Jenis Kepegawaian"
              siasn={dataSiasn[0]?.jenisPegawaiNama}
            />
            <Item
              title="Kedudukan PNS"
              data={dataSimpeg[0]?.kedudukanPNS?.kedudukanpns}
              siasn={dataSiasn[0]?.kedudukanPnsNama}
            />
            <Item
              title="Jabatan"
              data={dataSimpeg[0]?.lastJabatan?.jabatan?.nmJab}
              siasn={dataSiasn[0]?.jabatanNama}
            />
            <Item title="Eselon" siasn={dataSiasn[0]?.eselon} />
            <Item title="Golongan Awal" siasn={dataSiasn[0]?.golRuangAwal} />
            <Item
              title="Golongan Akhir"
              data={dataSimpeg[0]?.lastGolongan?.golongan?.gol}
              siasn={dataSiasn[0]?.golRuangAkhir}
            />
            <Item
              title="Gaji Pokok"
              siasn={
                dataSiasn[0]?.gajiPokok
                  ? parseInt(dataSiasn[0]?.gajiPokok).toString()
                  : ""
              }
              // siasn={parseInt(dataSiasn[0]?.gajiPokok)}
            />
            <Item title="Masa Kerja" siasn={dataSiasn[0]?.masaKerja} />
            <Item
              title="Unit Organisasi Induk"
              data={dataSimpeg[0]?.lastJabatan?.unorInduk?.nmUnor}
              siasn={dataSiasn[0]?.unorNama}
            />
            <Item
              title="Unit Kerja"
              data={dataSimpeg[0]?.lastJabatan?.subUnorSub?.nmUnor}
            />
            <Item
              title="Tingkat Pendidikan"
              data={
                dataSimpeg[0]?.lastPendidikan?.ReferensiTktPendidikan.tktpend
              }
              siasn={dataSiasn[0]?.tkPendidikanTerakhir}
            />
            <Item
              title="Pendidikan"
              data={dataSimpeg[0]?.lastPendidikan?.ReferensiPendidikan.pend}
              siasn={dataSiasn[0]?.pendidikanTerakhirNama}
            />
            <Item title="Nomor SPMT" siasn={dataSiasn[0]?.noSpmt} />
            <Item
              title="Nomor SK CPNS, TMT"
              siasn={`${dataSiasn[0]?.nomorSkCpns}, ${dataSiasn[0]?.tmtCpns}`}
            />
            <Item
              title="Nomor SK PNS, TMT"
              siasn={`${dataSiasn[0]?.nomorSkPns}, ${dataSiasn[0]?.tglSkPns}`}
            />
            <Item title="Nomor STTPL" siasn={dataSiasn[0]?.nomorSttpl} />
            <Item
              title="Status Perkawinan"
              siasn={dataSiasn[0]?.statusPerkawinan}
            />
            <Item title="Diklat" data={dataSimpeg[0]?.lastDiklat?.nmDiklat} />
            <Item title="BUP Pensiun" siasn={dataSiasn[0]?.bupPensiun} />
            <Item
              title="Alamat"
              data={dataSimpeg[0]?.orang?.alamat}
              siasn={dataSiasn[0]?.alamat}
            />
            <Item
              title="Nomor HP"
              data={dataSimpeg[0]?.orang?.no_hp}
              siasn={dataSiasn[0]?.noHp}
            />
            <Item
              title="Email"
              data={dataSimpeg[0]?.orang?.email}
              siasn={dataSiasn[0]?.email}
            />
            <Item title="Email Gov" data="" siasn={dataSiasn[0]?.emailGov} />
            <Item title="Karpeg" data={dataSimpeg[0]?.karpeg} />
            <Item
              title="NPWP"
              data={dataSimpeg[0]?.orang?.npwp}
              siasn={dataSiasn[0]?.noNpwp}
            />
            <Item
              title="Nomor BPJS"
              data={dataSimpeg[0]?.bpjs}
              siasn={dataSiasn[0]?.bpjs}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Box;
