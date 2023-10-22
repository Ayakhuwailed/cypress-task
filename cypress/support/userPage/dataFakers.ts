import { getPrefix } from "@support/utils";
import { NewUser } from "@support/userPage/createDataTypes";

export const getUser = (prefix: string = getPrefix()): NewUser => {
  return {
    username: `Cypress test ${prefix}`,
    password: "strongPassword@123456",
    status: "Enabled",
    userRoleName: "ESS",
    empNumber: 0,
  };
};
