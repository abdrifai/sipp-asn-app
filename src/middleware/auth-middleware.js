import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
     const token = req.get('Authorization');
     if (!token) {
          res.status(401).json({
               errors: "Unauthrized"
          }).end();
     } else {
          const user = await prismaClient.user.findFirst({
               where: { token: token },
               select: {
                    username: true,
                    nama: true,
               }
          })

          if (!user) {
               res.status(401).json({
                    errors: "Unauthrized"
               }).end();
          } else {
               req.user = user;
               next();
          }
     }


}