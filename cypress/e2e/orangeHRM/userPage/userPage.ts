import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { NewUser } from "@support/userPage/createDataTypes";
import UserDataUtils from "../../../pageObjects/userPage/dataUtils";
import { getUser } from "@support/userPage/dataFakers";

const dataUtil = new UserDataUtils(),
  empNumber = 7,
  user: NewUser = { ...getUser(), empNumber };

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
