import multer, { Multer } from "multer";

export default class MulterConfig {
    private readonly multerConfig: Multer;

    constructor() {
        this.multerConfig = multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => cb(null, "upload"),
                filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
             }),
        })
    }

    public getMulterConfig(): Multer {
        return this.multerConfig;
    }

}