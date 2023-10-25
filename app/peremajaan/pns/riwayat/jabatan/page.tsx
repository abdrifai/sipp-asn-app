"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
import DetailData from "../BoxRiwayat";
import DetailJabatan from "./DetailJabatan";
import { toast } from "react-toastify";
import DropdownMenuAction from "@/app/components/dropdown/DropdownMenu";
import DialogConfirmation from "@/app/components/dialog/DialogConfirmation";

interface DataRwtJabatan {
  id: string;
  sk: string;
  tmtSk: string;
  pengesahan: string;
  jabatan: {
    id: string;
    nmJab: string;
  };
  unorInduk: {
    id: string;
    nmUnor: string;
  };
  subUnorSub: {
    id: string;
    nmUnor: string;
  };
}

const defaultFormData = {
  id: "",
  sk: "",
  tmtSk: "",
  pengesahan: "",
  jabatan: {
    id: "",
    nmJab: "",
  },
  unorInduk: {
    id: "",
    nmUnor: "",
  },
  subUnorSub: {
    id: "",
    nmUnor: "",
  },
};

interface DeleteRwt {
  id: string;
  jabatan: string;
  sk: string;
}

const RiwayatJabatan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataDeleteConfirmation, setDataDeleteConfirmation] =
    useState<DeleteRwt>({ id: "", jabatan: "", sk: "" });
  const currentPNS = useCurrentPNS();
  const [data, setData] = useState<DataRwtJabatan[]>([]);
  const [toggelDetail, setToggelDetail] = useState(false);
  const [formData, setFormData] = useState<DataRwtJabatan>(defaultFormData);
  const [rwtJabSelect, setRwtJabSelect] = useState(defaultFormData);
  const [rwtIDSelect, setRwtIDSelect] = useState("");

  const resetToDefault = () => {
    // setRwtGolonganSelect(defaultFormData);
    setToggelDetail((prev) => !prev);
  };

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
    getDataRiwayat("jabatan", currentPNS.pegawaiId);
  }, [currentPNS.pegawaiId]);

  const handleToggelDetail = () => {
    setToggelDetail((prev) => !prev);
  };

  const handleReceviedData = async (data: DataRwtJabatan) => {
    console.log("received :", data);
    setFormData(data);
    // console.log("page :", data);
    if (data.id) {
      //update data
      try {
        const response = await fetch(
          `/api/pns/riwayat/golongan/${currentPNS.pegawaiId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        console.log(await response.json());
        if (response.ok) {
          // console.log("upadated successfuly :", await response.json());
          toast("Updated Successfull !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          getDataRiwayat("golongan", currentPNS.pegawaiId);
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
        console.error("Terjadi kesalahan:", error);
      }
      setToggelDetail(false);
    } else {
      // create data
      try {
        const response = await fetch(
          `/api/pns/riwayat/golongan/${currentPNS.pegawaiId}`,
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
          getDataRiwayat("golongan", currentPNS.pegawaiId);
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
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  const handleSync = (item: any) => {
    console.log("sync", item);
  };

  const handleDeleteConfirmation = (
    id: string,
    jabatan: string,
    sk: string
  ) => {
    setIsOpen(true);
    setRwtIDSelect(id);
    setDataDeleteConfirmation({ id, jabatan, sk });
  };

  const handleDialogConfirmation = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    const result = await fetch(
      `/api/pns/riwayat/jabatan/${currentPNS.pegawaiId}/?id=${rwtIDSelect}`,
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
      getDataRiwayat("jabatan", currentPNS.pegawaiId);
    } else {
      console.log("message :", await data.json());
    }
  };

  return (
    <>
      <DialogConfirmation
        isOpen={isOpen}
        onClose={handleDialogConfirmation}
        onDelete={handleDelete}
        title="Delete Confirmation"
        content={`Apakah anda yakin akan mengapus data riwayat golongan ${dataDeleteConfirmation.jabatan}?`}
      />

      {toggelDetail && (
        <DetailJabatan
          handleToggle={handleToggelDetail}
          // onDataReceived={handleReceviedData}
          sendData={rwtJabSelect}
        />
      )}

      <DetailData
        title="Riwayat Jabatan"
        buttonAdd={true}
        onToggel={resetToDefault}
      >
        <div className="pt-3">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr onClick={() => {}}>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Jabatan
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Nomor SK
                </th>
                <th scope="col" className="px-4 py-3">
                  TMT
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Unit Organisasi
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Organisasi Induk
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item: DataRwtJabatan, index: number) => (
                  <tr
                    key={index}
                    onClick={() => {}}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
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
                    <td className="whitespace-nowrap px-4 py-3 text-left">
                      {item.subUnorSub.nmUnor}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-left">
                      {item.unorInduk.nmUnor}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-left"></td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <DropdownMenuAction
                        title="Action"
                        onClickEdit={() => {}}
                        onClickHapus={() =>
                          handleDeleteConfirmation(
                            item.id,
                            item.jabatan.nmJab,
                            item.sk
                          )
                        }
                        onClickSync={() => handleSync(item)}
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

export default RiwayatJabatan;
