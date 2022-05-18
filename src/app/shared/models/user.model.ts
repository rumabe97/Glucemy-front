export interface  IUser{
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    weight: number;
    height: number;
    age: number;

    favourites?: any[];
    records:any[];
}