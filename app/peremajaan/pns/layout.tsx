import CariASN from "@/app/components/CariASN";
import InfoPanel from "@/app/components/InfoPanel";
import ModalCompare from "@/app/components/modal/ModalCompare";
import ModalSearch from "@/app/components/search/Modal-Search";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container pt-4">
      Peremajaan/PNS
      <InfoPanel />
      <ModalCompare />
      <div>{children}</div>
    </div>
  );
}
