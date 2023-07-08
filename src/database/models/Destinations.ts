import { Schema, model } from "mongoose";
import IDestinations from "../../utils/interfaces/Destinations.Interfaces";

const DestinosSchema = new Schema<IDestinations>(
   {
      title: {
         type: String,
         required: false,
      },
      description: {
         type: String,
         required: false,
      },
      categories: {
         type: [String],
         required: false,
      },
      location: {
         type: String,
         required: false,
         default: "No especificado",
      },
      activities: [
         {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Activities",
         },
      ],
      galleryImage: {
         type: String,
         required: false,
      },
      itDeleted: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true }
);

export default model<IDestinations>("Destinations", DestinosSchema);
