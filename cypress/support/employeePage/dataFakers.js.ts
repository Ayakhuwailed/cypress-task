import { getPrefix } from "@support/shared/utils";
import { NewEmployee } from "@support/employeePage/createDataTypes";

export const getEmployee = (prefix: string = getPrefix()): NewEmployee => {
  return {
    firstName: `Cypress employee ${prefix}`,
    lastName: `Cypress employee ${prefix}`,
    employeeId: "1234",
  };
};
