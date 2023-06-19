import pnsService from "../service/pns-service.js"

const getByNip = async (req, res, next) => {
     try {
          const nip = req.params.nip;
          if (nip !== null) {
               const result = await pnsService.getByNip(nip)
               res.status(200).json({
                    data: result
               })
          } else {
               res.status(200).json({
                    data: []
               })
          }

     } catch (e) {
          next(e)
     }
}

const search = async (req, res, next) => {
     try {
          const request = {
               nama: req.query.nama,
               nip: req.query.nip,
               page: req.query.page,
               size: req.query.size
          };

          const result = await pnsService.search(request);
          res.status(200).json({
               data: result.data,
               paging: result.paging
          })
     } catch (e) {
          next(e)
     }
}

export default {
     getByNip,
     search
}