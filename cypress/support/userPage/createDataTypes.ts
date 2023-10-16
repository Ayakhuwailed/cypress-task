import {UserRoleType,UserStatus} from "@support/userPage/types"

export interface NewUser {
    empNumber: number,
    password: string,
    status: UserStatus,
    userRoleName: keyof typeof UserRoleType,
    username: string
}
