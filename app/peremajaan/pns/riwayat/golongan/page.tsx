"use client";

import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import { useEffect, useState } from "react";
import DetailData from "../BoxRiwayat";
import DetailGolongan from "./DetailGolongan";
import DropdownMenuAction from "@/app/components/dropdown/DropdownMenu";
import DialogConfirmation from "@/app/components/dialog/DialogConfirmation";
import { toast } from "react-toastify";

interface DataRwtGolongan {
  id: string;
  maskerBln: string;
  maskerThn: string;
  pengesahan: string;
  pertekBkn: string;
  tglPertek: string;
  sk: string;
  tglSk: string;
  tmtSk: string;
  gapok: number;
  golongan: {
    id: string;
    gol: string;
    pangkat: string;
  };
  jenisKP: {
    id: string;
    jnskp: string;
  };
}

const defaultFormData = {
  id: "",
  maskerBln: "",
  maskerThn: "",
  pengesahan: "",
  pertekBkn: "",
  tglPertek: "",
  sk: "",
  tglSk: "",
  tmtSk: "",
  gapok: 0,
  golongan: {
    id: "",
    gol: "",
    pangkat: "",
  },
  jenisKP: {
    id: "",
    jnskp: "",
  },
};

interface DeleteRwt {
  id: string;
  gol: string;
  sk: string;
}

const RiwayatGolongan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataDeleteConfirmation, setDataDeleteConfirmation] =
    useState<DeleteRwt>({ gol: "", id: "", sk: "" });
  const currentPNS = useCurrentPNS();
  const [toggelDetail, setToggelDetail] = useState(false);
  const [rwtGolongan, setRwtGolongan] = useState([]);
  const [rwtGolonganSelect, setRwtGolonganSelect] = useState(defaultFormData);
  const [formData, setFormData] = useState<DataRwtGolongan>(defaultFormData);
  const [rwtIDSelect, setRwtIDSelect] = useState("");

  const getDataRiwayat = async (pegawaiID: string) => {
    try {
      const response = await fetch(`/api/pns/riwayat/golongan/${pegawaiID}`);

      if (response.ok) {
        const data = await response.json();
        // console.log(data.data);
        setRwtGolongan(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDataRiwayat(currentPNS.pegawaiId);
  }, [currentPNS.pegawaiId]);

  const handleToggelDetail = () => {
    setToggelDetail((prev) => !prev);
  };

  const resetToDefault = () => {
    // setRencIDSelect("");
    // console.log("handle reset");
    setRwtGolonganSelect(defaultFormData);
    setToggelDetail((prev) => !prev);
  };

  const handleShowDetail = async (item: any) => {
    setToggelDetail(true);
    setRwtGolonganSelect(item);
    // console.log(item);
  };

  const handleDeleteConfirmation = (id: string, gol: string, sk: string) => {
    setIsOpen(true);
    setRwtIDSelect(id);
    setDataDeleteConfirmation({ id, gol, sk });
  };

  const handleDelete = async () => {
    const result = await fetch(
      `/api/pns/riwayat/golongan/${currentPNS.pegawaiId}/?id=${rwtIDSelect}`,
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

  const handleReceviedData = async (data: DataRwtGolongan) => {
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
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  const handleDialogConfirmation = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DialogConfirmation
        isOpen={isOpen}
        onClose={handleDialogConfirmation}
        onDelete={handleDelete}
        title="Delete Confirmation"
        content={`Apakah anda yakin akan mengapus data riwayat golongan ${dataDeleteConfirmation.gol}?`}
      />

      {toggelDetail && (
        <DetailGolongan
          handleToggle={handleToggelDetail}
          onDataReceived={handleReceviedData}
          sendData={rwtGolonganSelect}
        />
      )}

      <DetailData
        title="Riwayat Golongan"
        buttonAdd={true}
        onToggel={resetToDefault}
      >
        <div className="pt-3">
          <table className="table-auto min-w-full">
            <thead className="border-b text-slate-500 font-medium dark:border-neutral-500">
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
                <th scope="col" className="px-4 py-2 text-left">
                  Keterangan
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {rwtGolongan &&
                rwtGolongan.map((item: any, index: number) => (
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
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      <DropdownMenuAction
                        title="Action"
                        onClickEdit={() => handleShowDetail(item)}
                        onClickHapus={() =>
                          handleDeleteConfirmation(
                            item.id,
                            item.golongan.gol,
                            item.sk
                          )
                        }
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
