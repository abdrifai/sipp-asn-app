import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export const removeUserTest = async () => {
     await prismaClient.user.deleteMany({
          where: {
               username: 'test'
          }
     })
}

export const createUserTest = async () => {
     await prismaClient.user.create({
          data: {
               username: "test",
               password: await bcrypt.hash("password", 10),
               nama: "test",
               token: "test"
          }
     })
}