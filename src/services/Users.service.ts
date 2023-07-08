import ManagerRoles from "../database/manager/ManagerRoles";
import UserManager from "../database/manager/ManagerUsers";
import config from "../utils/config/config";
import MessageError from "../utils/interfaces/MessageError.interfaces";
import IRoles from "../utils/interfaces/Roles.Interfaces";
import IUser from "../utils/interfaces/User.Interfaces";
import setArrayImages from "../utils/setArrayImages";

export default class UserService {
   private userManager: UserManager;
   private roleManager: ManagerRoles;

   constructor() {
      this.userManager = UserManager.getInstance();
      this.roleManager = ManagerRoles.getInstance();
   }

   public getUsersService = async (): Promise<IUser[] | MessageError> => {
      try {
         const users: IUser[] | null = await this.userManager.getAll();
         if (!users) {
            return { status: 404, message: "No hay usuarios" };
         }
         return users;
      } catch (error) {
         throw error;
      }
   };

   public getByIdService = async (
      idUser: string
   ): Promise<IUser | MessageError> => {
      try {
         const user: IUser | null = await this.userManager.getById(idUser);

         if (!user)
            return {
               status: 404,
               message: "User not found",
            };

         return user;
      } catch (error) {
         throw error;
      }
   };

   public createService = async (
      user: IUser
   ): Promise<IUser | MessageError> => {
      try {
         const role: IRoles | null = await this.roleManager.getByName("USER");

         if (!role) {
            return {
               status: 404,
               message: "Role USER not found, administrator can create it",
            };
         }
         const newUser: IUser | null = await this.userManager.create(user);
         this.userManager.addRole(newUser, role);

         return newUser;
      } catch (error) {
         throw error;
      }
   };

   public updateService = async (
      bodyController: any
   ): Promise<IUser | MessageError> => {
      const { idUser, objProfile, img } = bodyController;
      const avatar = setArrayImages(img);

      objProfile.avatar = avatar[0];
      try {
         const userUpdate: IUser | null = await this.userManager.update(
            idUser,
            objProfile
         );
         if (!userUpdate) return { status: 404, message: "User not found" };
         return userUpdate;
      } catch (error) {
         throw error;
      }
   };

   public deleteUserService = async (
      idUser: string
   ): Promise<IUser | MessageError> => {
      try {
         const userDelete: IUser | null = await this.userManager.delete(idUser);
         if (!userDelete) return { status: 404, message: "User not found" };

         return userDelete;
      } catch (error) {
         throw error;
      }
   };
}
