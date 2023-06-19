"use client";

import { GrDocument } from "react-icons/gr";
import { ImUserTie } from "react-icons/im";
import { FaUserShield } from "react-icons/fa";
import { useRouter } from "next/navigation";
import MenuBoxIcons from "@/app/components/menu/MenuBoxIcons";

interface MenuBoxProps {}

const MenuDataUtama = () => {
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        <MenuBoxIcons
          label={"Data Pribadi"}
          icon={FaUserShield}
          onClick={() => router.push("/peremajaan/pns/datautama/datapribadi")}
        />
        <MenuBoxIcons
          label={"Jabatan & Gol"}
          icon={ImUserTie}
          onClick={() =>
            router.push("/peremajaan/pns/datautama/jabatangolongan")
          }
        />
        <MenuBoxIcons
          label={"Lainnya"}
          icon={GrDocument}
          onClick={() => router.push("/peremajaan/pns/datautama/lainnya")}
        />
      </div>
    </div>
  );
};

export default MenuDataUtama;
