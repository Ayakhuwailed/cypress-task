import { getPrefix } from "@support/shared/utils";
import { NewCandidate } from "@support/candidatePage/createDataTypes";
import moment from "moment";

export const getCandidate = (prefix: string = getPrefix()): NewCandidate => {
  return {
    firstName: `Cypress candidate ${prefix}`,
    lastName: `Cypress candidate ${prefix}`,
    email: `Cypress.candidate@${prefix}.com`,
    dateOfApplication: moment().format("YYYY-MM-DD"),
    consentToKeepData: false,
    vacancyId: 0,
  };
};
