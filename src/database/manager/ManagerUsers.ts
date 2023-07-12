import { Document, Model, ObjectId, Types, model } from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/User";
import IUser from "../../utils/interfaces/User.Interfaces";
import ManagerDB from "./ManagerDB";
import config from "../../utils/config/config";
import Role from "../models/Role";
import IRoles from "../../utils/interfaces/Roles.Interfaces";
import IProfileProvider from "../../utils/interfaces/ProfileProvider.interces";
import IActivities from "../../utils/interfaces/Activities.interface";
import IAccomodation from "../../utils/interfaces/Accomodation.interface";

export default class UserManager extends ManagerDB<IUser> {
   
   private static instances: UserManager;
   
   private constructor() {
      
      super(User);
   }

   public static getInstance(){
      if(!UserManager.instances){
         UserManager.instances = new UserManager();
      }
      return UserManager.instances;   
   }

   async getAll(): Promise<IUser[] | null> {
      try {
         return await this.model
            .find({ itDeleted: false }, { password: 0 })
            .populate("role", { roleName: 1, _id: 0 })
            .populate("profileProvider", { user: 0 })
            .populate("activities");
      } catch (error) {
         throw error;
      }
   }

   async getById(id: string): Promise<IUser> {
      try {
         const user = await this.model
            .findOne({ _id: id, itDeleted: false }, { password: 0 })            
            .populate("role", { roleName: 1, _id: 0 })
            .populate("profileProvider", { user: 0 })
            .populate("activities");

         return user;
      } catch (error) {
         throw error;
      }
   }

   async createAdmin(email: string, password: string, username: string) {
      try {
         const role = await Role.findOne({ roleName: "ADMIN" });

         const userAdmin = new this.model({
            email,
            password,
            username,
         });
         userAdmin.role = role?._id;
         await userAdmin.save();
         return await userAdmin.populate("role", { roleName: 1, _id: 0 });
      } catch (error) {
         throw error;
      }
   }

   async validateRole(): Promise<IUser | null> {
      return await this.model.findOne({ role: "ADMIN" });
   }

   async validateUser(email: string): Promise<IUser | null> {
      return await this.model.findOne({ email: email });
   }

   async addRole(user: IUser, role: IRoles): Promise<IUser | null> {
      try {
         let userRole = user;
         userRole.role = role._id;
         return await userRole.save();
      } catch (error) {
         throw error;
      }
   }

   async addProfileProvider(
      userProvider: IUser,
      profileProvider: IProfileProvider
   ): Promise<IUser | null> {
      try {
         let userProfileProvider = userProvider;
         userProfileProvider.profileProvider = profileProvider._id;
         return await userProfileProvider.save();
      } catch (error) {
         throw error;
      }
   }

   async addActivities(
      user: IUser,
      Activities: IActivities
   ): Promise<IUser | null> {
      try {
         let userActivities = user;
         userActivities.activities.push(Activities._id);
         return await userActivities.save();
      } catch (error) {
         throw error;
      }
   }

   createToken(user: IUser) {
      return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
         expiresIn: 3600,
      });
   }

   async addAccomodations(
      user: IUser,
      accomodations: IAccomodation,

   ): Promise<IUser | null> {
      try {
         let userAccomodations = user;
         userAccomodations.accomodations.push(accomodations._id);
         return await userAccomodations.save();
      } catch (error) {
         throw error;
      }
   }
}
