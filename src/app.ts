import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import morgan, { Morgan } from "morgan";
import { json, urlencoded } from "body-parser";
import passport from "passport";
import session from "express-session";

import passportMiddlewar from "./utils/middleware/passport";
import passportAuth0 from "./utils/middleware/passportAuth0";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger.docs";
import DB from "./database";
import UserRoutes from "./routes/user.routes";
import RolesRouter from "./routes/roles.routes";
import AuthRoutes from "./routes/auth.routes";
import Auth0Routes from "./routes/prubea.routes";
import DestinationsRoutes from "./routes/destinations.routes";
import ActivitiesRoutes from "./routes/activity.routes";

const options: CorsOptions = {};
export default class App {
   
   private readonly app: Express;
   private readonly connectDB: DB;
   private readonly userRoutes: UserRoutes;
   private readonly rolesRoutes: RolesRouter;
   private readonly authRoutes: AuthRoutes;
   private readonly pruebaRoutes: Auth0Routes;
   private readonly destinationRoutes: DestinationsRoutes;
   private readonly activitiesRoutes: ActivitiesRoutes;
   private server: any;

   constructor() {
      this.app = express();
      this.connectDB = new DB();
      this.userRoutes = new UserRoutes();
      this.rolesRoutes = new RolesRouter();
      this.authRoutes = new AuthRoutes();
      this.pruebaRoutes = new Auth0Routes();
      this.destinationRoutes = new DestinationsRoutes();
      this.activitiesRoutes = new ActivitiesRoutes();
      this.configure();
   }

   public configure(): void {
      this.app.use(
         cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization"],
         })
      );
      this.app.use(json());
      this.app.use(urlencoded({ extended: false }));
      this.connectDB.connect();
      this.app.use(
         session({
            secret: process.env.JWT_SECRET || "secret-key",
            resave: false,
            saveUninitialized: false,

            cookie: {
               secure: false, // solo permitir cookies en conexiones HTTPS
               httpOnly: true, // evitar acceso desde el lado del cliente
               maxAge: 3600000, // tiempo de expiración de la cookie
            },
         })
      );
      this.app.use(passport.initialize());
      this.app.use(morgan("dev"));
      passport.use(passportMiddlewar);
      passport.use(passportAuth0);

      this.routesApp();
   }

   private routesApp() {
      this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
      this.app.use("/api", this.userRoutes.getRouter());
      this.app.use("/api", this.rolesRoutes.getRouter());
      this.app.use("/api", this.authRoutes.getRoutes());
      this.app.use("/api", this.pruebaRoutes.getRoutes());
      this.app.use("/api", this.destinationRoutes.getRouter());
      this.app.use("/api/img", express.static("upload"));
      this.app.use("/api", this.activitiesRoutes.getRouter());
      this.app.get("/", (req: any, res): any => {
         return res.status(200).json({
            msg: `welcome requests to /api/example`,
            rutas: {
               Authenticacion: {
                  registerUser: "/api/signUp",
                  loginUser: "/api/signIn",
                  updateCredenciales: "/api/update/{idUser}/credentials",
               },
               Users: {
                  allUsers: "/api/users",
                  oneUser: "/api/user/:idUser",
                  deleteUser: "/api/user/{idUser}",
                  createProfile: "/api/user/{idUser}/profile",
                  updateProfile: "/api/user/{idUser}/profile",
               },
               Roles: {
                  allRoles: "/api/roles",
                  oneReles: "/api/roles/{idRole}",
                  creteRole: "/api/roles",
                  updateRole: "/api/roles/{idRole}",
                  deleteRole: "/api/roles/{idRole}",
               },

               Destinations: {
                  allDestinations: "/api/destinations",
                  oneDestination: "/api/destination/{idDestination}",
                  createDestination: "/api/destination/{idUser}/create",
               },
               Provider: {
                  createPeofileProvider: "/api/user/{idUser}/profileProvider",
               },
               Admin: {
                  createAdmin: "/api/registerAdmin",
               },
            },
         });
      });
   }

   public getApp(): Express {
      return this.app;
   }

   public start(): void {
      const port = process.env.PORT || 3000;
      this.server = this.app.listen(port, () => {
         console.log(`Server listening on port ${port}`);
      });
      return this.server;
   }

   public stop(): void {
      this.app.off;
      this.server.close(() => {});
   }
}
