import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "../../utils/interfaces/User.Interfaces";
import { passwordHash } from "../../utils/passwordHash";

const userSchema = new Schema<IUser>({
   username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
   },

   email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
   },

   password: {
      type: String,
      required: false,
      trim: true,
   },

   createdAt: {
      type: Date,
      default: Date.now(),
   },

   updatedAt: {
      type: Date,
      default: Date.now(),
   },

   itDeleted: {
      type: Boolean,
      default: false,
   },
   role: {
      type: {},
      default:{}
   },   
   profileProvider: {
      type: Schema.Types.ObjectId,
      ref: "ProfileProvider",
   },
   activities: {
      type: [Schema.Types.ObjectId],
      ref: "Activities",
      default: [],
   },
   accomodations: [
      {
         type: Schema.Types.ObjectId,
         required: false,
         ref: "Accomodation",
      },
   ],
   avatar: {
      type: String,
      default: "",
   },
   firstName:{
      type: String,
      default: "",
   },
   lastname:{
      type: String,
      default: "",
   },
   DNI:{
      type: String,
      default: "",
   },
   phone:{
      type: String,
      default: "",
   },
   rating:{
      type: Number,
      default: 0,
   },
   favorites:{
      type: [Schema.Types.ObjectId],
      ref: "Destinations",
      default: [],
   },
   location:{
      type: String,
      default: "",
   },
   description:{
      type: String,
      default: "",
   },
   sub: {
      type: String,
      default: "",
   },
},{timestamps: true});

userSchema.pre<IUser>("save", async function (next) {
   const user = this;
   if (!user.isModified("password")) return next();

   user.password = await passwordHash(user.password);
   next();
});

userSchema.methods.comparePassword = async function (
   password: string
): Promise<boolean> {
   return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
