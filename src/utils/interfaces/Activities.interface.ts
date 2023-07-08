import { Document, ObjectId } from "mongoose";

export default interface IActivities extends Document {
   title: string;
   description: string;
   location: string;
   galleryImage: string[];
   videoLink: string;
   category: string[];
   starterPack: string[];
   startTime:string;
   endTime:string;
   maxPeople: number
   groupPrice:string;
   individualPrice:string;
   rating:string;
   reviews:string;
   providerId:ObjectId;
   isDeleted:boolean;
  
}
