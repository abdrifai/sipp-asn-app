"use client";

import { useRouter } from "next/navigation";
import MenuBoxIcons from "@/app/components/menu/MenuBoxIcons";
import { GiScales } from "react-icons/gi";
import {
  FaLayerGroup,
  FaAddressCard,
  FaBlind,
  FaBook,
  FaDumbbell,
  FaFemale,
  FaFlask,
  FaGlassCheers,
  FaHandHoldingHeart,
  FaHandRock,
  FaHandPaper,
  FaMapMarked,
  FaSortAmountUpAlt,
  FaUmbrella,
  FaUserGraduate,
} from "react-icons/fa";

const MenuRiwayat = () => {
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        <MenuBoxIcons
          label={"Pangkat & Gol"}
          icon={FaSortAmountUpAlt}
          onClick={() => router.push("/peremajaan/pns/riwayat/golongan")}
        />
        <MenuBoxIcons
          label={"Pendidikan"}
          icon={FaUserGraduate}
          onClick={() => router.push("/peremajaan/pns/riwayat/pendidikan")}
        />
        <MenuBoxIcons
          label={"Jabatan"}
          icon={FaAddressCard}
          onClick={() => router.push("/peremajaan/pns/riwayat/jabatan")}
        />
        <MenuBoxIcons
          label={"Diklat"}
          icon={FaLayerGroup}
          onClick={() => router.push("/peremajaan/pns/riwayat/diklat")}
        />
        <MenuBoxIcons
          label={"CPNS/PNS"}
          icon={FaFlask}
          onClick={() => router.push("/peremajaan/pns/riwayat/cpnspns")}
        />
        <MenuBoxIcons
          label={"Kedudukan Hukum"}
          icon={FaUmbrella}
          onClick={() => router.push("/peremajaan/pns/riwayat/kedudukanHukum")}
        />
        <MenuBoxIcons
          label={"Hukuman Disiplin"}
          icon={GiScales}
          onClick={() => router.push("/peremajaan/pns/riwayat/hukdis")}
        />
        <MenuBoxIcons
          label={"Cuti"}
          icon={FaGlassCheers}
          onClick={() => router.push("/peremajaan/pns/riwayat/cuti")}
        />
        <MenuBoxIcons
          label={"KGB"}
          icon={FaLayerGroup}
          onClick={() => router.push("/peremajaan/pns/riwayat/kgb")}
        />
        <MenuBoxIcons
          label={"Orang Tua"}
          icon={FaBlind}
          onClick={() => router.push("/peremajaan/pns/riwayat/orangtua")}
        />
        <MenuBoxIcons
          label={"Pasangan"}
          icon={FaHandHoldingHeart}
          onClick={() => router.push("/peremajaan/pns/riwayat/pasangan")}
        />
        <MenuBoxIcons
          label={"Anak"}
          icon={FaFemale}
          onClick={() => router.push("/peremajaan/pns/riwayat/anak")}
        />
        <MenuBoxIcons
          label={"Kinerja"}
          icon={FaBook}
          onClick={() => router.push("/peremajaan/pns/riwayat/kinerja")}
        />
        <MenuBoxIcons
          label={"SKP"}
          icon={FaMapMarked}
          onClick={() => router.push("/peremajaan/pns/riwayat/skp")}
        />
        <MenuBoxIcons
          label={"Angka Kredit"}
          icon={FaDumbbell}
          onClick={() => router.push("/peremajaan/pns/riwayat/angkakredit")}
        />
        <MenuBoxIcons
          label={"Tugas Belajar"}
          icon={FaHandRock}
          onClick={() => router.push("/peremajaan/pns/riwayat/tugasbelajar")}
        />
        <MenuBoxIcons
          label={"Izin Belajar"}
          icon={FaHandPaper}
          onClick={() => router.push("/peremajaan/pns/riwayat/izinbelajar")}
        />
      </div>
    </div>
  );
};

export default MenuRiwayat;
