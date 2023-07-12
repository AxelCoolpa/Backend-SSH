import { Request, Response } from "express";
import { messageError } from "../utils/errors/messageError";
import DestinationsService from "../services/Destinations.service";
import IDestinations from "../utils/interfaces/Destinations.Interfaces";
import MessageError from "../utils/interfaces/MessageError.interfaces";


export default class DestinationsController {
   private destinationsService: DestinationsService;

   constructor() {
      this.destinationsService = new DestinationsService();
   }

   public getAll = async (req: Request, res: Response) => {
      try {
         const queryString: any = req.query;
         
         
         const destinations: IDestinations[] | MessageError =
            await this.destinationsService.serviceDestinations(
               queryString
            );

         if ("status" in destinations) {
            return res.status(destinations["status"]).json({
               msg: destinations["message"],
            });
         }

         res.status(200).json(destinations);
      } catch (error) {
         res.status(500).json(messageError(error));
      }
   };

   public getById = async (req: Request, res: Response) => {
      try {
         const { idDestination } = req.params;
         const destination = await this.destinationsService.getByIdService(
            idDestination
         );
         
         if ("status" in destination) {
            return res
               .status(destination["status"])
               .json({ message: destination["message"] });
         }

         res.status(200).json(destination);
      } catch (error) {
         res.status(500).json(messageError(error));
      }
   };

   public createController = async (req: Request, res: Response) => {
      try {
         const destinationObjet = req.body;
         // let img: any = req.files;
         const { idUser } = req.params;

         const bodyController = {
            destinationObjet,
            idUser,
            // img,
         };

         const newDestination = await this.destinationsService.createService(
            bodyController
         );

         if ("status" in newDestination)
            return res.status(newDestination["status"]).json({
               message: newDestination["message"],
            });

         res.status(201).json(newDestination);
      } catch (error) {
         res.status(500).json(messageError(error));
      }
   };

   public updateController = async (
      req: Request,
      res: Response
   ): Promise<Response> => {
      try {
         const { idUser, idDestination } = req.params;
         const destinationObjet = req.body;
         let img: any = req.files;

         const bodyController = {
            destinationObjet,
            idUser,
            idDestination,
            img,
         };

         const updatedDestination =
            await this.destinationsService.updateService(bodyController);
         if ("status" in updatedDestination)
            return res
               .status(updatedDestination["status"])
               .json({ msg: updatedDestination["message"] });

         return res.status(200).json(updatedDestination);
      } catch (error) {
         return res.status(500).json(messageError(error));
      }
   };

   public deleteController = async (
      req: Request,
      res: Response
   ): Promise<Response> => {
      try {
         const { idDestination } = req.params;
         const deletedDestination =
            await this.destinationsService.deleteService(idDestination);

         if ("status" in deletedDestination) {
            return res.status(deletedDestination["status"]).json({
               msg: deletedDestination["message"],
            });
         }

         return res.status(204).json(deletedDestination);
      } catch (error) {
         return res.status(500).json(messageError(error));
      }
   };
}
