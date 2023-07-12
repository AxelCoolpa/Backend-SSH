import { Schema, model } from "mongoose";
import IAccomodation from "../../utils/interfaces/Accomodation.interface";


const rolesSchema = new Schema<IAccomodation>({
    name:{
        type:String,
        required:true,
      
    },
    providerId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    location:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:false,
        
    },
    category:{
        type:[String],
        required:true,
        
    },
    quantity:{
        type:Number,
        required:true,
        
    },
    zone:{
        type:String,
        required:false,
        
    },
    roomsCount:{
        type:Number,
        required:false,
        
    },
    bedsCount:{
        type:Number,
        required:false,
        
    },
    maxOccupancy:{
        type:Number,
        required:false,
        
    },
    bathRoomsCount:{
        type:Number,
        required:false,
        
    },
    amenities:{
        type:[String],
        required:false,
        
    },
    galleryImage: {
        type: [String],
        required: false,
        default: [],
     },
    itDeleted:{
        type:Boolean,
        default:false,
    }

})

export default model<IAccomodation>('Accomodation',rolesSchema)