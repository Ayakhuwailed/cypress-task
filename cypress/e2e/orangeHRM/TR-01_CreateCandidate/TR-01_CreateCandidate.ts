import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import {getPrefix} from "@support/utils";
import createCandidateActions from "../../../pageObjects/TR-01_CreateCandidate/TR-01_CreateCandidateActions"
import createCandidateAssertions from "../../../pageObjects/TR-01_CreateCandidate/TR-01_CreateCandidateAssertions"

const createCandidateAction=new createCandidateActions()
const createCandidateAssertion=new createCandidateAssertions()
Given("User Navigate to Candidate Page",()=>{
   createCandidateAction.navigateToCandidatePage()
})
When("User Fills The Inputs",()=>{
    createCandidateAction.fillsInputs()
})
When("Click On Save Button",()=>{
    createCandidateAction.clickOnSaveButton()
})
Then("User Should Navigate To Recruitment Page",()=>{
    createCandidateAssertion.navigateToRecruitmentPage()
})
