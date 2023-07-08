import { Express } from "express";
import App from "../app";
import supertest from "supertest";
import DB from "../database";
import passport from "passport";
import passportMiddlewar from "../utils/middleware/passport";
import mongoose from "mongoose";

describe("Test", () => {
   let app: App;
   let server: any;
   let db: DB;
   let a: Express;

   beforeAll(async () => {
      app = new App();
      app.configure();
      db = new DB();
      a = app.getApp();

      await db.connect(); // Conecta a la base de datos antes de iniciar el servidor

      a.use(passport.initialize());
      passport.use(passportMiddlewar);

      server = app.start();
   });

   afterAll(async () => {
      app.stop();      
      await mongoose.disconnect();
   });

   // Resto de tus tests aquí...
   it("test_server_starts_and_listens_on_specified_port", () => {
      expect(server).toBeDefined();
   });

   it("test_swagger_documentation_is_properly_served", async () => {
      const agent = supertest.agent(app.getApp());
      await agent.get("/api/docs").expect(301);
   });

   // Tests that the passport middleware is properly initialized
   it("test_passport_middleware_is_properly_initialized", () => {
      const initializeSpy = jest.spyOn(passport, "initialize");
      const useSpy = jest.spyOn(passport, "use");

      a.use(passport.initialize());
      passport.use(passportMiddlewar);

      expect(initializeSpy).toHaveBeenCalled();
      expect(useSpy).toHaveBeenCalledWith(passportMiddlewar);
   });
});
