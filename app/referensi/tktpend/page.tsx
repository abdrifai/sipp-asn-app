"use client";

import { toast } from "react-toastify";
import CardBoxButtonAdd from "@/app/components/cards/CardBoxButtonAdd";
import { useEffect, useState } from "react";
import DropdownActionTable from "@/app/components/dropdown/DropdownAction";
import FormInput from "./FormTktPend";

interface FormData {
  id: string;
  tktpend: string;
  id_bkn: string;
  nama: string;
  group_tk_pend_nm: string;
}

const defaultFormData = {
  id: "",
  tktpend: "",
  id_bkn: "",
  nama: "",
  group_tk_pend_nm: "",
};

const page = () => {
  const [tktPend, setTktPend] = useState([]);
  const [toggel, setToggel] = useState(false);
  const [tktPendSelect, setTktPendSelect] = useState();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  // const [eselonIdSelect, setEselonIdSelect] = useState("");

  const getRefTktPend = async () => {
    const result = await fetch("/api/referensi/tktpend");
    const data = await result.json();
    setTktPend(data.data);
  };

  useEffect(() => {
    getRefTktPend();
  }, []);

  const handleToggel = () => {
    setToggel((prev) => !prev);
  };

  const resetToDefault = () => {
    console.log("handle reset");
    setToggel((prev) => !prev);
  };

  const receviedData = async (data: FormData) => {
    setFormData(data);

    // console.log("page :", data);

    if (data.id) {
      try {
        const response = await fetch(`/api/referensi/tktpend`, {
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
          getRefTktPend();
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
        const response = await fetch("/api/referensi/tktpend", {
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
          getRefTktPend();
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
    setTktPendSelect(item);
  };

  const handleDelete = async (id: any) => {
    const result = await fetch(`/api/referensi/tktpend?id=${id}`, {
      method: "DELETE",
    });
    const data = await result.json();
    console.log(data.data == "OK");
    if (data.data === "OK") {
      toast("Delete Successfull !!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      getRefTktPend();
    }
  };

  return (
    <div className="container pt-8">
      <h1 className="font-bold text-gray-600 text-xl">
        Referensi Tingkat Pendidikan
      </h1>
      {toggel && (
        <FormInput
          onClose={handleToggel}
          onDataReceived={receviedData}
          sendData={tktPendSelect}
        />
      )}
      <CardBoxButtonAdd
        title="Daftar Tingkat Pendidikan"
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
                  Tkt Pend
                </th>
                <th scope="col" className="px-4 py-2 text-center">
                  ID BKN
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Nama
                </th>
                <th scope="col" className="px-4 py-2">
                  Group
                </th>
                <th scope="col" className="px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {tktPend &&
                tktPend.map((item: any, index: number) => (
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
                    <td className="whitespace-nowrap px-4 py-2">
                      {item.tktpend}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {item.id_bkn}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">{item.nama}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {item.group_tk_pend_nm}
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

export default page;
