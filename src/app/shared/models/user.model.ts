export interface  IUser{
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    weight: number;
    height: number;
    age: number;
    profile_image:string;

    favourites?: any[];
    records:any[];
}