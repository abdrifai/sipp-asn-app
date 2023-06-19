// import supertest from "supertest";
// import { logger } from "../src/application/logging";
// import { web } from "../src/application/web.js"
// import { createUserTest, removeUserTest } from "./use-util";

// describe('POST /api/users', function () {

//      afterEach(async () => {
//           await createUserTest()
//      });

//      it('should can register new user', async () => {
//           const result = await supertest(web)
//                .post('/api/users')
//                .send({
//                     username: "test",
//                     password: "password",
//                     nama: "test",
//                });


//           expect(result.status).toBe(200);
//           expect(result.body.data.username).toBe('test');
//           expect(result.body.data.nama).toBe("test");

//      });

//      it('should reject if request is invalid', async () => {
//           const result = await supertest(web)
//                .post('/api/users')
//                .send({
//                     username: "",
//                     password: "",
//                     nama: "",
//                });

//           logger.info(result.body)

//           expect(result.status).toBe(400);
//           expect(result.body.errors).toBeDefined();

//      });

//      it('should reject if username already registered', async () => {
//           let result = await supertest(web)
//                .post('/api/users')
//                .send({
//                     username: "tes_user",
//                     password: "tes",
//                     nama: "abd. rifai",
//                });


//           expect(result.status).toBe(200);
//           expect(result.body.data.username).toBe('tes_user');
//           expect(result.body.data.name).toBe("abd. rifai")

//           result = await supertest(web)
//                .post('/api/users')
//                .send({
//                     username: "tes_user",
//                     password: "tes",
//                     name: "abd. rifai",
//                });

//           logger.info(result.body)

//           expect(result.status).toBe(400);
//           expect(result.error).toBeDefined();

//      });
// });

// describe('POST /api/users/login', function () {
//      beforeEach(async () => {
//           await createUserTest();
//      })

//      afterEach(async () => {
//           await removeUserTest();
//      })

//      it('should can login', async () => {
//           const result = await supertest(web)
//                .post('/api/users/login')
//                .send({
//                     username: 'test',
//                     password: 'password',
//                });

//           logger.info(result.body);

//           // expect(result.status).toBe(200);
//           // expect(result.body.data.token).toBeDefined();
//           // expect(result.body.data.token).not.toBe('test');
//      })
// })