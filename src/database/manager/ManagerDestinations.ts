import moment from "moment";
import IDestinations from "../../utils/interfaces/Destinations.Interfaces";
import Destinations from "../models/Destinations";
import ManagerDB from "./ManagerDB";
import IActivities from "../../utils/interfaces/Activities.interface";
import IAccomodation from "../../utils/interfaces/Accomodation.interface";

export default class DestinationsManager extends ManagerDB<IDestinations> {
   private static instance: DestinationsManager;

   private constructor() {
      super(Destinations);
   }

   public static getInstance(): DestinationsManager {
      if (!DestinationsManager.instance) {
         DestinationsManager.instance = new DestinationsManager();
      }
      return DestinationsManager.instance;
   }
   public async getAll(): Promise<IDestinations[]> {
      try {
         return await this.model.find().populate("activities");
      } catch (error) {
         throw error;
      }
   }

   public async getById(idDestination: string): Promise<IDestinations> {
      try {
         return await this.model.findById(idDestination).populate("activities");
      } catch (error) {
         throw error;
      }
   }

   public async search(search: any): Promise<IDestinations[]> {
      try {
         const searchDestinations = await this.model
            .find({
               $or: [
                  { title: { $regex: search, $options: "i" } },
                  { description: { $regex: search, $options: "i" } },
               ],
            })
            .populate("activities");

         return searchDestinations;
      } catch (error) {
         throw error;
      }
   }

   public async create(destinationObjt: any): Promise<IDestinations> {
      try {
         const newDestination: IDestinations = await this.model(
            destinationObjt
         );

         await newDestination.save();

         return newDestination;
      } catch (error) {
         throw error;
      }
   }

   public getByProvider = async (
      idProvider: string,
      idDestination: string
   ): Promise<IDestinations | null> => {
      try {
         const destinations = await this.model.findOne({
            providerId: idProvider,
            _id: idDestination,
         });

         return destinations;
      } catch (error) {
         throw error;
      }
   };

   public addActivities = async (
      destination: IDestinations,
      activities: IActivities
   ) => {
      try {
         destination.activities.push(activities._id);
         await destination.save();
      } catch (error) {
         throw error;
      }
   };

   addAccomodations = async (
      destination: IDestinations,
      accomodations: IAccomodation
   ) => {
      try {
         destination.accomodations.push(accomodations._id);
         await destination.save();
      } catch (error) {
         throw error;
      }
   };
}
