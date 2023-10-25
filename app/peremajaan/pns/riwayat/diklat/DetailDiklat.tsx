import CardBox from "@/app/components/cards/CardBox";
import { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import useCurrentPNS from "@/app/hooks/useCurrentPNS";
import "react-datepicker/dist/react-datepicker.css";

interface DetailProps {
  handleToggle: () => void;
  onDataReceived?: (data: RwtDiklat) => void;
  rwtID?: string;
  sendData?: any;
}

interface RwtDiklat {
  id: string;
  nipBaru: string;
  jnsDiklat_id: string;
  jenjangDiklat_id: string;
  nmDiklat: string;
  noSertifikat: string;
  tglSertifikat: string;
  jumlahJam: string;
  tglMulai: string;
  tglSelesai: string;
  penyelenggara: string;
  angkatan: string;
  t4pelaksanaan: string;
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
  tglMulai: "",
  tglSelesai: "",
  angkatan: "",
  t4pelaksanaan: "",
};

const DetailDiklat: React.FC<DetailProps> = ({
  handleToggle,
  onDataReceived,
  sendData,
  rwtID,
}) => {
  const currentPNS = useCurrentPNS();
  const [refJenisDiklat, setRefJenisDiklat] = useState([]);
  const [jenjangDiklat, setJenjangDiklat] = useState([]);
  const [refJab, setRefJab] = useState([]);
  const [formData, setFormData] = useState<RwtDiklat>(defaultFormData);

  const getRefJenisDiklat = async () => {
    try {
      const res = await fetch(`/api/referensi/jenis-diklat`);

      if (res.ok) {
        const data = await res.json();
        setRefJenisDiklat(data.data);
        // console.log(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRefJenjangDiklat = async (id: any) => {
    const response = await fetch(`/api/referensi/jenjang-diklat/${id}`);
    const data = await response.json();
    setJenjangDiklat(data.data);
    // console.log(data);
  };

  useEffect(() => {
    getRefJenisDiklat();
    if (sendData.jnsDiklat_id) {
      getRefJenjangDiklat(sendData?.jnsDiklat_id);
    }
    setFormData(sendData);
    // console.log(sendData);
  }, [sendData]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "jnsDiklat_id") {
      getRefJenjangDiklat(value);
    }
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const onSave = () => {
    if (onDataReceived) {
      const nipBaru = currentPNS.NIP;
      const updatedFormData = {
        ...formData,
        nipBaru: nipBaru,
      };

      // Kemudian, memanggil onDataReceived dengan data yang diperbarui
      onDataReceived(updatedFormData);
    }
  };

  return (
    <CardBox
      title="Rincian Diklat"
      onClose={handleToggle}
      footer={true}
      onSave={onSave}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <label
            htmlFor="jenisKP.id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jenis Diklat
          </label>
          <select
            value={formData?.jnsDiklat_id}
            onChange={handleChange}
            name="jnsDiklat_id"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Jenis Jabatan</option>
            {refJenisDiklat &&
              refJenisDiklat?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.jnsDiklat}
                </option>
              ))}
          </select>
        </div>
        <div className="col-span-6">
          <label
            htmlFor="jenisKP.id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jenjang Diklat
          </label>
          <select
            value={formData?.jenjangDiklat_id}
            onChange={handleChange}
            name="jenjangDiklat_id"
            className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Jenjang Diklat</option>
            {jenjangDiklat &&
              jenjangDiklat?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.jenjangDiklat}
                </option>
              ))}
          </select>
        </div>
        <div className="col-span-4">
          <label
            htmlFor="sk"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nomor Sertifikat
          </label>
          <input
            value={formData?.noSertifikat}
            onChange={handleChange}
            type="text"
            name="noSertifikat"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal Sertifikat
          </label>
          <DatePicker
            name="tglSertifikat"
            selected={
              formData?.tglSertifikat ? new Date(formData?.tglSertifikat) : null
            }
            onChange={(date) =>
              setFormData((prevData) => ({
                ...prevData,
                tglSertifikat: date ? date.toISOString() : "",
              }))
            }
            dateFormat={"dd/MM/yyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jumlah Jam
          </label>
          <input
            value={formData?.jumlahJam}
            onChange={handleChange}
            type="text"
            name="jumlahJam"
            className="w-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="nmDiklat"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Diklat
          </label>
          <input
            value={formData?.nmDiklat}
            onChange={handleChange}
            type="text"
            name="nmDiklat"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="angkatan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Angkatan
          </label>
          <input
            value={formData?.angkatan}
            onChange={handleChange}
            type="text"
            name="angkatan"
            className="w-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="tglMulai"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal Mulai
          </label>
          <DatePicker
            name="tglMulai"
            selected={formData?.tglMulai ? new Date(formData?.tglMulai) : null}
            onChange={(date) =>
              setFormData((prevData) => ({
                ...prevData,
                tglMulai: date ? date.toISOString() : "",
              }))
            }
            dateFormat={"dd/MM/yyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="angkatan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal Selesai
          </label>
          <DatePicker
            name="tglSelesai"
            selected={
              formData?.tglSelesai ? new Date(formData?.tglSelesai) : null
            }
            onChange={(date) =>
              setFormData((prevData) => ({
                ...prevData,
                tglSelesai: date ? date.toISOString() : "",
              }))
            }
            dateFormat={"dd/MM/yyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="col-span-3">
          <label
            htmlFor="pengesahan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tempat Pelaksanaan
          </label>
          <input
            value={formData?.t4pelaksanaan}
            onChange={handleChange}
            type="text"
            name="t4pelaksanaan"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="pengesahan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Penyelenggara
          </label>
          <input
            value={formData?.penyelenggara}
            onChange={handleChange}
            type="text"
            name="penyelenggara"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </CardBox>
  );
};

export default DetailDiklat;
