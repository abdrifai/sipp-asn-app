import CardBox from "@/app/components/cards/CardBox";
import { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DetailProps {
  handleToggle: () => void;
  onDataReceived?: (data: RwtJabDetail) => void;
  rwtID?: string;
  sendData?: any;
}

interface RwtJabDetail {
  id: string;
  sk: string;
  tmtSk: string;
  pengesahan: string;
  jnsJabId: string;
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
  jnsJabId: "",
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

const DetailJabatan: React.FC<DetailProps> = ({
  handleToggle,
  onDataReceived,
  sendData,
  rwtID,
}) => {
  const [refJenisJab, setRefJenisJab] = useState([]);
  const [refJab, setRefJab] = useState([]);
  const [formData, setFormData] = useState<RwtJabDetail>(defaultFormData);

  const getRefJenisJabatan = async () => {
    try {
      const res = await fetch(`/api/referensi/jenisjab`);

      if (res.ok) {
        const data = await res.json();
        setRefJenisJab(data.data);
        // console.log(data.data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const getRefGolongan = async () => {
  //   try {
  //     const res = await fetch(`/api/referensi/golongan`);

  //     if (res.ok) {
  //       const data = await res.json();
  //       setRefGolongan(data.data);
  //       // console.log(data.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getRefJenisJabatan();
    // getRefGolongan();
    setFormData(sendData);
    // console.log(sendData);
  }, [sendData]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const onSave = () => {
    console.log("save ok");
    if (onDataReceived) {
      onDataReceived(formData);
    }
  };

  return (
    <CardBox
      title="Rincian Jabatan"
      onClose={handleToggle}
      footer={true}
      onSave={onSave}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <label
            htmlFor="jenisKP.id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jenis Jabatan
          </label>
          <select
            value={formData?.jnsJabId}
            onChange={handleChange}
            name="jenisKP.id"
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Jenis Jabatan</option>
            {refJenisJab &&
              refJenisJab?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.jnsjab}
                </option>
              ))}
          </select>
        </div>
        <div className="col-span-4">
          <label
            htmlFor="golongan.id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Golongan Ruang
          </label>
          {/* <select
            value={formData?.golongan.id}
            onChange={handleChange}
            name="golongan.id"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Golongan Ruang</option>
            {refGolongan &&
              refGolongan?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.gol} , {item.pangkat}
                </option>
              ))}
          </select> */}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="maskerThn"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Masa Kerja Tahun
          </label>
          {/* <input
            value={formData?.maskerThn}
            onChange={handleChange}
            type="text"
            name="maskerThn"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
        </div>
        <div className="col-span-6">
          <label
            htmlFor="maskerBln"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Masa Kerja Bulan
          </label>
          <input
            // value={formData?.maskerBln}
            onChange={handleChange}
            type="text"
            name="maskerBln"
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-4">
          <label
            htmlFor="sk"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nomor SK
          </label>
          <input
            value={formData?.sk}
            onChange={handleChange}
            type="text"
            name="sk"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal SK
          </label>
          <DatePicker
            name="tglSk"
            // selected={formData?.tglSk ? new Date(formData?.tglSk) : null}
            onChange={(date) =>
              setFormData((prevData) => ({
                ...prevData,
                tglSk: date ? date.toISOString() : "",
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
            TMT SK
          </label>
          <DatePicker
            name="tmtSk"
            selected={formData?.tmtSk ? new Date(formData?.tmtSk) : null}
            onChange={(date) =>
              setFormData((prevData) => ({
                ...prevData,
                tmtSk: date ? date.toISOString() : "",
              }))
            }
            dateFormat={"dd/MM/yyyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="col-span-4">
          <label
            htmlFor="pertekBkn"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nomor Pertek BKN
          </label>
          <input
            // value={formData?.pertekBkn}
            onChange={handleChange}
            type="text"
            name="pertekBkn"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-8">
          <label
            htmlFor="tglpertek"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal Pertek BKN
          </label>
          {/* <DatePicker
            name="tglPertek"
            selected={
              formData?.tglPertek ? new Date(formData?.tglPertek) : null
            }
            onChange={(date) =>
              setFormData((prevData) => ({
                ...prevData,
                tglPertek: date ? date.toISOString() : "",
              }))
            }
            dateFormat={"dd/MM/yyyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoComplete="off"
          /> */}
        </div>
        <div className="col-span-4">
          <label
            htmlFor="gapok"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gaji Pokok
          </label>
          <input
            // value={(formData?.gapok || 0).toLocaleString()}
            onChange={handleChange}
            type="text"
            name="gapok"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-8">
          <label
            htmlFor="pengesahan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pejabat Yang Menetapkan
          </label>
          <input
            value={formData?.pengesahan}
            onChange={handleChange}
            type="text"
            name="pengesahan"
            className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </CardBox>
  );
};

export default DetailJabatan;
