import { Document, ObjectId } from "mongoose";

export default interface IAccomodation extends Document {
   name: string;
   description: string;
   location: string;
   images: string[];
   quantity: number;
   category: string;
   zone: string[];
   roomsCount:number;
   bedsCount:number;
   maxOccupancy: number
   bathRoomsCount:number;
   amenities:string[];
   providerId:ObjectId;
   itDeleted:boolean;
   endDate:Date;
   startDate:Date;
   price:number;
  
}