import { Document, ObjectId } from "mongoose";
import IRoles from "./Roles.Interfaces";

export default interface IUser extends Document {
   username: string;
   password: string;
   email: string;
   role: ObjectId | IRoles;
   avatar: string;
   firstName: string;
   lastname: string;
   DNI: string;
  phone: string;
   rating: number;
   favorites: object[];
   location: string;
   description: string;
   createdAt: Date;
   updatedAt: Date;
   comparePassword: (arg0: string) => Promise<boolean>;
   itDeleted: boolean;
   profileProvider: ObjectId;   
   sub: string;
   activities: ObjectId[];
}
