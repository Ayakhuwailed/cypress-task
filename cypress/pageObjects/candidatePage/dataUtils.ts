import { NewCandidate } from "@support/candidatePage/createDataTypes";
import { CandidateResponseData } from "@support/candidatePage/types";
export default class CandidaDataUtils {
  createNewCandidate(
    candidate: NewCandidate,
    vacancyId: number
  ): Cypress.Chainable<number> {
    return this.getCandidateByCandidateFirstName(candidate.firstName)
      .then((data) => {
        if (data) {
          this.deleteCandidateByCandidateFirstName(data.firstName);
        }
        return cy.request({
          method: "POST",
          url: "/api/v2/recruitment/candidates",
          body: { ...candidate, vacancyId: vacancyId },
        });
      })
      .then((res) => {
        return res.body.data.id;
      });
  }

  getCandidateByCandidateFirstName(
    name: string
  ): Cypress.Chainable<CandidateResponseData> {
    return cy
      .request(`/api/v2/recruitment/candidates?candidateName=${name}`)
      .then((res) => {
        return res.body.data;
      });
  }

  deleteCandidateByCandidateFirstName(name: string) {
    this.getCandidateByCandidateFirstName(name).then((res) => {
      if (Array.isArray(res) && res.length !== 0) {
        cy.request({
          method: "DELETE",
          url: "/api/v2/recruitment/candidates",
          body: { ids: [res[0].id] },
        });
      }
    });
  }
}
