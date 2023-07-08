import dotenv from "dotenv";
dotenv.config();
import { Strategy as Auth0Strategy, StrategyOption } from "passport-auth0";
import User from "../../database/models/User";

import passport from "passport";

const options: StrategyOption = {
   clientID: process.env.AUTH0_CLIENT_ID || "",
   clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
   callbackURL: "http://localhost:3000/api/callback",
   domain: process.env.AUTH0_DOMAIN || "",
   state: true
};

export default new Auth0Strategy(
   options,
   // aqui se manejan los datos del usuario y se almasenan en la ase de datos
   async function (
      accessToken: any,
      refreshToken: any,
      extraParams: any,
      profile: any,
      done: any
   ) {
      let user = await User.findOne({
         $or: [{ sub: profile.id }, { email: profile.emails[0].value }],
      });

      if (!user) {
         
         const userRegistre = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            sub: profile.id,
         });
         // await userRegistre.save();
      }
      return done(null, profile);
   }
);

export const serializarUser = passport.serializeUser((user: any, done: any) => {
   done(null, user.id);
});

export const deserializeUser = passport.deserializeUser(function (
   id: string,
   done: any
) {
   User.findOne({ sub: id }, (err: any, user: any) => {
      done(err, user);
   });
});
