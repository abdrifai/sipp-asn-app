
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const getByID = async (pegawaiId) => {
     // nip = validate(getPnsValidation, nip);

     try {
          const data = await prismaClient.rwtJabatan.findMany({
               where: {
                    pegawai_id: pegawaiId
               },
               select: {
                    id: true,
                    sk: true,
                    tmtSk: true,
                    pengesahan: true,
                    jabatan: {
                         select: {
                              id: true,
                              nmJab: true
                         }
                    },
                    unorInduk: {
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
               },
               orderBy: {
                    tmtSk: 'desc'
               }

          })

          if (!data) {
               throw new ResponseError(404, 'riwayat golongan is not found');
          }

          return data;

     } catch (e) {
          throw new ResponseError(500, e)
     }
}

export default {
     getByID,
}