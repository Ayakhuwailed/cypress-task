import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { NewUser } from "@support/userPage/createDataTypes";
import dataUtils from "../../../pageObjects/userPage/dataUtils";

const dataUtil = new dataUtils();

const user: NewUser = {
    username: "ayakh",
    password: "1234aaa",
    status: "Enabled",
    userRoleName: "Admin",
    empNumber: 7,
};

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
