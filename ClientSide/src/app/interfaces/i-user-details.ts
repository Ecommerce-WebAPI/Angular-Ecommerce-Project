export interface IUserDetails {
    id?: string;
    email?: string;
    roles?: string[];
    address?: string;
    lastName?: string;
    firstName?: string;
    phoneNumber?: string;
    profileImage?: string;
    accessFailedCount?: number;
    twoFactorEnabled?: boolean;
    phoneNumberConfirmed?: boolean;
}