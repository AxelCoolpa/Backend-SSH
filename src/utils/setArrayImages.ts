import config from "./config/config";


export default function setArrayImages (arrayImages:Array<any>)  {
 return arrayImages.map(
    (e: any) => `${config.baseURL}/api/img/${e.filename}`
 );
}