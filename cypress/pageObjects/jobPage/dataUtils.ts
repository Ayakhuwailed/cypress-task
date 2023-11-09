import { createNewJobBody } from "@support/jobPage/constants";
import { NewJob } from "@support/jobPage/createDataTypes";

export default class JobDataUtils {
  createNewJob(job: NewJob): Cypress.Chainable<number> {
    return this.getJobIdByJobName(job.title).then((id) => {
      if (id) {
        this.deletejobByJobName(job.title);
      }
      return cy
        .request({
          method: "POST",
          url: "/api/v2/admin/job-titles",
          body: createNewJobBody(job),
        })
        .then((res) => {
          return res.body.data.id;
        });
    });
  }

  getJobIdByJobName(name: string): Cypress.Chainable<number> {
    return cy
      .request(
        "/api/v2/admin/job-titles?limit=50&offset=0&sortField=jt.jobTitleName&sortOrder=ASC"
      )
      .then(
        (res) =>
          res.body.data.find((job: NewJob) => job.title === name)?.id || null
      );
  }

  deletejobByJobName(name: string) {
    this.getJobIdByJobName(name).then((id) => {
      id
        ? cy.request({
            method: "DELETE",
            url: "/api/v2/admin/job-titles",
            body: { ids: [id] },
          })
        : null;
    });
  }
}
