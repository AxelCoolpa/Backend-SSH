import DestinationsManager from "../database/manager/ManagerDestinations";
import moment from "moment";
import UserManager from "../database/manager/ManagerUsers";
import { messageError } from "../utils/errors/messageError";

import IDestinations from "../utils/interfaces/Destinations.Interfaces";
import MessageError from "../utils/interfaces/MessageError.interfaces";
import IUser from "../utils/interfaces/User.Interfaces";
import IRoles from "../utils/interfaces/Roles.Interfaces";
import setArrayImages from "../utils/setArrayImages";
import IActivities from "../utils/interfaces/Activities.interface";
import filterOfTime from "../utils/filterOfTime";
import ActivitiesManager from "../database/manager/ManagerActivity";

export default class DestinationsService {
   private managerDestinations: DestinationsManager;
   private userManager: UserManager;
   private activitiesManager: ActivitiesManager;

   constructor() {
      this.managerDestinations = DestinationsManager.getInstance();
      this.userManager = UserManager.getInstance();
      this.activitiesManager = ActivitiesManager.getInstance();
   }

   public serviceDestinations = async (
      queryString: any
   ): Promise<IDestinations[] | MessageError | any> => {
      const { destination, startDate, endDate, categories } = queryString;
      try {
         if ("search" in queryString) {
            const destinationsSearch = await this.managerDestinations.search(
               queryString["search"]
            );

            if (!destinationsSearch)
               return {
                  status: 404,
                  message: "Destinations not found",
               };

            return destinationsSearch;
         }

         if (destination) {
            const destinationsSelect = await this.managerDestinations.getById(
               destination
            );

            const activitiesOfDestination: IActivities[] =
               destinationsSelect.activities as unknown as IActivities[];

            if (!startDate && !endDate) {
               return activitiesOfDestination;
            }
            const activitiesFilter = filterOfTime(
               startDate,
               endDate,
               activitiesOfDestination
            );
            if (!categories) {
               return activitiesFilter;
            }

            return this.activitiesManager.getByCategory(categories);
         }

         if (startDate && endDate) {
            if (!categories) {
               return this.activitiesManager.filterActivitiesOftime(
                  startDate,
                  endDate
               );
            }

            return this.activitiesManager.getByCategory(categories);
         }

         if(categories){
            return this.activitiesManager.getByCategory(categories);
         }

         return await this.managerDestinations.getAll();
      } catch (error) {
         throw new Error(messageError(error));
      }
   };

   public getByIdService = async (idDestinations: string) => {
      try {
         const destination = await this.managerDestinations.getById(
            idDestinations
         );

         if (!destination)
            return {
               status: 404,
               message: "Destinations not found",
            };

         return destination;
      } catch (error) {
         throw new Error(messageError(error));
      }
   };

   public createService = async (bodyController: any) => {
      const { destinationObjet, idUser, img } = bodyController;
      // const arrayURLImage = setArrayImages(img);

      try {
         const admin: IUser | null = await this.userManager.getById(idUser);
         const role: IRoles | any = admin.role;

         if (role.roleName !== "ADMIN") {
            return { status: 400, message: "Bad request you are not admin" };
         }

         const newDestination: any = await this.managerDestinations.create(
            destinationObjet
         );

         return newDestination;
      } catch (error) {
         throw error;
      }
   };

   public updateService = async (bodyController: any) => {
      const { destinationObjet, img, idDestination, idUser } = bodyController;

      const arrayURLImage = setArrayImages(img);

      try {
         const provider: IUser = await this.userManager.getById(idUser);

         if (!provider)
            return { status: 400, message: "Bad request provider not found" };

         const destinations: IDestinations | null =
            await this.managerDestinations.getByProvider(
               provider._id,
               idDestination
            );

         if (!destinations)
            return {
               status: 404,
               message: "Destination not found",
            };

         destinationObjet.gallery = arrayURLImage;
         const destinatiosUpdated = await this.managerDestinations.update(
            destinations._id,
            destinationObjet
         );

         return destinatiosUpdated;
      } catch (error) {
         throw error;
      }
   };

   public deleteService = async (idDestination: string) => {
      try {
         const deleted = await this.managerDestinations.delete(idDestination);
         if (!deleted) {
            return { status: 404, message: "Destination not found" };
         }
         return deleted;
      } catch (error) {
         throw error;
      }
   };
}
