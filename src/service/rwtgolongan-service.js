
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const getByID = async (pegawaiId) => {
     // nip = validate(getPnsValidation, nip);

     try {
          const data = await prismaClient.rwtGolongan.findMany({
               where: {
                    pegawai_id: pegawaiId
               },
               select: {
                    sk: true,
                    tglSk: true,
                    tmtSk: true,
                    pertekBkn: true,
                    tglPertek: true,
                    golongan: {
                         select: {
                              gol: true,
                              pangkat: true
                         }
                    }
               },
               orderBy: {
                    tmtSk: 'desc'
               }

          });

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