import { Request, Response } from "express";
import IUser from "../utils/interfaces/User.Interfaces";
import { messageError } from "../utils/errors/messageError";
import UserService from "../services/Users.service";
import MessageError from "../utils/interfaces/MessageError.interfaces";

export default class UserController {
   private userService: UserService;

   constructor() {
      this.userService = new UserService();
   }

   getAll = async (req: Request, res: Response): Promise<Response> => {
      try {
         const users: IUser[] | MessageError =
            await this.userService.getUsersService();

         if ("status" in users) {
            return res
               .status(users["status"])
               .json({ message: users["message"] });
         }
         return res.status(200).json(users);
      } catch (err) {
         return res.status(500).json({ message: messageError(err) });
      }
   };

   public getById = async (req: Request, res: Response): Promise<Response> => {
      try {
        const { idUser } = req.params;
        const user: IUser | MessageError =
            await this.userService.getByIdService(idUser);
           
            if ("status" in user) {
                return res
                  .status(user["status"])
                  .json({ message: user["message"] });
            
            }
            
            return res.status(200).json(user);
      } catch (error) {
         return res.status(500).json({ message: messageError(error) });
      }
   };
   
   completeProfile = async (req: Request, res: Response) => {
      const objProfile: IUser= req.body
      const img = req.files
      
      const { idUser} = req.params;
      const bodyController = {
         objProfile,
         img,
         idUser
      }

      try{
         const userUpdate = await this.userService.updateService(bodyController );
         
         if("status" in userUpdate){
            return res.status(userUpdate["status"]).json({msg: userUpdate["message"]});
         }
         
         return res.status(200).json(userUpdate);
      }
      catch(error){
         return res.status(500).json({ error: messageError(error) });
      }
   }

   delete = async (req: Request, res: Response): Promise<Response> => {
      try {
         const { idUser } = req.params;
         const userDelete: IUser | MessageError =
            await this.userService.deleteUserService(idUser);

         if ("status" in userDelete) {
            return res.status(userDelete["status"]).json({message:userDelete["message"]});
         }

         return res.status(200).json(userDelete);
      } catch (error) {
         return res.status(500).json({ message: messageError(error) });
      }
   };
}
