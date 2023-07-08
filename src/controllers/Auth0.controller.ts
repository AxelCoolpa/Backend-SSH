import passport from "passport";
import { Request, Response } from "express";
import User from "../database/models/User";
import IUser from "../utils/interfaces/User.Interfaces";
import { messageError } from "../utils/errors/messageError";



export default class Auth0Controller{
    
    constructor(){}
    public login = passport.authenticate("auth0", { scope: "openid profile email" });

    callback = (req: Request, res: Response, next: any) => {
        // callback maneja la respuesta de autenticaciones
        console.log(req.user);
        passport.authenticate("auth0", (err: any, user: any, _info: any) => {
            
           if (err) {
              return next(err);
           }
           if (!user) {
              return res.redirect("/api/login");
           }
     
           req.logIn(user, (err: any) => {
              if (err) {
                 return next(err);
              }
     
              res.redirect("/api/profile");
           });
        })(req, res, next);
     };
     
     profile = async (req: any, res: any, next: any) => {
      //   const { email } = req.user;
        try {
         console.log()
         
           return res.json('hola');
        } catch (error) {
           
           res.status(500).json({ message: messageError(error) });
        }
     };


}


