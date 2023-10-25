"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
// import BoxRiwayat from "../BoxRiwayat";
import DropdownMenuAction from "@/app/components/dropdown/DropdownMenu";
import DetailData from "../BoxRiwayat";
import DialogConfirmation from "@/app/components/dialog/DialogConfirmation";
import { toast } from "react-toastify";
import DetailDiklat from "./DetailDiklat";

interface syncDataDiklatInterface {
  bobot: number;
  institusiPenyelenggara: string;
  jenisKompetensi: string;
  jumlahJam: number;
  latihanStrukturalId: string;
  nomor: string;
  path: [
    {
      dok_id: string;
      dok_nama: string;
      dok_uri: string;
      object: string;
      slug: string;
    }
  ];
  pnsOrangId: string;
  tahun: 2023;
  tanggal: string;
  tanggalSelesai: string;
}

interface DataRwtDiklat {
  id: string;
  nipBaru: string;
  jnsDiklat_id: string;
  jenjangDiklat_id: string;
  nmDiklat: string;
  noSertifikat: string;
  tglSertifikat: string;
  jumlahJam: string;
  penyelenggara: string;
  angkatan: string;
  t4pelaksanaan: string;
  tglMulai: string;
  tglSelesai: string;
}

const defaultFormData = {
  id: "",
  nipBaru: "",
  jnsDiklat_id: "",
  jenjangDiklat_id: "",
  nmDiklat: "",
  noSertifikat: "",
  tglSertifikat: "",
  penyelenggara: "",
  jumlahJam: "",
  angkatan: "",
  t4pelaksanaan: "",
  tglMulai: "",
  tglSelesai: "",
};

interface DeleteRwt {
  id: string;
  diklat: string;
  sertifikat: string;
}

