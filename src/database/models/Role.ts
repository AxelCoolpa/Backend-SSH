import { Schema, model } from "mongoose";
import IRoles from "../../utils/interfaces/Roles.Interfaces";


const rolesSchema = new Schema<IRoles>({
    roleName:{
        type:String,
        required:true,
        unique:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    typeRole:{
        type:String,
        required:false,
        
    },
    itDeleted:{
        type:Boolean,
        default:false,
    }

})

export default model<IRoles>('Role',rolesSchema)