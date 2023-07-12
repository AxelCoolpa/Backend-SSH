import { Document, ObjectId } from "mongoose";

export default interface IDestinations extends Document {
  
   title: string;
   description: string;
   location:string
   galleryImage: string;   
   categories: Array<string>;
   activities: Array<ObjectId>;
   itDeleted: boolean;
   accomodations: Array<ObjectId>;
}


