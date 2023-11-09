import {
  Given,
  Then,
  When,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";
import RecruitmentPageActions from "@pageObjects/recruitmentPage/actions";
import RecruitmentPageAssertions from "@pageObjects/recruitmentPage/assertions";
import RecruitmentDataUtils from "@pageObjects/recruitmentPage/dataUtils";
import EmployeeDataUtils from "@pageObjects/employeePage/dataUtils";
import JobDataUtils from "@pageObjects/jobPage/dataUtils";
import VacancyDataUtils from "@pageObjects/vacancyPage/dataUtils";
import { NewCandidate } from "@support/candidatePage/createDataTypes";
import { getCandidate } from "@support/candidatePage/dataFakers.js.js";
import { NewEmployee } from "@support/employeePage/createDataTypes";
import { getEmployee } from "@support/employeePage/dataFakers.js";
import { NewInterview } from "@support/interviewPage/createDataTypes";
import { getInterview } from "@support/interviewPage/dataFakers.js";
import { NewJob } from "@support/jobPage/createDataTypes";
import { getJob } from "@support/jobPage/dataFakers.js";
import { NewVacancy } from "@support/vacancyPage/createDataTypes";
import { getVacancy } from "@support/vacancyPage/dataFakers.js";
import CandidateDataUtils from "@pageObjects/candidatePage/dataUtils";
import CandidatePageActions from "@pageObjects/candidatePage/actions";
import CandidatePageAssertions from "@pageObjects/candidatePage/assertions";

const recruitmentPageActions = new RecruitmentPageActions(),
  recruitmentPageAssertions = new RecruitmentPageAssertions(),
  candidatePageActions = new CandidatePageActions(),
  candidatePageAssertions = new CandidatePageAssertions(),
  recruitmentDataUtils = new RecruitmentDataUtils(),
  jobDataUtils = new JobDataUtils(),
  employeeDataUtils = new EmployeeDataUtils(),
  vacancyDataUtils = new VacancyDataUtils(),
  candidateDataUtils = new CandidateDataUtils(),
  job: NewJob = getJob(),
  employee: NewEmployee = getEmployee(),
  candidate: NewCandidate = getCandidate(),
  interview: NewInterview = getInterview(),
  CANDIDATE_STATUS_MAPPING = {
    APPLICATION_INITIATED: "Application Initiated",
    SHORTLISTED: "Shortlisted",
    SCHEDULE_FIRST_INTERVIEW: "Schedule First Interview",
    FIRST_INTERVIEW_FAILED: "First Interview Failed",
    FIRST_INTERVIEW_PASSED: "First Interview Passed",
    SCHEDULE_SECOND_INTERVIEW: "Schedule Second Interview",
    SECOND_INTERVIEW_FAILED: "Second Interview Failed",
    SECOND_INTERVIEW_PASSED: "Second Interview Passed",
    JOB_OFFERED_AFTER_PASSED_FIRST_INTERVIEW:
      "Job Offered after Passed First Interview",
    JOB_OFFERED_AFTER_PASSED_SECOND_INTERVIEW:
      "Job Offered after Passed Second Interview",
    DECLINED_JOB_OFFER_AFTER_PASSED_FIRST_INTERVIEW:
      "Declined Job Offer after Passed First Interview",
    DECLINED_JOB_OFFER_AFTER_PASSED_SECOND_INTERVIEW:
      "Declined Job Offer after Passed Second Interview",
  };

let jobTitleId: number,
  vacancyId: number,
  candidateId: number,
  empNumber: number,
  interviewId: number,
  vacancy: NewVacancy = {
    ...getVacancy(),
  };

beforeEach(() => {
  jobDataUtils.createNewJob(job).then((res) => {
    jobTitleId = res;
  });
  employeeDataUtils.createNewEmployee(employee).then((res) => {
    empNumber = res;
    vacancy = {
      ...getVacancy(),
      employeeId: res,
      jobTitleId: jobTitleId,
    };
    vacancyDataUtils.createNewVacancy(vacancy).then((res) => {
      vacancyId = res;
    });
  });
});

Given("User Navigate to Candidate Page", () => {
  candidatePageActions.openAddCandidatePage();
});

When("User Fills The Inputs", () => {
  candidatePageActions.typeInFirstNameInputField(candidate.firstName);
  candidatePageActions.typeInLastNameInputField(candidate.lastName);
  candidatePageActions.typeInEmailInputField(candidate.email);
  candidatePageActions.selectVacancyName(vacancy.name);
});

When("Clicks On Save Button", () => {
  candidatePageActions.clickOnSaveButton();
});

Then("The User Should Navigate To Recruitment Page", () => {
  candidatePageAssertions.checkAddCandidatePageIsOpen();
});

Then("The Candidate should Move to the {string} Status", (status: string) => {
  recruitmentPageAssertions.checkCandidateStatus(status);
});

Given("The System has Candidate With {string} Status", (status) => {
  candidateDataUtils
    .createNewCandidate(candidate, vacancyId)
    .then((res) => (candidateId = res))
    .then(() => {
      switch (status) {
        case CANDIDATE_STATUS_MAPPING.APPLICATION_INITIATED:
          break;
        case CANDIDATE_STATUS_MAPPING.SHORTLISTED:
          recruitmentDataUtils.setCandidateVacancyShortlistStatus(candidateId);
          break;
        case CANDIDATE_STATUS_MAPPING.SCHEDULE_FIRST_INTERVIEW:
          cy.then(() => {
            recruitmentDataUtils.setCandidateVacancyScheduleInterviewStatus(
              candidateId,
              interview,
              empNumber,
              "first"
            );
          }).then((res) => {
            interviewId = res;
          });
          break;
        case CANDIDATE_STATUS_MAPPING.FIRST_INTERVIEW_FAILED:
          cy.then(() => {
            recruitmentDataUtils.setCandidateVacancyInterviewStatus(
              "first",
              candidateId,
              interview,
              empNumber,
              "fail"
            );
          }).then((res) => {
            interviewId = res;
          });
          break;
        case CANDIDATE_STATUS_MAPPING.FIRST_INTERVIEW_PASSED:
          cy.then(() => {
            recruitmentDataUtils.setCandidateVacancyInterviewStatus(
              "first",
              candidateId,
              interview,
              empNumber,
              "pass"
            );
          }).then((res) => {
            interviewId = res;
          });
          break;
        case CANDIDATE_STATUS_MAPPING.SCHEDULE_SECOND_INTERVIEW:
          cy.then(() => {
            recruitmentDataUtils.setCandidateVacancyScheduleInterviewStatus(
              candidateId,
              interview,
              empNumber,
              "second"
            );
          }).then((res) => {
            interviewId = res;
          });
          break;
        case CANDIDATE_STATUS_MAPPING.SECOND_INTERVIEW_PASSED:
          cy.then(() => {
            recruitmentDataUtils.setCandidateVacancyInterviewStatus(
              "second",
              candidateId,
              interview,
              empNumber,
              "pass"
            );
          }).then((res) => {
            interviewId = res;
          });
          break;
        case CANDIDATE_STATUS_MAPPING.SECOND_INTERVIEW_FAILED:
          cy.then(() => {
            recruitmentDataUtils.setCandidateVacancyInterviewStatus(
              "second",
              candidateId,
              interview,
              empNumber,
              "fail"
            );
          }).then((res) => {
            interviewId = res;
          });
          break;
        case CANDIDATE_STATUS_MAPPING.JOB_OFFERED_AFTER_PASSED_FIRST_INTERVIEW:
          recruitmentDataUtils.setCandidateVacancyJobOfferStatus(
            "first",
            candidateId,
            interview,
            empNumber
          );
          break;
        case CANDIDATE_STATUS_MAPPING.JOB_OFFERED_AFTER_PASSED_SECOND_INTERVIEW:
          recruitmentDataUtils.setCandidateVacancyJobOfferStatus(
            "second",
            candidateId,
            interview,
            empNumber
          );
          break;
        case CANDIDATE_STATUS_MAPPING.DECLINED_JOB_OFFER_AFTER_PASSED_FIRST_INTERVIEW:
          recruitmentDataUtils.setCandidateVacancyDeclinedOfferStatus(
            "first",
            candidateId,
            interview,
            empNumber
          );
          break;
        case CANDIDATE_STATUS_MAPPING.DECLINED_JOB_OFFER_AFTER_PASSED_SECOND_INTERVIEW:
          recruitmentDataUtils.setCandidateVacancyDeclinedOfferStatus(
            "second",
            candidateId,
            interview,
            empNumber
          );
          break;
      }
    });
});

When("Submit the {string} Form", (status: string) => {
  status === "Schedule Interview"
    ? recruitmentPageActions
        .typeInInterviewTitleInputField(interview.interviewName)
        .typeInInterviewerNameInputField(employee.firstName)
        .typeInInterviewDateInputField(interview.interviewDate)
    : null;
  candidatePageActions.clickOnSaveButton();
});

When("The Admin Opens the Application Stage Page", () => {
  recruitmentPageActions.openApplicationStagePage(candidateId);
});

When("The User Clicks on {string} Button", (buttonName: string) => {
  cy.intercept("/web/index.php/api/v2/leave/workweek***").as("workweek");
  cy.intercept("/web/index.php/api/v2/leave/holidays***").as("holidays");
  recruitmentPageActions.clickOnButtonStatus(buttonName);
  buttonName === "Schedule Interview" && cy.wait(["@workweek", "@holidays"]);
});

Then("The {string} Page should Open", (text: string) => {
  recruitmentPageAssertions.checkStatusPageIsOpen(text);
});

Then(
  "The User {string} See the {string} Button",
  (exist, buttonName: string) => {
    const isExist = exist === "Should";
    recruitmentPageAssertions.checkStatusButtonIsExist(isExist, buttonName);
  }
);

Then(
  "The User {string} See the Following Buttons:",
  (exist, table: DataTable) => {
    const isExist = exist === "Should";
    table.hashes().forEach((data) => {
      recruitmentPageAssertions.checkStatusButtonIsExist(
        isExist,
        data.buttonName
      );
    });
  }
);

afterEach(() => {
  candidateDataUtils.deleteCandidateByCandidateFirstName(candidate.firstName);
  vacancyDataUtils.deleteVacancyByVacancyName(vacancy.name);
  employeeDataUtils.deleteEmployeeByEmployeeId(employee.employeeId);
  jobDataUtils.deletejobByJobName(job.title);
});
