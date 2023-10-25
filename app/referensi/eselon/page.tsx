"use client";

import { toast } from "react-toastify";
import CardBoxButtonAdd from "@/app/components/cards/CardBoxButtonAdd";
import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import DropdownActionTable from "@/app/components/dropdown/DropdownAction";

interface FormData {
  id: string;
  eselon: string;
  id_bkn: string | null;
  jabatan_asn: string | null;
}

const defaultFormData = {
  id: "",
  eselon: "",
  id_bkn: "",
  jabatan_asn: "",
};

const RefEselon = () => {
  const [eselon, setEselon] = useState([]);
  const [toggel, setToggel] = useState(false);
  const [eselonSelect, setEselonSelect] = useState();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [eselonIdSelect, setEselonIdSelect] = useState("");

  const getRefEselon = async () => {
    const result = await fetch("/api/referensi/eselon");
    const data = await result.json();
    setEselon(data.data);
  };

  useEffect(() => {
    getRefEselon();
  }, []);

  const handleToggel = () => {
    setToggel((prev) => !prev);
  };

  const resetToDefault = () => {
    //     setRencIDSelect("");
    console.log("handle reset");
    setToggel((prev) => !prev);
  };

  const handleDelete = async (id: any) => {
    //     const result = await fetch(`/api/diklat/perencanaan?id=${id}`, {
    //       method: "DELETE",
    //     });
    //     const data = await result.json();
    //     console.log(data.data == "OK");
    //     if (data.data === "OK") {
    //       toast("Delete Successfull !!", {
    //         hideProgressBar: true,
    //         autoClose: 2000,
    //         type: "success",
    //       });
    //       getRencDiklat();
    //     }
  };

  const receviedData = async (data: FormData) => {
    setFormData(data);

    //     console.log("page :", data);

    if (data.id) {
      try {
        const response = await fetch(`/api/referensi/eselon`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // console.log("upadated successfuly :", await response.json());
          toast("Updated Successfull !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          getRefEselon();
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

      setToggel(false);
    } else {
      // console.log("id kosong");
      try {
        // Panggil API untuk menyimpan data
        const response = await fetch("/api/referensi/eselon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast("Save Successfull !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          getRefEselon();
        } else {
          // Jika terjadi kesalahan dalam menyimpan data, tangani di sini
          console.error("Gagal menyimpan data.");
          toast("failed save !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }

      setToggel(false);
    }
  };

  const handleShowDetail = async (item: any) => {
    setToggel(true);
    setEselonSelect(item);
  };

  return (
    <div className="container pt-8">
      <h1 className="font-bold text-gray-600 text-xl">Referensi Eselon</h1>
      {toggel && (
        <FormInput
          onClose={handleToggel}
          onDataReceived={receviedData}
          sendData={eselonSelect}
        />
      )}
      <CardBoxButtonAdd
        title="Daftar Referensi Eselon"
        buttonAdd={true}
        onToggel={resetToDefault}
      >
        <div className="pt-3">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-4 py-2 text-center">
                  No
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Eselon
                </th>
                <th scope="col" className="px-4 py-2">
                  Jabatan ASN
                </th>
                <th scope="col" className="px-4 py-2">
                  ID BKN
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  Keterangan
                </th>
                <th scope="col" className="px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {eselon &&
                eselon.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                    onClick={() => {}}
                  >
                    <td className="whitespace-nowrap px-6 py-2 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {item.eselon}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {item.jabatan_asn}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {item.id_bkn}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      -
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      <DropdownActionTable
                        title="Action"
                        onClickEdit={() => handleShowDetail(item)}
                        onClickHapus={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardBoxButtonAdd>
    </div>
  );
};

export default RefEselon;
