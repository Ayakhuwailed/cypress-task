import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import CreateCandidateActions from "@pageObjects/candidatePage/actions";
import CreateCandidateAssertions from "@pageObjects/candidatePage/assertions";
import { NewCandidate } from "@support/candidatePage/createDataTypes";
import { getCandidate } from "@support/candidatePage/dataFakers.js";

const createCandidateAction = new CreateCandidateActions(),
  createCandidateAssertion = new CreateCandidateAssertions(),
  candidate: NewCandidate = getCandidate();

Given("User Navigate to Candidate Page", () => {
  createCandidateAction.openAddCandidatePage();
});

When("User Fills The Inputs", () => {
  createCandidateAction.typeInFirstNameInputField(candidate.firstName);
  createCandidateAction.typeInLastNameInputField(candidate.lastName);
  createCandidateAction.typeInEmailInputField(candidate.email);
});

When("Click On Save Button", () => {
  createCandidateAction.clickOnSaveButton();
});

Then("User Should Navigate To Recruitment Page", () => {
  createCandidateAssertion.checkAddCandidatePageIsOpen();
});
