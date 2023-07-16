import CardBox from "@/app/components/cards/CardBox";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DetailProps {
  handleToggle: () => void;
  RwtID?: string;
}

interface RwtGolDetail {
  id: string;
  maskerBln: string;
  maskerThn: string;
  pengesahan: string;
  pertekBkn: string;
  tglPertek: string;
  sk: string;
  tglSk: string;
  tmtSk: string;
  gapok: string;
  golongan: {
    gol: string;
    pangkat: string;
  };
  jenisKP: {
    id: string;
    jnskp: string;
  };
}

const DetailGolongan: React.FC<DetailProps> = ({ handleToggle, RwtID }) => {
  const [data, setData] = useState<RwtGolDetail[]>([]);
  const [refJenisKP, setRefJenisKP] = useState([]);
  const [selectedJenisKP, setSelectedJenisKP] = useState("");
  const [tglSK, setTglSK] = useState(new Date());
  const [tmtSK, setTmtSK] = useState(new Date());
  const [tglPertek, setTglPertek] = useState(new Date());

  const getRwtID = async (idRwt: any) => {
    try {
      const res = await fetch(`/api/pns/riwayat/detail/golongan/${idRwt}`);

      if (res.ok) {
        const data = await res.json();
        setData(data.data);
        setSelectedJenisKP(data.data[0].jenisKP.id);
        // console.log(data.data[0]);
        setTglSK(new Date(data.data[0].tglSk));
        setTmtSK(new Date(data.data[0].tmtSk));
        setTglPertek(new Date(data.data[0].tglPertek));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRefJenisKP = async () => {
    try {
      const res = await fetch(`/api/referensi/jenis-kp`);

      if (res.ok) {
        const data = await res.json();
        setRefJenisKP(data.data);
        // console.log(data.data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRefJenisKP();
    getRwtID(RwtID);
    // console.log(data);
  }, []);

  const handleChange = (event: any) => {
    setSelectedJenisKP(event.target.value);
  };

  return (
    <CardBox title="Rincian Golongan" onClose={handleToggle} footer={true}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jenis KP
          </label>
          <select
            value={selectedJenisKP}
            onChange={handleChange}
            id="jnsKP"
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih jenis KP</option>
            {refJenisKP &&
              refJenisKP?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.jnskp}
                </option>
              ))}
          </select>
        </div>
        <div className="col-span-4">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Golongan Ruang
          </label>
          <input
            value={data[0]?.golongan.gol}
            type="text"
            id="jnsKP"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Masa Kerja Tahun
          </label>
          <input
            value={data[0]?.maskerThn}
            type="text"
            id="jnsKP"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Masa Kerja Bulan
          </label>
          <input
            value={data[0]?.maskerBln}
            type="text"
            id="jnsKP"
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-4">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nomor SK
          </label>
          <input
            value={data[0]?.sk}
            type="text"
            id="jnsKP"
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
            selected={tglSK}
            onChange={(date) => setTglSK(date || new Date("00-00-0000"))}
            dateFormat={"dd/MM/yyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* <input
            value={new Date(data[0]?.tglSk).toLocaleDateString("id")}
            type="text"
            id="jnsKP"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
        </div>
        <div className="col-span-6">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            TMT SK
          </label>
          <DatePicker
            selected={tmtSK}
            onChange={(date) => setTmtSK(date || new Date("00-00-0000"))}
            dateFormat={"dd/MM/yyyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* <input
            value={new Date(data[0]?.tmtSk).toLocaleDateString("id")}
            type="text"
            id="jnsKP"
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
        </div>
        <div className="col-span-4">
          <label
            htmlFor="nopertek"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nomor Pertek BKN
          </label>
          <input
            value={data[0]?.pertekBkn}
            type="text"
            id="nopertek"
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
          <DatePicker
            selected={tglPertek}
            onChange={(date) => setTglPertek(date || new Date("00-00-0000"))}
            dateFormat={"dd/MM/yyyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* <input
            value={new Date(data[0]?.tglPertek).toLocaleDateString("id")}
            type="text"
            id="tglpertek"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
        </div>
        <div className="col-span-4">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gaji Pokok
          </label>
          <input
            value={(data[0]?.gapok || 0).toLocaleString()}
            type="text"
            id="jnsKP"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-8">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pejabat Yang Menetapkan
          </label>
          <input
            value={data[0]?.pengesahan}
            type="text"
            id="jnsKP"
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </CardBox>
  );
};

export default DetailGolongan;
