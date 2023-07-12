import { Schema,model } from "mongoose";
import IProfileProvider from "../../utils/interfaces/ProfileProvider.interces";



const ProfileProviderSchema = new Schema<IProfileProvider>({
    companyName: {
        type: String,
        required: true,
    },
    companyRepresentative: {
        type: String,
        required: true,
    },
    companyPhone: {
        type: String,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
    },
    relatedChannel:{
        type: String,
        required: true,
    },
    descriptionBusiness: {
        type: String,
        required: true,
    },
    companyAddress: {
        type: String,
        required: true,
    },
    isRegistered:{
        type: Boolean,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    isAuthenticated: {
        type: Boolean,
        default: true
    },
    serviceType:{
        type: String,
        required: false,
    },
    itDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

export default model<IProfileProvider>("ProfileProvider",ProfileProviderSchema);