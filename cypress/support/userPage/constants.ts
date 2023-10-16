import {NewUser} from "@support/userPage/createDataTypes";

export const createNewUserBody = (user: NewUser) => {
    return {...user}
};