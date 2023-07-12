import ManagerDB from "./ManagerDB";
import IActivities from "../../utils/interfaces/Activities.interface";
import Activity from "../models/Activity";
import filterOfTime from "../../utils/filterOfTime";


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

    public async getByCategory(categories: any[]){
        try {
            return this.model.find({category: {$in: categories}});
        } catch (error) {
            throw error;
        }
        }

    public async filterActivitiesOftime(startDate:string,endDate:string){
        try {
            const activities = await this.getAll();
            return filterOfTime(startDate, endDate, activities);
        } catch (error) {
            throw error;
        }
    }
    


}