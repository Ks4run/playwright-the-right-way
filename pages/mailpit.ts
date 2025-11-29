import { expect, Page } from "@playwright/test";

export class MailPit {
    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async goToMailPit() {
        await this.page.goto('https://mailpit.odds.team/');
    }

    async verifyReceivedMailSuccess(name: RegExp) {
        await this.page.locator('a:has-text("ODT x merchandise")').first().click();
        await expect(this.page.getByText(name)).toBeVisible();
        await this.page.waitForTimeout(1000);
    }
}