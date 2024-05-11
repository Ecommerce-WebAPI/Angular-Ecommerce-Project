export interface IRegisterRequest {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    gender?: number;
    roles?: [string]
}
