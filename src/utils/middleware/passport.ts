import { ExtractJwt, Strategy, StrategyOptions  } from "passport-jwt";
import config from "../config/config";
import  UserManager  from "../../database/manager/ManagerUsers";


const usersManager = UserManager.getInstance();

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(options, async (payload, done) => {

    try {
        
        const user = await usersManager.getById(payload.id);
        
        if (user) {
            return done(null, user);
        }
        return done(null, { error: "User not found"});
    } catch (error) {
        
        return done(error, false);
    }
}
);



