import CardCount from "./components/cards/CardCount";
import Uploadfile from "./components/uploadfile";

type PnsCountType = {
  data: {
    pns_aktif: string;
  };
};

const getCountPNS = async () => {
  const result = await fetch(
    `${process.env.URL_BACKEND}/api/laporan/statitik/pns-aktif`
  );
  return result.json();
};

export default async function Home() {
  const res: PnsCountType = await getCountPNS();
  const pns_count = res?.data?.pns_aktif;
  const count = parseInt(pns_count || "0").toLocaleString();
  return (
    <div className="container pt-6">
      <h1 className="pb-2">Home Page</h1>
      <CardCount
        count={count}
        description="PNS Aktif Kab. Tojo Una-Una"
        bg_gradient="bg-gradient-to-r from-slate-300 via-slate-50 to-slate-300"
      />
      <div className="mt-10">
        <Uploadfile />
      </div>
    </div>
  );
}
