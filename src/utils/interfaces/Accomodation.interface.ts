import { Document, ObjectId } from "mongoose";

export default interface IAccomodation extends Document {
   name: string;
   description: string;
   location: string;
   galleryImage: string[];
   quantity: number;
   category: string[];
   zoneType: string;
   rooms:number;
   beds:number;
   maxPeoples: number
   bathRooms:number;
   services:string[];
   providerId:ObjectId;
   itDeleted:boolean;
  
}