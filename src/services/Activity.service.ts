import { ObjectId } from "mongoose";
import ActivitiesManager from "../database/manager/ManagerActivity";
import DestinationsManager from "../database/manager/ManagerDestinations";
import UserManager from "../database/manager/ManagerUsers";
import { messageError } from "../utils/errors/messageError";
import IActivities from "../utils/interfaces/Activities.interface";
import IDestinations from "../utils/interfaces/Destinations.Interfaces";
import MessageError from "../utils/interfaces/MessageError.interfaces";
import IRoles from "../utils/interfaces/Roles.Interfaces";
import IUser from "../utils/interfaces/User.Interfaces";
import setArrayImages from "../utils/setArrayImages";

export default class ActivitiesService {
   private activitiesManager: ActivitiesManager;
   private usermanager: UserManager;
   private destinationmanager: DestinationsManager;

   public constructor() {
      this.activitiesManager = ActivitiesManager.getInstance();
      this.usermanager = UserManager.getInstance();
      this.destinationmanager = DestinationsManager.getInstance();
   }

   public getAll = async (): Promise<IActivities[] | Error> => {
      try {
         const activities = await this.activitiesManager.getAll();
         return activities;
      } catch (error) {
         throw error;
      }
   };

   public getById = async (
      idActivity: string
   ): Promise<IActivities | MessageError> => {
      try {
         const activity = await this.activitiesManager.getById(idActivity);
         if (!activity) {
            return {
               status: 404,
               message: "Activity not fond",
            };
         }
         return activity;
      } catch (error) {
         throw messageError(error);
      }
   };

   public create = async (
      bodyController: any
   ): Promise<IActivities | MessageError> => {
      const {  idUser, activity, images } = bodyController;
      const urlImages = setArrayImages(images);
      const {idDestination} = activity

      try {
         const destination: IDestinations =
            await this.destinationmanager.getById(idDestination);
         
            if (!destination) {
            return {
               status: 404,
               message:
                  "destination not found, ask administrator to create desired destination",
            };
         }

         const user: IUser = await this.usermanager.getById(idUser);
         if (!user) {
            return {
               status: 404,
               message: "User not fond",
            };
         }

         const isProvider: IRoles | ObjectId | any = user.role;
         
         if (isProvider.roleName === "PROVIDER" || isProvider.roleName === "ADMIN") {
            activity.providerId = user._id;
            activity.galleryImage = urlImages;
            const newActivity = await this.activitiesManager.create(activity);
   
            await this.usermanager.addActivities(user, newActivity);
            await this.destinationmanager.addActivities(destination, newActivity);
   
            return newActivity;

         }
         return {
            status: 403,
            message: "You are not a provider",
         };

      } catch (error) {
         throw error;
      }
   };

   public update = async (
      bodyController: any
   ): Promise<IActivities | MessageError> => {
      const { idActivity, newActivity, images } = bodyController;

      if(images) {
         newActivity.galleryImage = setArrayImages(images)
      }

      try {
         const updatedActivity = await this.activitiesManager.update(
            idActivity,
            newActivity
         );

         if (!updatedActivity) {
            return {
               status: 404,
               message: "Activity not fond",
            };
         }

         return updatedActivity;
      } catch (error) {
         throw error;
      }
   };
}
