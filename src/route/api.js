import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import pnsController from "../controller/pns-controller.js";
import userController from "../controller/user-controller.js";
import rwtgolonganController from "../controller/rwtgolongan-controller.js";
import rwtjabatanController from "../controller/rwtjabatan-controller.js";
import rwtcpnspnsController from "../controller/rwtcpnspns-controller.js";
import rwtdiklatController from "../controller/rwtdiklat-controller.js";
import rwtkgbController from "../controller/rwtkgb-controller.js";
import rwtpendidikanController from "../controller/rwtpendidikan-controller.js";


const userRouter = new express.Router();
// userRouter.use(authMiddleware);

//API User
userRouter.post('/api/users/current', userController.get);
userRouter.delete('/api/users/logout', userController.logout);

//API PNS
userRouter.get('/api/pns/:nip', pnsController.getByNip)
userRouter.post('/api/search-pns', pnsController.search)

//API Riwayat Golongan
userRouter.get('/api/riwayat/golongan/:id', rwtgolonganController.getByID)

//API Riwayat Jabatan
userRouter.get('/api/riwayat/jabatan/:id', rwtjabatanController.getByID)

//API Riwayat CPNS/PNS
userRouter.get('/api/riwayat/cpnspns/:id', rwtcpnspnsController.getByID)

//API Riwayat Diklat
userRouter.get('/api/riwayat/diklat/:id', rwtdiklatController.getByID)

//API Riwayat KGB
userRouter.get('/api/riwayat/kgb/:id', rwtkgbController.getByID)

//API Riwayat KGB
userRouter.get('/api/riwayat/pendidikan/:id', rwtpendidikanController.getByID)


export {
     userRouter
}
