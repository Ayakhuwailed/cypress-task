import { createNewVacancyBody } from "@support/vacancyPage/constants";
import { NewVacancy } from "@support/vacancyPage/createDataTypes";
import { VacancyResponseData } from "@support/vacancyPage/types";

export default class VacancyDataUtils {
  createNewVacancy(vacancy: NewVacancy): Cypress.Chainable<number> {
    return this.getVacancyByVacancyName(vacancy.name).then((res) => {
      if (res) {
        this.deleteVacancyByVacancyName(res.name);
      }
      return cy
        .request({
          method: "POST",
          url: "/api/v2/recruitment/vacancies",
          body: createNewVacancyBody(vacancy),
        })
        .then((res) => {
          return res.body.data.id;
        });
    });
  }

  getVacancyIdByVacancyName(name: string): Cypress.Chainable<number> {
    return cy
      .request(
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies?limit=50&offset=0&sortField=vacancy.name&sortOrder=ASC&model=detailed"
      )
      .then((res) => {
        return (
          res.body.data.find((vacancy: NewVacancy) => vacancy.name === name)
            ?.id || null
        );
      });
  }

  getVacancyByVacancyName(
    name: string
  ): Cypress.Chainable<VacancyResponseData> {
    return this.getVacancyIdByVacancyName(name).then((id) => {
      if (id) {
        return cy
          .request(
            `/api/v2/recruitment/vacancies?limit=50&offset=0&vacancyId=${id}&sortField=vacancy.name&sortOrder=ASC&model=detailed`
          )
          .then((res) => {
            return res.body.data[0];
          });
      }
    });
  }

  deleteVacancyByVacancyName(name: string) {
    this.getVacancyByVacancyName(name).then((res) => {
      if (res.name) {
        return cy.request({
          method: "DELETE",
          url: "/api/v2/recruitment/vacancies",
          body: { ids: [res.employeeId] },
        });
      }
    });
  }
}
