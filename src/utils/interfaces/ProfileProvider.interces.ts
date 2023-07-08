import { Document, ObjectId } from "mongoose";

export default interface IProfileProvider extends Document {
    companyName: string;
    companyRepresentative: string;
    companyPhone: string;
    companyEmail: string;
    relatedChannel: string;
    descriptionBusiness: string;
    companyAddress: string;
    isRegistered: boolean;
    serviceType: string;
    user: ObjectId
    isAuthenticated: boolean
    itDeleted: boolean
    }