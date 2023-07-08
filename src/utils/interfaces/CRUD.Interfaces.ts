import {Document, Model} from "mongoose";

export interface ICRUD< T extends Document >{
    getAll(): Promise<T[] | null>;
    getById(id: string): Promise<T|object>;
    create(obj: any): Promise<T|object>;
    update(id: string,obj: any): Promise<T|object>;
    delete(id: string): Promise<T|null>;
}