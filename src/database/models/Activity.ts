import { Schema, model } from "mongoose";
import IActivities from "../../utils/interfaces/Activities.interface";

const activitiesSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      location: {
         type: String,
         required: false,
      },
      galleryImage: {
         type: [String],
         required: false,
         default: [],
      },
      videoLink: {
         type: String,
         required: false,
      },
      category: {
         type: [String],
         required: false,
      },
      starterPack: [
         {
            type: String,
            required: false,
         },
      ],
      startTime: [
         {
            type: Date,
            required: false,
         },
      ],
      endTime: [
         {
            type: Date,
            required: false,
         },
      ],
      
      maxPeople:{
         type: Number,
         required: false,
         default: 0,
      },

      groupPrice: {
         type: String,
         required: false,
      },
      individualPrice: {
         type: String,
         required: false,
      },
      rating: {
         type: [Number],
         default: [],
      },
      reviews: {
         type: [String],
         default: [],
      },
      providerId: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
      itDeleted: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true }
);

export default model<IActivities>("Activities", activitiesSchema);
