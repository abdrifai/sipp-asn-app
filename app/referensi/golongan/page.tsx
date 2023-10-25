"use client";

import { toast } from "react-toastify";
import CardBoxButtonAdd from "@/app/components/cards/CardBoxButtonAdd";
import { useEffect, useState } from "react";
import DropdownActionTable from "@/app/components/dropdown/DropdownAction";
import FormInputGolongan from "./FormInputGol";

interface FormData {
  id: string;
  gol: string;
  pangkat: string;
}

const defaultFormData = {
  id: "",
  gol: "",
  pangkat: "",
};

const RefGolongan = () => {
  const [golongan, setgolongan] = useState([]);
  const [toggel, setToggel] = useState(false);
  const [golonganSelect, setGolonganSelect] = useState();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  // const [eselonIdSelect, setEselonIdSelect] = useState("");

  const getRefGolongan = async () => {
    const result = await fetch("/api/referensi/golongan");
    const data = await result.json();
    setgolongan(data.data);
  };

  useEffect(() => {
    getRefGolongan();
  }, []);

  const handleToggel = () => {
    setToggel((prev) => !prev);
  };

  const resetToDefault = () => {
    //     setRencIDSelect("");
    console.log("handle reset");
    setToggel((prev) => !prev);
  };

  const receviedData = async (data: FormData) => {
    setFormData(data);

    //     console.log("page :", data);

    if (data.id) {
      try {
        const response = await fetch(`/api/referensi/golongan`, {
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
          getRefGolongan();
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
        const response = await fetch("/api/referensi/golongan", {
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
          getRefGolongan();
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
    setGolonganSelect(item);
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

  return (
    <div className="container pt-8">
      <h1 className="font-bold text-gray-600 text-xl">Referensi Golongan</h1>
      {toggel && (
        <FormInputGolongan
          onClose={handleToggel}
          onDataReceived={receviedData}
          sendData={golonganSelect}
        />
      )}
      <CardBoxButtonAdd
        title="Daftar Golongan Ruang"
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
                <th scope="col" className="px-4 py-2">
                  Kode
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Golongan
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Pangkat
                </th>
                <th scope="col" className="px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {golongan &&
                golongan.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                    onClick={() => {}}
                  >
                    <td className="whitespace-nowrap px-6 py-2 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {item.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">{item.gol}</td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {item.pangkat}
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

export default RefGolongan;
