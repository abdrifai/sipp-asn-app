import Link from "next/link";

const SyncPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center w-full">
      <div className="flex items-center justify-center  w-full py-4">
        <span className="text-2xl">
          Pilih salah satu riwayat, data yang ditampilkan adalah data riwayat
          dari Database BKN
        </span>
      </div>
    </div>
  );
};

export default SyncPage;
