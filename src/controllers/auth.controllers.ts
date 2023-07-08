import { Request, Response } from "express";
import IUser from "../utils/interfaces/User.Interfaces";
import User from "../database/models/User";
import UserManager from "../database/manager/ManagerUsers";
import { messageError } from "../utils/errors/messageError";
import UserService from "../services/Users.service";


export default class AuthControllers {
   private userManager: UserManager;
   private userService: UserService;

   constructor() {
      this.userManager = UserManager.getInstance();
      this.userService = new UserService();
   }

   signUp = async (req: Request, res: Response) => {
      const { email, username, password, confirPassword } = req.body;

      if (!email || !username || !password || !confirPassword) {
         return res.status(400).json({ msg: "Please, send all the fields" });
      }

      if (password !== confirPassword) {
         return res.status(400).json({ msg: "The passwords do not match" });
      }

      const newUser: IUser = new User({
         email,
         username,
         password,
      });

      try {
         const user = await this.userService.createService(newUser);
         if("status" in user){
            return res.status(user["status"]).json({message: user["message"]});
         }

         return res.status(201).json(user);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   };

   signIn = async (req: Request, res: Response) => {
      try {
         const { email, password } = req.body;

         if (!email || !password) {
            return res.status(400).json({ msg: "Please, send all the fields" });
         }
         const user = await this.userManager.validateUser(req.body.email);
         if (!user) {
            return res.status(404).json({ msg: "The user does not exist" });
         }
         const isMatch = await user.comparePassword(req.body.password);
         if (isMatch) {
            return res
               .status(200)
               .json({ token: this.userManager.createToken(user) });
         }

         return res
            .status(400)
            .json({ msg: "The email or password are incorrect" });
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   };

   registerAdmin = async (req: Request, res: Response) => {
      try {
         const { email, password, username, confirPassword } = req.body;

         if (!email || !password || !username)
            return res.status(400).json({ msg: "Please, send all the fields" });

         if (password !== confirPassword)
            return res.status(400).json({ msg: "The passwords do not match" });

         const admin = await this.userManager.createAdmin(
            email,
            password,
            username
         );

         return res.status(201).json(admin);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   };

   updateCredentials = async (req: Request, res: Response) => {
      try {
         const user = await this.userManager.getById(req.params.id);
         if (!user) {
            return res.status(404).json({ msg: "The user does not exist" });
         }
         const updatedUser = await this.userManager.update(
            req.params.id,
            req.body
         );
         return res.status(200).json(updatedUser);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   };
}
