import { Request } from "supertest";
import { Express } from "express";
import ManagerDB from "../database/manager/ManagerDB";
import mongoose, {ObjectId, isValidObjectId} from "mongoose";
import DB from "../database";
import App from "../app";
import DestinationsService from "../services/Destinations.service";
import DestinationsManager from "../database/manager/ManagerDestinations";
import UserService from "../services/Users.service";
import UserManager from "../database/manager/ManagerUsers";
import { messageError } from "../utils/errors/messageError";

let app: App;
let server: any;
let db: DB;
let a: Express;
let _id : ObjectId

describe("service destination", () => {
  
   let destinationService: DestinationsService;
   let destinationManager: DestinationsManager;
   beforeAll(async () => {
      app = new App();
      app.configure();
      db = new DB();
      a = app.getApp();
      destinationService = new DestinationsService();
      destinationManager = DestinationsManager.getInstance();
      await db.connect(); // Conecta a la base de datos antes de iniciar el servidor

      server = app.start();
   });

   afterAll(async () => {
      app.stop();
      await mongoose.disconnect();
   });

   it("service destinations all", async () => {
      const result = await destinationService.serviceDestinations({});
      expect(result).toEqual(await destinationManager.getAll());
   });
});

describe("service users", () => {
   let userService: UserService;
   let usersManager: UserManager;
   beforeAll(async () => {
      app = new App();
      app.configure();
      db = new DB();
      a = app.getApp();
      userService = new UserService();
      usersManager = UserManager.getInstance();
      await db.connect(); // Conecta a la base de datos antes de iniciar el servidor

      server = app.start();
   });

   afterAll(async () => {
      app.stop();
      await mongoose.disconnect();
   });

   it("service users all", async () => {
      const result = await userService.getUsersService();
      expect(result).toEqual(await usersManager.getAll());
   });
   
   // it("service one user", async () => {
   //    const _id = "618a2d5d0f2b8d0f8b8f9f0c" 
      
   //    const result = await userService.getByIdService(_id);
   //    console.log(result)
      
   // });
});
