"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mt-3 flex flex-row justify-between items-center border-2 p-2 rounded-lg">
        <div>Data Pribadi</div>
        <button
          className="bg-slate-100 px-3 py-2 rounded-lg hover:font-semibold hover:bg-sky-200 hover:text-black transition"
          onClick={() => router.push("/peremajaan/pns")}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Page;
