import { NewCandidate } from "@support/candidatePage/createDataTypes";

export const createNewCandidateBody = (candidate: NewCandidate) => {
  return {
    ...candidate,
    middleName: candidate.middleName || null,
    contactNumber: candidate.contactNumber || null,
    comment: candidate.comment || null,
    keywords: candidate.keywords || null,
  };
};
