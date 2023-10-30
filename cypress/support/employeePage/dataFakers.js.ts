import { getPrefix } from "@support/shared/utils";
import { NewEmployee } from "@support/employeePage/createDataTypes";

export const getEmployee = (prefix: string = getPrefix()): NewEmployee => {
  return {
    firstName: `Cypress test ${prefix}`,
    lastName: `Cypress test ${prefix}`,
    employeeId: "1234",
  };
};
