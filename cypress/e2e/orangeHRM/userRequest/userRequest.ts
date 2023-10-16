import {Then} from "@badeball/cypress-cucumber-preprocessor";
import dataUtils from "../../../pageObjects/userPage/dataUtils"
import {NewUser} from "@support/userPage/createDataTypes";

let dataUtil = new dataUtils()
const user: NewUser =
    {
        username: "ayakh",
        password: "1234aaa",
        status: true,
        userRoleId: 1,
        empNumber: 2
    }
beforeEach(() => {
    cy.then(() => {
        dataUtil.deletesUserByUsername(user.username)
    })
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