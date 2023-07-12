import { ObjectId } from "mongoose";
import AccomodationManager from "../database/manager/ManagerAccomodation";
import DestinationsManager from "../database/manager/ManagerDestinations";
import UserManager from "../database/manager/ManagerUsers";
import { messageError } from "../utils/errors/messageError";
import IAccomodation from "../utils/interfaces/Accomodation.interface";
import IDestinations from "../utils/interfaces/Destinations.Interfaces";
import MessageError from "../utils/interfaces/MessageError.interfaces";
import IRoles from "../utils/interfaces/Roles.Interfaces";
import IUser from "../utils/interfaces/User.Interfaces";
import setArrayImages from "../utils/setArrayImages";

export default class AccomodationService {
   private accomodationManager: AccomodationManager;
   private usermanager: UserManager;
   private destinationmanager: DestinationsManager;

   public constructor() {
      this.accomodationManager = AccomodationManager.getInstance();
      this.usermanager = UserManager.getInstance();
      this.destinationmanager = DestinationsManager.getInstance();
   }

   public getAll = async (): Promise<IAccomodation[] | Error> => {
      try {
         const accomodation = await this.accomodationManager.getAll();
         return accomodation;
      } catch (error) {
         throw error;
      }
   };

   public getById = async (
      idAccomodation: string
   ): Promise<IAccomodation | MessageError> => {
      try {
         const accomodation = await this.accomodationManager.getById(idAccomodation);
         if (!accomodation) {
            return {
               status: 404,
               message: "Accomodation not found",
            };
         }
         return accomodation;
      } catch (error) {
         throw messageError(error);
      }
   };

   public create = async (
      bodyController: any
   ): Promise<IAccomodation | MessageError> => {
      const {  idUser, accomodation, images } = bodyController;
      const urlImages = setArrayImages(images);
      const {idDestination} = accomodation

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
            accomodation.providerId = user._id;
            accomodation.images = urlImages;
            const newAccomodation = await this.accomodationManager.create(accomodation);
   
            await this.usermanager.addAccomodations(user, newAccomodation);
            await this.destinationmanager.addAccomodations(destination, newAccomodation);
   
            return newAccomodation;

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
   ): Promise<IAccomodation | MessageError> => {
      const { idAccomodation, newAccomodation, images ,idUser } = bodyController;

      const provider: IUser = await this.usermanager.getById(idUser);

      if (!provider)
        return { status: 400, message: "Bad request provider not found" };

      if(images) {
         newAccomodation.images = setArrayImages(images)
      }

      try {
         const updatedAccomodation = await this.accomodationManager.update(
            idAccomodation,
            newAccomodation
         );

         if (!updatedAccomodation) {
            return {
               status: 404,
               message: "Accomodation not fond",
            };
         }

         return updatedAccomodation;
      } catch (error) {
         throw error;
      }
   };

   public deleteService = async (idAccomodation: string) => {
      try {
         const deleted = await this.accomodationManager.delete(idAccomodation);
         if (!deleted) {
            return { status: 404, message: "Accomodation not found" };
         }
         return deleted;
      } catch (error) {
         throw error;
      }
   };
}