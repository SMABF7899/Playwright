import test from "fixtures/base"
import {Dashboard, Password, Username} from "@pom/login/data";

test.describe('Orange HRM Live', () => {
    test('Test 1', async ({ page, login }) => {
        await page.goto('/')
        await login.validateLoginPageSnapshot()
        await login.loginWithUsername(Username.ADMIN, Password.ADMIN)
        await login.checkLoginSuccessful(Dashboard.Dashboard)
    })
})