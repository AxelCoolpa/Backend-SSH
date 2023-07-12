import ManagerDB from "./ManagerDB";
import IAccomodation from "../../utils/interfaces/Accomodation.interface";
import Accomodation from "../models/Accomodation";


export default class AccomodationManager extends ManagerDB<IAccomodation> {
    private static instances: AccomodationManager
    
    private constructor() {
        super(Accomodation);
    }
    public static getInstance(): AccomodationManager {
        if (!AccomodationManager.instances) {
            AccomodationManager.instances = new AccomodationManager();
        }
        return AccomodationManager.instances;
    
    }


}