const RiwayatDiklat = () => {
  const currentPNS = useCurrentPNS();
  const [isOpen, setIsOpen] = useState(false);
  const [toggelDetail, setToggelDetail] = useState(false);
  const [rwtIDSelect, setRwtIDSelect] = useState("");
  const [rwtDiklat, setRwtDiklat] = useState([]);
  const [rwtSelect, setRwtSelect] = useState(defaultFormData);
  const [formData, setFormData] = useState<DataRwtDiklat>(defaultFormData);
  const [syncData, setSyncData] = useState<syncDataDiklatInterface[]>([]);
  const [dataDeleteConfirmation, setDataDeleteConfirmation] =
    useState<DeleteRwt>({ id: "", diklat: "", sertifikat: "" });

  const getDataRiwayat = async (pegawaiID: string) => {
    try {
      const response = await fetch(`/api/pns/riwayat/diklat/${pegawaiID}`);

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setRwtDiklat(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataRiwayat(currentPNS.pegawaiId);
  }, [currentPNS.pegawaiId]);

  const handleSyncDiklatToBKN = async (item: any) => {
    let pnsId = localStorage.getItem("IdBKN");
    let tahunDiklat = new Date(item.tglSertifikat).getFullYear();

    // console.log(item.jenjangDiklat.latihanStrukturalId);
    let syncDataDiklat = {
      bobot: 0,
      institusiPenyelenggara: item.penyelenggara,
      jenisKompetensi: "",
      jumlahJam: item.jumlahJam ? item.jumlahjam : 100,
      latihanStrukturalId: item.jenjangDiklat.latihanStrukturalId,
      nomor: item.noSertifikat,
      path: [
        {
          dok_id: "1695624832000-645651331",
          dok_nama: "1695624832000-645651331",
          dok_uri: "http://localhost:5000/arsip/1695624832000-645651331.pdf",
          object: "1695624832000-645651331",
          slug: "1695624832000-645651331",
        },
      ],
      pnsOrangId: pnsId,
      tahun: tahunDiklat,
      tanggal: item.tglMulai,
      tanggalSelesai: item.tglSelesai,
    };

    console.log("data yg akan dikrm : ", syncDataDiklat);

    const nip = localStorage.getItem("nip");
    const apim = localStorage.getItem("token_apim");
    const sso = localStorage.getItem("token_sso");

    try {
      const response = await fetch(`/api/bkn/riwayat/diklat/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nip: nip,
          apim: apim,
          sso: sso,
          data: syncDataDiklat,
        }),
      });

      const data = await response.json();

      // console.info("save data riwayat :", data);

      if (data.success) {
        toast("sync data berhasil", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
      } else {
        toast("sync gagal", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onToggleClick = () => {
    setToggelDetail((prev) => !prev);
  };

  const handleShowDetail = async (item: any) => {
    setToggelDetail(true);
    setRwtSelect(item);
    // console.log(item);
  };

  const onSyncClickFromBKN = async () => {
    const nip = localStorage.getItem("nip");
    const apim = localStorage.getItem("token_apim");
    const sso = localStorage.getItem("token_sso");

    try {
      const response = await fetch(`/api/bkn/riwayat/diklat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nip: nip,
          apim: apim,
          sso: sso,
          data: { nip: nip, apim: apim, sso: sso },
        }),
      });

      const data = await response.json();

      const dtRwt: DataRwtDiklat[] = data?.data.map((item: any) => ({
        idBKN: item.id,
        nipBaru: item.nipBaru,
        jnsDiklat_id: "95ac1653-4c3c-4e89-8a98-35fd77c29696",
        jenjangDiklat_id: item.latihanStrukturalId,
        nmDiklat: item.latihanStrukturalNama,
        noSertifikat: item.nomor,
        tglSertifikat: "",
        tglMulai: item.tanggal,
        tglSelesai: item.tanggalSelesai,
        tahun: item.tahun,
        penyelenggara: item.institusiPenyelenggara,
        jumlahJam: item.jumlahJam,
        angkatan: "",
        t4pelaksanaan: "",
      }));
      console.info("data BKN :", data);
      console.log("dtRwt : ", dtRwt);
      console.log("data diklat :", rwtDiklat);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const result = await fetch(
      `/api/pns/riwayat/diklat/${currentPNS.pegawaiId}/?id=${rwtIDSelect}`,
      {
        method: "DELETE",
      }
    );
    const data = await result.json();
    // console.log(data);
    if (result.ok) {
      toast("Delete Successfull !!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      setIsOpen(false);
      getDataRiwayat(currentPNS.pegawaiId);
    } else {
      console.log("message :", await data.json());
    }
  };

  const handleDeleteConfirmation = (
    id: string,
    diklat: string,
    sertifikat: string
  ) => {
    setIsOpen(true);
    setRwtIDSelect(id);
    setDataDeleteConfirmation({ id, diklat, sertifikat });
  };

  const handleDialogConfirmation = () => {
    setIsOpen(false);
  };

  const handleReceviedData = async (data: DataRwtDiklat) => {
    // console.log("received :", data);
    setFormData(data);
    // console.log("page :", data);
    if (data.id) {
      //update data
      // console.log("data update :", data);
      try {
        const response = await fetch(
          `/api/pns/riwayat/diklat/${currentPNS.pegawaiId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        console.log("respons di page diklat ", await response.json());
        if (response.body) {
          // console.log("upadated successfuly :", await response.json());
          toast("Updated Successfull !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          getDataRiwayat(currentPNS.pegawaiId);
          setToggelDetail((prev) => !prev);
        } else {
          // Jika terjadi kesalahan dalam menyimpan data, tangani di sini
          console.error("Gagal upadate data :", await response.json());
          toast("failed update !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        }
      } catch (error) {
        console.error("terjadi kesalahan update data:", error);
      }
      setToggelDetail(false);
    } else {
      // create data
      try {
        const response = await fetch(
          `/api/pns/riwayat/diklat/${currentPNS.pegawaiId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          console.log("data ok : ", await response.json());
          toast("Save Successfull !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          getDataRiwayat(currentPNS.pegawaiId);
          setToggelDetail((prev) => !prev);
        } else {
          // Jika terjadi kesalahan dalam menyimpan data, tangani di sini
          console.error("Gagal menyimpan data.", await response.json());
          toast("failed save !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        }
      } catch (error) {
        console.error("terjadi kesalahan create data:", error);
      }
    }
  };

  const handlePreview = (item: any) => {
    console.log("view dokument");
  };

  return (
    <>
      <DialogConfirmation
        isOpen={isOpen}
        onClose={handleDialogConfirmation}
        onDelete={handleDelete}
        title="Delete Confirmation"
        content={`Apakah anda yakin akan mengapus data riwayat diklat ${dataDeleteConfirmation.diklat}?`}
      />

      {toggelDetail && (
        <DetailDiklat
          handleToggle={onToggleClick}
          onDataReceived={handleReceviedData}
          sendData={rwtSelect}
        />
      )}

      <DetailData
        title="Riwayat Diklat"
        buttonAdd={true}
        onToggel={onToggleClick}
        onSync={onSyncClickFromBKN}
      >
        <div className="pt-3">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr onClick={() => {}}>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nama Diklat
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nomor Sertifikat
                </th>
                <th scope="col" className="px-4 py-3">
                  Tanggal Sertifikat
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rwtDiklat &&
                rwtDiklat.map((item: DataRwtDiklat, index: number) => (
                  <tr
                    key={index}
                    onClick={() => {}}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.nmDiklat}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.noSertifikat}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      {new Date(item.tglSertifikat).toLocaleDateString("id")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      -
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <DropdownMenuAction
                        title="Action"
                        onPreview={() => handlePreview(item)}
                        onClickEdit={() => handleShowDetail(item)}
                        onClickHapus={() =>
                          handleDeleteConfirmation(
                            item.id,
                            item.nmDiklat,
                            item.noSertifikat
                          )
                        }
                        onClickSync={() => handleSyncDiklatToBKN(item)}
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

export default RiwayatDiklat;
