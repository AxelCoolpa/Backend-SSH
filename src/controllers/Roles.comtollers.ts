import { Request, Response } from "express";
import IRoles from "../utils/interfaces/Roles.Interfaces";
import Role from "../database/models/Role";
import { messageError } from "../utils/errors/messageError";
import  ManagerRoles  from "../database/manager/ManagerRoles";


export default class RolesController {

   private managerRoles: ManagerRoles = ManagerRoles.getInstance();
   
   
   

    getAll= async (req: Request, res: Response): Promise<Response<any, Record<string, any>>>=> {
      try {
         const roles = await this.managerRoles.getAll();
         
          return res.status(200).json(roles);
      } catch (error) {
         return res.status(500).json({ message: messageError(error)});
      }
   }

    getById= async (req: Request, res: Response)=> {
      try {
         const { idRole } = req.params;
         const role = await this.managerRoles.getById(idRole);
         if("message" in role){
            return res.status(404).json(role);
         
         }
         return res.status(200).json(role);
      } catch (error) {
          return res.status(500).json({ message: messageError(error) });
      }
   }

    create= async (req: Request, res: Response)=> {
      try {
         const { roleName } = req.body;
         const role: IRoles = new Role({
            roleName
         });
         const newRole = await this.managerRoles.create(role);
         res.status(201).json(newRole);
      } catch (error) {
         return res.status(500).json({ message: messageError(error) });
      }
   }

    update= async (req: Request, res: Response)=> {
      try {
         const { idRole } = req.params;
         const { name } = req.body;
         const role: IRoles = new Role(name);
         const updateRole = await this.managerRoles.update(idRole, role);
        if("message" in updateRole){
            return res.status(404).json(updateRole);
         }
         return res.status(200).json(updateRole);
      
      } catch (error) {
         return res.status(500).json({ message: messageError(error) });
      }
   }
   

    delete = async (req: Request, res: Response)=> {
      try {
         const { idRole } = req.params;
         const deleteRole = await this.managerRoles.delete(idRole);
         if(!deleteRole){
            return res.status(404).json(deleteRole);
         }
         res.status(204).json(deleteRole);
      } catch (error) {
         return res.status(500).json({ message: messageError(error) });
      }
    }

    
}
