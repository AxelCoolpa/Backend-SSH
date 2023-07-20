import { Model, Document, Types, ObjectId } from "mongoose";
import IProfileProvider from "../../utils/interfaces/ProfileProvider.interces";
import ProfileProvider from "../models/ProfileProvider";
import ManagerDB from "./ManagerDB";
import UserManager from "./ManagerUsers";
import IUser from "../../utils/interfaces/User.Interfaces";
import ManagerRoles from "./ManagerRoles";
import IRoles from "../../utils/interfaces/Roles.Interfaces";
import MessageError from "../../utils/interfaces/MessageError.interfaces";

export default class ManagerProvider extends ManagerDB<IProfileProvider> {
   private static instance: ManagerProvider;
   private userManager: UserManager;
   private roleManager: ManagerRoles;
   
    private constructor() {
      super(ProfileProvider);
      this.userManager = UserManager.getInstance();
      this.roleManager = ManagerRoles.getInstance();
   }

   public static getInstance(): ManagerProvider {
      if (!ManagerProvider.instance) {
         ManagerProvider.instance = new ManagerProvider();
      }
      return ManagerProvider.instance;
   
   }

   async create(obj: any): Promise<any | IProfileProvider> {
      try {
         const { idUser } = obj.user;

         const user: any = await this.userManager.getById(idUser);

         const role: IRoles | MessageError  = await this.roleManager.getByName(
            "PROVIDER"
         );

         if (!user) {
            return {status:404,  message: "User not found" };
         }
         console.log(obj.serviceType)
         const newProvider: IProfileProvider = new this.model(obj);
         newProvider.user = user._id;
         await newProvider.save();
         console.log(newProvider.serviceType)
         await this.userManager.addProfileProvider(user,newProvider)
         const roleType = await this.roleManager.setTypeRole(role, newProvider.serviceType)
         await this.userManager.addRole(user,(roleType as IRoles))
        

         await user.save();
         return (await this.userManager.getById(user._id));
      } catch (error) {
         throw error;
      }
   }
}
