import mongoose from "mongoose";
import config from "./utils/config/config";

export default class DB {
    private readonly db: mongoose.Connection;

    constructor() {
        this.db = mongoose.connection;
    }

    public async connect(): Promise<void> {
     await mongoose.connect(config.DB.URI);

        this.db.on("error", console.error.bind(console, "connection error:"));
        await new Promise<void>((resolve) => {
            this.db.once("open", () => {
                console.log("MongoDB database connection established successfully");
                resolve();
            });
        });
    }
}
