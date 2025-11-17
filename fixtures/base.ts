import { test as base } from "@playwright/test"
import {Login} from "@pom/login/login";

interface PageObjects {
    login: Login;
}

const test = base.extend<PageObjects>({
    login: async ({page}, use) => {
        await use(new Login(page))
    }
})

test.afterEach(async ({ page }) => {
    await page.close()
})

export default test;
export const expect = test.expect;