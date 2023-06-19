import rwtcpnspnsService from "../service/rwtcpnspns-service.js";

const getByID = async (req, res, next) => {
     try {
          const id = req.params.id;
          const result = await rwtcpnspnsService.getByID(id)
          res.status(200).json({
               data: result
          })
     } catch (e) {
          next(e)
     }
}



export default {
     getByID
}