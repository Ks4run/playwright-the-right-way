import { expect, Page } from '@playwright/test';

export class StorePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async productWillBeShow(index: number) {
        await expect(this.page.getByTestId('sku').nth(index)).toBeVisible();
        await expect(this.page.getByTestId('title').nth(index)).toBeVisible();
        await expect(this.page.getByTestId('price').nth(index)).toBeVisible();
        await expect(this.page.getByTestId('add-to-cart-button').nth(index)).toBeVisible();
    }

    async verifyProductPrice(index: number, sku: string, nameProduct: string, price: string) {
        await expect(this.page.getByTestId('sku').nth(index)).toHaveText(sku);
        await expect(this.page.getByTestId('title').nth(index)).toHaveText(nameProduct);
        await expect(this.page.getByTestId('price').nth(index)).toHaveText(price);
    }

    async clickAddToCartButton(index: number) {
        await this.page.getByTestId('add-to-cart-button').nth(index).click();
    }
    async clickRemoveFromCartButton(index: number) {
        await this.page.getByTestId('remove-from-cart-button').nth(index).click();
    }

    async verifyNumberOfCart(item: string) {
        await expect(this.page.getByTestId('cart-items-count')).toHaveText(item);
    }

    async clickNextPageButton() {
        await this.page.getByTestId('next-page-button').first().click({ force: true });
    }

    async verifyPagesNumber(page: string) {
        await expect(this.page.locator('#top-controller-container > div.flex.flex-row.gap-2.items-center > div > span:nth-child(2)')).toContainText(page);
    }

    async clickMenuButton() {
        await this.page.getByTestId('menu').click({ force: true });
    }

    async clickLogOut() {
        await this.page.getByRole('link', { name: 'Log Out' }).click();
    }

    async verifyProductDetail(index: number, nameProduct: string, description: string) {
        await expect(this.page.getByTestId('title').nth(index)).toHaveText(nameProduct);
        await expect(this.page.getByTestId('description').nth(index)).toHaveText(description);
    }

    async verifyStorePageBeVisible(index: number) {
        await expect(this.page.getByTestId('title').nth(index)).toBeVisible();
        await expect(this.page.locator('#Layer_1').nth(1)).toBeEnabled();
        await this.page.getByTestId('menu').click({ force: true });
        await expect(this.page.getByRole('link', { name: 'Log Out' })).toBeVisible();
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
