import { getPrefix } from "@support/shared/utils";
import { NewUser } from "@support/userPage/createDataTypes";

export const getUser = (prefix: string = getPrefix()): NewUser => {
  return {
    username: `Cypress user ${prefix}`,
    password: "strongPassword@123456",
    status: "Enabled",
    userRoleName: "ESS",
    empNumber: 0,
  };
};
