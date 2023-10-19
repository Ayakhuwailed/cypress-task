import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { NewUser } from "@support/userPage/createDataTypes";
import dataUtils from "../../../pageObjects/userPage/dataUtils";
import { getUser } from "@support/userPage/dataFakers";

const dataUtil = new dataUtils();

const empNumber = 7;
const user: NewUser = { ...getUser(), empNumber };
beforeEach(() => {
  dataUtil.deleteUserByUsername(user.username);
});

Then("Post Request Done", () => {
  dataUtil.createNewUser(user);
});

Then("Search Request Done", () => {
  dataUtil.getUserByUsername(user.username);
});

afterEach(() => {
  dataUtil.deleteUserByUsername(user.username);
});
