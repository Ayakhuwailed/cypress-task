import {NewUser} from "@support/userPage/createDataTypes";
import {UserData} from "@support/userPage/types";
import {createNewUserBody} from "@support/userPage/constants";

export default class DataUtils {
    createNewUser(user: NewUser) {
        return this.getUserByUsername((user.username)).then((data) => {
                this.deletesUserByUsername(data.username)
                return cy.request({
                    method: 'POST', url: '/api/v2/admin/users', body: createNewUserBody(user)
                })
            })
    }
    deletesUserByUsername(username: string) {
        this.getUserByUsername(username).then((res) => {
            if (Array.isArray(res) && res.length === 0) {
                return
            } else {
                cy.request({
                    method: 'DELETE', url: '/api/v2/admin/users',
                    body: {ids: [res[0].id]}
                })
            }

        })

    }
    getUserByUsername(username: string): Cypress.Chainable<UserData> {
        return cy.request(`/api/v2/admin/users?limit=50&offset=0&username=${username}&sortField=u.userName&sortOrder=ASC`).then((res) => {
            return res.body.data
        })
    }
}