import { getPrefix } from "@support/shared/utils";
import { NewVacancy } from "@support/vacancyPage/createDataTypes";

export const getVacancy = (prefix: string = getPrefix()): NewVacancy => {
  return {
    name: `Cypress vacancy ${prefix}`,
    jobTitleId: 0,
    employeeId: 0,
    status: true,
    isPublished: true,
  };
};
