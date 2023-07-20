import dotenv from "dotenv";

dotenv.config();

export default{
    port: process.env.PORT,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    stripeKey: process.env.STRIPE_SERCRET_KEY||"",
    DB:{
        URI: process.env.DB_URI || 'mongodb://localhost:27017',
        
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD
    }

}