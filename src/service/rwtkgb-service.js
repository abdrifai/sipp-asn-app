
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const getByID = async (pegawaiId) => {
     // nip = validate(getPnsValidation, nip);

     try {
          const data = await prismaClient.RwtKGB.findMany({
               where: {
                    pegawai_id: pegawaiId
               },
               select: {
                    id: true,
                    sk: true,
                    tglSk: true,
                    tmtSk: true,
                    maskerThn: true,
                    maskerBln: true,
                    gapok: true,
                    pengesahan: true,
                    golongan: {
                         select: {
                              id: true,
                              gol: true,
                              pangkat: true,
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