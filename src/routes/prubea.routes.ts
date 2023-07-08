import { Router } from "express";

import Auth0Controller from "../controllers/Auth0.controller";

export default class Auth0Routes {
   public router: Router;
   
   private auth0Controller: Auth0Controller

   constructor() {
      this.router = Router();
      
      this.auth0Controller = new Auth0Controller();
      this.configureRoutes();
   }

   private configureRoutes() {    

      this.router.get("/login",this.auth0Controller.login)
      this.router.get("/callback",this.auth0Controller.callback)
      this.router.get("/logout",this.auth0Controller.login)
      this.router.get("/profile",this.auth0Controller.profile)
   
   }

   public getRoutes() {
      return this.router;
   }
}
