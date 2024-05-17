export interface IRegisterRequest {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    gender?: number;
    ProfileImage?:string;
    roles?: [string];
}
