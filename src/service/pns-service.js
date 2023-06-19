
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getPnsValidation, searchPNSValidation } from "../validation/pns-validation.js"
import { validate } from "../validation/validation.js";

const getByNip = async (nip) => {
     nip = validate(getPnsValidation, nip);

     try {
          const pns = await prismaClient.pns.findMany({
               where: {
                    nipBaru: nip
               },
               select: {
                    id: true,
                    nik: true,
                    nipBaru: true,
                    nipLama: true,
                    kedudukanPns_id: true,
                    spns_id: true,
                    karpeg: true,
                    taspen: true,
                    bpjs: true,
                    spmt: true,
                    pns_id_sapk: true,
                    spns: {
                         select: {
                              spns: true,
                         }
                    },
                    kedudukanPNS: {
                         select: {
                              kedudukanpns: true,
                         }
                    },
                    orang: {
                         select: {
                              nama: true,
                              tglLhr: true,
                              t4Lhr: true,
                              kk: true,
                              nik: true,
                              no_hp: true,
                              email: true,
                              akte_kelahiran: true,
                              alamat: true,
                              agama: {
                                   select: {
                                        agama: true
                                   }
                              },
                              jkl: {
                                   select: {
                                        jkl: true
                                   }
                              }
                         }
                    },
                    lastJabatan: {
                         select: {
                              refJabatanId: true,
                              jabatan: {
                                   select: {
                                        nmJab: true
                                   }
                              },
                              unorInduk: {
                                   select: {
                                        id: true,
                                        nmUnor: true
                                   }
                              },
                              unor: {
                                   select: {
                                        id: true,
                                        nmUnor: true
                                   }
                              },
                              subUnor: {
                                   select: {
                                        id: true,
                                        nmUnor: true
                                   }
                              },
                              subUnorSub: {
                                   select: {
                                        id: true,
                                        nmUnor: true
                                   }
                              }
                         }
                    },
                    lastGolongan: {
                         select: {
                              golongan: {
                                   select: {
                                        gol: true,
                                        pangkat: true
                                   }
                              }
                         }
                    },
                    lastDiklat: {
                         select: {
                              id: true,
                              jnsDiklat_id: true,
                              jenjangDiklat_id: true,
                              noSertifikat: true,
                              tglSertifikat: true,
                              nmDiklat: true,
                              penyelenggara: true,
                              angkatan: true,
                              t4pelaksanaan: true,
                              user_updated: true,
                         }
                    },
                    lastPendidikan: {
                         select: {
                              id: true,
                              ReferensiTktPendidikan: {
                                   select: {
                                        id: true,
                                        tktpend: true
                                   }
                              },
                              ReferensiPendidikan: {
                                   select: {
                                        id: true,
                                        pend: true
                                   }
                              },
                              noIjazah: true,
                              tglIjazah: true,
                              thnLulus: true,
                              nmSekolah: true,
                              jurusan: true,
                              gd: true,
                              gb: true,
                              pengesahan: true,
                              user_created: true,
                              user_updated: true
                         }
                    }
               }
          })

          if (!pns) {
               throw new ResponseError(404, 'nip is not found');
          }

          return pns;

     } catch (e) {
          throw new ResponseError(500, e)
     }
}

//search nip or nama
const search = async (request) => {
     request = validate(searchPNSValidation, request);

     const skip = (request.page - 1) * request.size;

     const pns = await prismaClient.pns.findMany({
          where: {
               OR: [
                    {
                         nipBaru: { contains: request.nip }
                    },
                    {
                         orang: {
                              nama: {
                                   contains: request.nama
                              }
                         }
                    }
               ]
          },
          select: {
               id: true,
               nipBaru: true,
               nipLama: true,
               nik: true,
               orang: {
                    select: {
                         nama: true,
                         t4Lhr: true,
                         tglLhr: true
                    }
               }
          },
          take: request.size,
          skip: skip
     })

     const totalItems = await prismaClient.pns.count({
          where: {
               OR: [
                    {
                         nipBaru: {
                              contains: request.nip
                         }
                    },
                    {
                         orang: {
                              nama: {
                                   contains: request.nama
                              }
                         }
                    }
               ]
          }
     })

     return {
          data: pns,
          paging: {
               page: request.page,
               total_item: totalItems,
               total_page: Math.ceil(totalItems / request.size)
          }
     }

}

export default {
     getByNip,
     search
}