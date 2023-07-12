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
        type:String,
        required:false,
        
    },
    quantity:{
        type:Number,
        required:false,
        
    },
    zone:{
        type:[String],
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
    images: {
        type: [String],
        required: false,
        default: [],
     },

     endDate:{
        type:Date,
        required:true
     },
     startDate:{
        type:Date,  
        required:true
     },
     price:{
        type:Number,
        required:true
     },

    itDeleted:{
        type:Boolean,
        default:false,
    }

})

export default model<IAccomodation>('Accomodation',rolesSchema)