import { expect, Page } from '@playwright/test';

export class StorePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectProductAddToCartNumberOfList(index: number) {
        await this.page.getByTestId('add-to-cart-button').nth(index).click();
    }

    async openShoppingCart() {
        await this.page.getByTestId('cart').locator('#Layer_1').click();
    }

    async checkoutProductInCart() {
        const locator = this.page.getByTestId('checkout-button');
        await expect(locator).toBeVisible();
        await locator.click();
    }

    async shippingAddressInfo(firstName: string, lastName: string, email: string, zipCode: string) {
        await this.page.locator('data-testid=firstname-field').fill(firstName);
        await this.page.locator('data-testid=lastname-field').fill(lastName);
        await this.page.locator('data-testid=email-field').fill(`${email}@mailinator.com`);
        await this.page.locator('data-testid=zipcode-field').fill(zipCode);
    }

    async clickConfirmPaymentButton() {
        const locator = this.page.getByTestId('confirm-payment-button');
        await expect(locator).toBeVisible();
        await locator.click();
    }

    async verifyThankyouWording() {
        await expect(this.page.locator('#thank-you-container')).toBeVisible();
    }
}