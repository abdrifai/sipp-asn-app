
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const getByID = async (pegawaiId) => {
     // nip = validate(getPnsValidation, nip);

     try {
          const data = await prismaClient.RwtCpnsPns.findMany({
               where: {
                    pegawai_id: pegawaiId
               },
               select: {
                    id: true,
                    sk: true,
                    tglsk: true,
                    tmtsk: true,
                    pertekBkn: true,
                    tglPertekBkn: true,
                    status: {
                         select: {
                              spns: true
                         }
                    }
               },
               orderBy: {
                    tmtsk: 'desc'
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