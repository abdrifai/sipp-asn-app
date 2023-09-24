"use client";

import CardBoxButtonAdd from "@/app/components/cards/CardBoxButtonAdd";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

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

interface FormRencanaProps {
  title?: string;
  footer?: boolean;
  border?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  onDataReceived?: (data: FormData) => void;
  sendId?: string;
  sendData?: any;
}

const FormInputGolongan: React.FC<FormRencanaProps> = ({
  onClose,
  onDataReceived,
  sendId,
  sendData,
}) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  useEffect(() => {
    //console.log(sendData);
    setFormData(sendData);
  }, [sendData]);

  const onSave = () => {
    if (onDataReceived) {
      onDataReceived(formData);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <CardBoxButtonAdd
      title="Data Tingkat Pendidikan"
      onClose={onClose}
      onSave={onSave}
      footer={true}
    >
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="col-span-12">
          <label
            htmlFor="tahun"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID
          </label>
          <input
            type="text"
            name="id"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData?.id}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-12">
          <label
            htmlFor="jnsDiklatId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tingkat Pendidikan
          </label>
          <input
            type="text"
            name="tktpend"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData?.tktpend}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-12">
          <label
            htmlFor="jenjangDiklatId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama
          </label>
          <input
            type="text"
            name="nama"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData?.nama}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-12">
          <label
            htmlFor="jenjangDiklatId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID BKN
          </label>
          <input
            type="text"
            name="id_bkn"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData?.id_bkn}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-12">
          <label
            htmlFor="jenjangDiklatId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Group
          </label>
          <input
            type="text"
            name="group_tk_pend_nm"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData?.group_tk_pend_nm}
            onChange={handleChange}
          />
        </div>
      </div>
    </CardBoxButtonAdd>
  );
};

export default FormInputGolongan;
