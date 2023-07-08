
import { Document, ObjectId } from "mongoose";

export default interface IRoles extends Document {
    _id: ObjectId
    roleName: string    
    user: ObjectId
    typeRole: string
    itDeleted: boolean    
    createdAt: Date
    updatedAt: Date
}