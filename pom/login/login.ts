import { expect, type Locator, type Page } from "@playwright/test";
import {LoginPageSnapshots} from "./data";
import {HighlightedLocator} from "@common/utils";

export class Login {
    readonly page: Page;
    readonly usernameField: HighlightedLocator;
    readonly passwordField: HighlightedLocator;
    readonly loginButton: HighlightedLocator;
    readonly dashboardHeader: HighlightedLocator;


    constructor(page: Page) {
        this.page = page;
        this.usernameField = new HighlightedLocator(this.page.getByRole('textbox', { name: 'Username' }));
        this.passwordField = new HighlightedLocator(this.page.getByRole('textbox', { name: 'Password' }));
        this.loginButton = new HighlightedLocator(this.page.getByRole('button', { name: 'Login' }));
        this.dashboardHeader = new HighlightedLocator(this.page.getByRole('heading', { name: 'Dashboard' }));
    }

    async validateLoginPageSnapshot() {
        await expect(this.page.locator("body")).toMatchAriaSnapshot(LoginPageSnapshots);
    }

    async loginWithUsername(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.usernameField.toHaveValue(username);
        await this.passwordField.fill(password);
        await this.passwordField.toHaveValue(password);
        await this.loginButton.click();
    }

    async checkLoginSuccessful(dashboardText: string) {
        await this.dashboardHeader.toHaveText(dashboardText);
    }
}