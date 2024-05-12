export interface IUserDetails {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    roles?: string[];
    phoneNumber?: string | null;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    accessFailedCount?: number;
    address?: string;
    profileImage?: string;
}