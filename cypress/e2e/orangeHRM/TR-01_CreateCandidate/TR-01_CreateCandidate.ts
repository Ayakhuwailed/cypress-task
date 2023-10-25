import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import createCandidateActions from "@pageObjects/candidatePage/TR-01_CreateCandidateActions";
import createCandidateAssertions from "@pageObjects/candidatePage/TR-01_CreateCandidateAssertions";

const createCandidateAction = new createCandidateActions();
const createCandidateAssertion = new createCandidateAssertions();
Given("User Navigate to Candidate Page", () => {
  createCandidateAction.openAddCandidatePage();
});
When("User Fills The Inputs", () => {
  createCandidateAction.typeInFirstNameInputField("test");
  createCandidateAction.typeInLastNameInputField("test");
  createCandidateAction.typeInEmailInputField("test@test.com");
});
When("Click On Save Button", () => {
  createCandidateAction.clickOnSaveButton();
});
Then("User Should Navigate To Recruitment Page", () => {
  createCandidateAssertion.checkAddCandidatePageIsOpen();
});
