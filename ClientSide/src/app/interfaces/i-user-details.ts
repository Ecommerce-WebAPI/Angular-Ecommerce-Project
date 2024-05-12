export interface IUserDetails {
    Id?: string;
    FirstName?: string;
    LastName?: string;
    Email?: string;
    Roles?: string[];
    PhoneNumber?: string;
    PhoneNumberConfirmed?: true;
    TwoFactorEnabled?: true;
    AccessFailedCount?: 0;
    Address?: string;
    ProfileImage?: string;
}