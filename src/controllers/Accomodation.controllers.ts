import { Response, Request } from "express";
import AccomodationService from "../services/Accomodation.service";
import { messageError } from "../utils/errors/messageError";
import IAccomodation from "../utils/interfaces/Accomodation.interface";

export default class ActivitiesController {
   private accomodationService: AccomodationService;
   constructor() {
      this.accomodationService = new AccomodationService();
   }

   public getAccomodations = async (req: Request, res: Response) => {
      try {
         const accomodations = await this.accomodationService.getAll();
         return res.status(200).json(accomodations);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   };
    
   public getAccomodationById = async (req: Request, res: Response) => {
    const { idAccomodation } = req.params;
    try {
       const accomodation = await this.accomodationService.getById(idAccomodation);

       if ("status" in accomodation) {
          return res.status(accomodation["status"]).json(accomodation["message"]);
       }

       return res.status(200).json(accomodation);
    } catch (error) {
       return res.status(500).json({ error: messageError(error) });
    }
 };

 public createAccomodation = async (req: Request, res: Response) => {
    const accomodation: IAccomodation = req.body;
    const { idUser } = req.params;
    const images = req.files;
    const bodyController = {
       accomodation,
       idUser,         
       images,
    };

    try {
       const newAccomodation = await this.accomodationService.create(
          bodyController
       );

       if ("status" in newAccomodation) {
          return res
             .status(newAccomodation["status"])
             .json(newAccomodation["message"]);
       }

       return res.status(201).json(newAccomodation);
    } catch (error) {
       console.log(error);
       return res.status(500).json({ error: messageError(error) });
    }
 };
 public updateAccomodation = async (req: Request, res: Response) => {
    try {
       const { idAccomodation ,idUser } = req.params;
       
       const newAccomodation: IAccomodation = req.body;
       const images = req.files;

       const bodyController = {
          idAccomodation,
          newAccomodation,
          images,
          idUser

       };

       const updateAccomodation = await this.accomodationService.update(
          bodyController
       );

       if ("status" in updateAccomodation) {
          return res
             .status(updateAccomodation["status"])
             .json(updateAccomodation["message"]);
       }

       return res.status(200).json(updateAccomodation);
    } catch (error) {
       return res.status(500).json({ error: messageError(error) });
    }
 };

 public deleteController = async (
    req: Request,
    res: Response
 ): Promise<Response> => {
    try {
       const { idAccomodation } = req.params;
       const deletedAccomodation =
          await this.accomodationService.deleteService(idAccomodation);

       if ("status" in deletedAccomodation) {
          return res.status(deletedAccomodation["status"]).json({
             msg: deletedAccomodation["message"],
          });
       }

       return res.status(204).json(deletedAccomodation);
    } catch (error) {
       return res.status(500).json(messageError(error));
    }
 };

}