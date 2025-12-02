import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async navigateToMerchandiseWeb() {
        await this.page.goto('https://merchandise-dev.odds.team/');
    }

    async fillUsername(userName: string) {
        await this.page.locator('data-testid=login-field').fill(userName);
    }

    async fillPassword(password: string) {
        await this.page.locator('data-testid=password-field').fill(password);
    }

    async clickLoginButton() {
        await expect(this.page.locator('data-testid=submit-button')).toBeVisible();
        await this.page.locator('data-testid=submit-button').click();
    }
}
