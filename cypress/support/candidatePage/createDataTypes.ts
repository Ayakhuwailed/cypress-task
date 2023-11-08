import { consentToKeepData } from "./types";

export interface NewCandidate {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  keywords?: string;
  comment?: string;
  dateOfApplication: string;
  consentToKeepData: consentToKeepData;
  vacancyId: number;
}
