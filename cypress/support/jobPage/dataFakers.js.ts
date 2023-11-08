import { getPrefix } from "@support/shared/utils";
import { NewJob } from "@support/jobPage/createDataTypes";

export const getJob = (prefix: string = getPrefix()): NewJob => {
  return {
    title: `Cypress job ${prefix}`,
  };
};
