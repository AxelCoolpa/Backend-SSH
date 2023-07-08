import { model } from "mongoose";
import  ManagerDB  from "./ManagerDB";
import IRoles from "../../utils/interfaces/Roles.Interfaces";
import Role from "../models/Role";
import MessageError from "../../utils/interfaces/MessageError.interfaces";


export default class ManagerRoles extends ManagerDB<IRoles> {
    private static instance: ManagerRoles;

    
    private constructor(){
        
        super(Role);        
    }
    public static getInstance(): ManagerRoles {
        if (!ManagerRoles.instance) {
            ManagerRoles.instance = new ManagerRoles();
        }
        return ManagerRoles.instance;
    
    }

    async getByName(name: string): Promise<IRoles > {
        try {
            
            const role = await this.model.findOne(
                { roleName: { $regex: new RegExp(name, 'i') } },
                null,
                { collation: { locale: 'en', strength: 2 } }
              );          
              
            return role
        
        } catch (error) {
            throw error;
        }
    }

    
}