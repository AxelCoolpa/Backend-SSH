import ManagerDB from "./ManagerDB";
import IActivities from "../../utils/interfaces/Activities.interface";
import Activity from "../models/Activity";


export default class ActivitiesManager extends ManagerDB<IActivities> {
    private static instances: ActivitiesManager
    
    private constructor() {
        super(Activity);
    }
    public static getInstance(): ActivitiesManager {
        if (!ActivitiesManager.instances) {
            ActivitiesManager.instances = new ActivitiesManager();
        }
        return ActivitiesManager.instances;
    
    }


}