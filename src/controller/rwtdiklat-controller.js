import rwtdiklatService from "../service/rwtdiklat-service.js";

const getByID = async (req, res, next) => {
     try {
          const id = req.params.id;
          const result = await rwtdiklatService.getByID(id)
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