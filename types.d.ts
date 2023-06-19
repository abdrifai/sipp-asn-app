import { type } from "os";

type PnsModelSimpeg = {
     id: string;
     orangId: string;
     nik: string;
     nipBaru: string;
     nipLama: string;
     kedudukanPns_id: number;
     spns_id: string;
     karpeg: string;
     taspen: string;
     bpjs: string;
     created_at: Date;
     updated_at: Date;
     rwtJab_id: string;
     rwtGol_id: string;
     rwtPend_id: string;
     rwtDiklat_id: string;
     spmt: string;
     pns_id_sapk: string;
     spns: {
          spns: string;
     },
     kedudukanPNS: {
          kedudukanpns: string;
     }
     orang: {
          nama: string;
          tglLhr: string,
          t4Lhr: string,
          kk: string,
          nik: string,
          npwp: string,
          email: string,
          no_hp: string,
          akte_kelahiran: string,
          alamat: string,
          agama: {
               agama: string
          },
          jkl: {
               jkl: string
          }
     };
     lastJabatan: {
          jabatan: {
               nmJab: string
          },
          unorInduk: {
               id: string,
               nmUnor: string
          },
          unor: {
               id: string,
               nmUnor: string
          },
          subUnor: {
               id: string,
               nmUnor: string
          }
          subUnorSub: {
               id: string,
               nmUnor: string
          }
     };
     lastGolongan: {
          golongan: {
               gol: string,
               pangkat: string
          }
     };
     lastDiklat: {
          id: string,
          jnsDiklat_id: string,
          jenjangDiklat_id: string,
          noSertifikat: string,
          tglSertifikat: string,
          nmDiklat: string,
          penyelenggara: string,
          angkatan: string,
          t4pelaksanaan: string,
     };
     lastPendidikan: {
          id: string,
          ReferensiTktPendidikan: {
               id: string,
               tktpend: string
          },
          ReferensiPendidikan: {
               id: string,
               pend: string
          },
          noIjazah: string,
          tglIjazah: string,
          thnLulus: string,
          nmSekolah: string,
          jurusan: string,
          gd: string,
          gb: string,
          pengesahan: string,
     }
};


type PnsModelSIASN = {
     agama: string;
     akteKelahiran: string;
     akteMeninggal: string;
     alamat: string;
     bahasa: string;
     bpjs: string;
     email: string;
     emailGov: string;
     eselon: string;
     eselonId: string;
     eselonLevel: string;
     gajiPokok: string;
     gelarBelakang: string;
     gelarDepan: string;
     golRuangAkhir: string;
     golRuangAkhirId: string;
     golRuangAwal: string;
     golRuangAwalId: string;
     id: string;
     bupPensiun: string;
     instansiIndukId: string;
     instansiIndukNama: string;
     instansiKerjaId: string;
     instansiKerjaKodeCepat: string;
     instansiKerjaNama: string;
     jabatanAsn: string;
     jabatanFungsionalId: string;
     jabatanFungsionalNama: string;
     jabatanFungsionalUmumNama: string;
     jabatanNama: string;
     jabatanStrukturalNama: string;
     jenisIdDokumenId: string;
     jenisIdDokumenNama: string;
     jenisJabatan: string;
     jenisJabatanId: string;
     jenisKawinId: string;
     jenisKelamin: string;
     jenisPegawaiId: string;
     jenisPegawaiNama: string;
     jenjang: string;
     jumlahAnak: string;
     jumlahIstriSuami: string;
     kanregId: string;
     kanregNama: string;
     kartuAsn: string;
     kedudukanPnsId: string;
     kedudukanPnsNama: string;
     kodePos: string;
     kpknId: string;
     kpknNama: string;
     kppnNama: string;
     ktuaId: string;
     ktuaNama: string;
     lokasiKerja: string;
     masaKerja: string;
     mkBulan: string;
     mkTahun: string;
     nama: string;
     nik: string;
     nipBaru: string;
     nipLama: string;
     noAskes: string;
     noHp: string;
     noNpwp: string;
     noSeriKarpeg: string;
     noSpmt: string;
     noSuratKeteranganBebasNarkoba: string;
     noSuratKeteranganDokter: string;
     noTaspen: string;
     noTelp: string;
     nomorIdDocument: string;
     nomorSkCpns: string;
     nomorSkPns: string;
     nomorSttpl: string;
     pangkatAkhir: string;
     pendidikanTerakhirId: string;
     pendidikanTerakhirNama: string;
     satuanKerjaIndukId: string;
     satuanKerjaIndukNama: string;
     satuanKerjaKerjaId: string;
     satuanKerjaKerjaNama: string;
     skck: string;
     statusHidup: string;
     statusPegawai: string;
     statusPerkawinan: string;
     tahunLulus: string;
     taspenId: string;
     taspenNama: string;
     tempatLahir: string;
     tglLahir: string;
     tglMeninggal: string;
     tglNpwp: string;
     tglSkCpns: string;
     tglSkPns: string;
     tglSkck: string;
     tglSttpl: string;
     tglSuratKeteranganBebasNarkoba: string;
     tglSuratKeteranganDokter: string;
     tkPendidikanTerakhir: string;
     tkPendidikanTerakhirId: string;
     tmtCpns: string;
     tmtEselon: string;
     tmtGolAkhir: string;
     tmtJabatan: string;
     tmtPns: string;
     unorId: string;
     unorIndukId: string;
     unorIndukNama: string;
     unorNama: string;
};