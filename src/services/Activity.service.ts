import { ObjectId } from "mongoose";
import moment from "moment";
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
         activities.forEach(async (activity:any) => {
            console.log(activity.startTime, activity.endTime)
            activity.startTime.forEach( (startTime:any)=>{
               console.log(startTime)
            })
         })
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
      const { idUser, activity, images } = bodyController;
      const urlImages = setArrayImages(images);
      const { idDestination } = activity;

      const startTime = activity.startTime.map((fecha:any)=>{
         return moment(fecha)
      })
      const endTime = activity.endTime.map((fecha:any)=>{
         return moment(fecha)      
      });
      
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

         if (
            isProvider.roleName === "PROVIDER" ||
            isProvider.roleName === "ADMIN"
         ) {

            activity.providerId = user._id;
            activity.galleryImage = urlImages;
            activity.startTime = startTime
            activity.endTime = endTime
            const newActivity = await this.activitiesManager.create(activity);            
            
            await this.usermanager.addActivities(user, newActivity);

            await this.destinationmanager.addActivities(
               destination,
               newActivity
            );

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
      const { idActivity, newActivity, images, idUser } = bodyController;

      const provider: IUser = await this.usermanager.getById(idUser);

      if (!provider)
         return { status: 400, message: "Bad request provider not found" };

      if (images) {
         newActivity.galleryImage = setArrayImages(images);
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

   public delete = async (idActivity: string): Promise<IActivities | MessageError>=>{
      try {
         const deletedActivity = await this.activitiesManager.delete(idActivity);
         if (!deletedActivity) {
            return {
               status: 404,
               message: "Activity not fond",
            };
         }
         return deletedActivity;
      } catch (error) {
         throw error;
      }
   

   }

   public filterActivities = async (
      formData: IActivities
   ): Promise<IActivities[] | Error> => {
      try {
         let activities = await this.activitiesManager.getAll();

         if (formData.location) {
            activities = activities.filter((el: IActivities) =>
               el.location
                  .toLowerCase()
                  .includes(formData.location.toLowerCase())
            );
         }

         if (formData.startTime && formData.endTime) {
            const fechaInicio = new Date(formData.startTime);
            const fechaFin = new Date(formData.endTime);

            activities = activities.filter((el: IActivities) => {
               const startDate = new Date(el.startTime);
               const endDate = new Date(el.endTime);
               return startDate >= fechaInicio && endDate <= fechaFin;
            });
         } else if (formData.startTime) {
            const fechaInicio = new Date(formData.startTime);
            activities = activities.filter((el: IActivities) => {
               const startDate = new Date(el.startTime);
               return startDate >= fechaInicio;
            });
         } else if (formData.endTime) {
            const fechaFin = new Date(formData.endTime);
            activities = activities.filter((el: IActivities) => {
               const endDate = new Date(el.endTime);
               return endDate <= fechaFin;
            });
         }

         if (formData.maxPeople) {
            activities = activities.filter(
               (el: IActivities) => el.maxPeople === formData.maxPeople
            );
         }

         return activities;
      } catch (error) {
         throw error;
      }
   };
}
