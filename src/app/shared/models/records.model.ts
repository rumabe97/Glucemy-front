import {IFood} from "./food.model";
import {IUser} from "./user.model";

export interface IRecords {
    id: string;
    blood_glucose: number;
    carbohydrates: number;
    annotation: string;
    foods: IFood[];
    phases_day: any;
    user: IUser;
    idUser?: string;
    idFood?: string;
    idPhaseDay?: string;
}