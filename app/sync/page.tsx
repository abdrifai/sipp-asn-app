import Link from "next/link";
import ModalSearch from "../components/search/Modal-Search";
import Box from "./Box";

const content = {};

export default function SyncBKN() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid gap-3 text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        <Link
          href={"/sync/profile"}
          className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
        >
          <h2 className={`mb-3 text-2xl font-bold orange_gradient `}>
            Profile ASN
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Membandingkan data yang ada di Database Kabupaten dan Database BKN
          </p>
        </Link>
        <Link
          href={"/sync/riwayat"}
          className="group rounded-lg border  px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
        >
          <h2 className={`mb-3 text-2xl font-bold orange_gradient `}>
            Riwayat ASN
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Menampilkan data riwayat yang ada di Database BKN
          </p>
        </Link>
      </div>
    </section>
  );
}
