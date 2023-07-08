import { Response, Request } from "express";
import ActivitiesService from "../services/Activity.service";
import { messageError } from "../utils/errors/messageError";
import IActivities from "../utils/interfaces/Activities.interface";

export default class ActivitiesController {
   private activitiesService: ActivitiesService;
   constructor() {
      this.activitiesService = new ActivitiesService();
   }

   public getActivities = async (req: Request, res: Response) => {
      try {
         const activities = await this.activitiesService.getAll();
         return res.status(200).json(activities);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   };

   public getActivityById = async (req: Request, res: Response) => {
      const { idActivity } = req.params;
      try {
         const activity = await this.activitiesService.getById(idActivity);

         if ("status" in activity) {
            return res.status(activity["status"]).json(activity["message"]);
         }

         return res.status(200).json(activity);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   };

   public createActivity = async (req: Request, res: Response) => {
      const activity: IActivities = req.body;
      const { idUser } = req.params;
      const images = req.files;
      const bodyController = {
         activity,
         idUser,         
         images,
      };

      try {
         const newDestinations = await this.activitiesService.create(
            bodyController
         );

         if ("status" in newDestinations) {
            return res
               .status(newDestinations["status"])
               .json(newDestinations["message"]);
         }

         return res.status(201).json(newDestinations);
      } catch (error) {
         console.log(error);
         return res.status(500).json({ error: messageError(error) });
      }
   };

   public updateActivity = async (req: Request, res: Response) => {
      try {
         const { idActivity ,idUser } = req.params;
         
         const newActivity: IActivities = req.body;
         const images = req.files;

         const bodyController = {
            idActivity,
            newActivity,
            images,
            idUser

         };

         const updateActivity = await this.activitiesService.update(
            bodyController
         );

         if ("status" in updateActivity) {
            return res
               .status(updateActivity["status"])
               .json(updateActivity["message"]);
         }

         return res.status(200).json(updateActivity);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   };

   public filterActivity = async (req: Request ,res: Response) => {
        const filterData = req.body

        try {
         const activities = await this.activitiesService.filterActivities(filterData);
         return res.status(200).json(activities);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   }
}
