"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-row justify-between items-center border-2 p-2 rounded-lg">
        <div>Data Lainnya</div>
        <button
          className="bg-green-200 px-3 py-2 rounded-lg hover:font-semibold hover:bg-green-500 hover:text-white transition"
          onClick={() => router.push("/peremajaan/pns")}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Page;
