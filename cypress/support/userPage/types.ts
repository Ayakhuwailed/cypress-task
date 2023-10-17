export interface UserData {
    empNumber: number;
    password: string;
    status: boolean;
    userRoleId: number;
    username: string;
}

export const UserRoleType = {
    Admin: 1,
    ESS: 2,
} as const;

export type UserStatus = "Enabled" | "Disabled";
