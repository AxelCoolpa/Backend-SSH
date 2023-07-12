import { Document, ObjectId } from "mongoose";

export default interface IActivities extends Document {
   title: string;
   description: string;
   location: string;
   galleryImage: string[];
   videoLink: string;
   category: string[];
   starterPack: string[];
   startTime:Date;
   endTime:Date;
   maxPeople: number
   groupPrice:string;
   individualPrice:string;
   rating:number;
   reviews:string;
   providerId:ObjectId;
   isDeleted:boolean;
  
}
