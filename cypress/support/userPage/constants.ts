import { NewUser } from "@support/userPage/createDataTypes";
import { UserRoleType } from "@support/userPage/types";

export const createNewUserBody = (user: NewUser) => {
    const userRoleId = UserRoleType[user.userRoleName];
    return {
        empNumber: user.empNumber,
        password: user.password,
        status: user.status === "Enabled",
        userRoleId,
        username: user.username,
    };
};
