export interface ILogin {
    email: string | undefined;
    password: string | undefined;
}
 
export interface IUser {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    _id?: string;
}