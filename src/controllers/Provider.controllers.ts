import { Response, Request } from "express";
import ProfileProvider from "../database/models/ProfileProvider";
import IProfileProvider from "../utils/interfaces/ProfileProvider.interces";
import ManagerProvider from "../database/manager/ManagerProvider";
import { messageError } from "../utils/errors/messageError";

export default class ProfileProviderController {
   private providerManager: ManagerProvider;

   constructor() {
      this.providerManager = ManagerProvider.getInstance();
   }

   createProvider = async (req: Request, res: Response) => {
      try {
         const idUser = req.params;
         
         const providerObject = {
            companyName:req.body.companyName,
            companyAddress:req.body.companyAddress,
            companyPhone:req.body.companyPhone,
            companyEmail:req.body.companyEmail,
            companyRepresentative:req.body.companyRepresentative,
            relatedChannel:req.body.relatedChannel,
            descriptionBusiness:req.body.descriptionBusiness,
            serviceType: req.body.serviceType,
            isRegistered:req.body.isRegistered,
            user: idUser,
         };
         const provider: any = await this.providerManager.create(providerObject);
         
         if ("status" in provider) {
            return res.status(provider["status"]).json({msg: provider["message"]});
         }
         return res.status(201).json(provider);
      } catch (error) {
         return res.status(500).json({ msg: messageError(error) });
      }
   };
}
