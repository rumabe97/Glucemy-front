import {IFood} from "./food.model";
import {IUser} from "./user.model";

export interface IRecords {
    id: string;
    blood_glucose: number;
    carbohydrates: number;
    annotations: string;
    hc_rations: number;
    bolus: number;
    foods: IFood[];
    phasesDay: any;
    user: IUser;
    idUser?: string;
    idFoods?: string[];
    idPhaseDay?: any;
    created_date: string;
}