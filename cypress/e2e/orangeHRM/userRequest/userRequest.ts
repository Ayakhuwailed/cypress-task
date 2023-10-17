import {Then} from "@badeball/cypress-cucumber-preprocessor";
import dataUtils from "../../../pageObjects/userPage/dataUtils"
import {NewUser} from "@support/userPage/createDataTypes";

let dataUtil = new dataUtils()
const user: NewUser =
    {
        username: "ayakh",
        password: "1234aaa",
        status: "Enabled",
        userRoleName: "Admin",
        empNumber: 7
    }
beforeEach(() => {
        dataUtil.deletesUserByUsername(user.username)
})
Then('Post Request Done', () => {
    dataUtil.createNewUser(user)
})
Then('Search Request Done', () => {
    dataUtil.getUserByUsername(user.username)
})
afterEach(() => {
    dataUtil.deletesUserByUsername(user.username)
})