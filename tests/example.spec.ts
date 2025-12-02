import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { StorePage } from '../pages/store-page';
import { MailPit } from '../pages/mailpit';

test.describe('Login Functionality', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToMerchandiseWeb();
        await loginPage.fillUsername('customer1');
        await loginPage.fillPassword('password');
        await loginPage.clickLoginButton();
    });

    test('TC-001: ตรวจสอบการแสดงรายการสินค้า', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.productWillBeShow(0);
    });

    test('TC-002: ตรวจสอบราคาสินค้าถูกต้อง', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.verifyProductPrice(0, '0000000001', 'TerraFlex Hoodie', '79.69');
    });

    test('TC-003: เพิ่มสินค้าลงในตะกร้า', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.clickAddToCartButton(0);
        await storePage.verifyNumberOfCart('1');
    });

    test('TC-004: ลบสินค้าจากตะกร้า', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.clickAddToCartButton(0);
        await storePage.clickRemoveFromCartButton(0);
        await storePage.verifyNumberOfCart('0');
    });

    test('TC-005: ตรวจสอบจำนวนสินค้าในตะกร้าแสดงถูกต้อง', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.clickAddToCartButton(0);
        await storePage.clickAddToCartButton(1);
        await storePage.clickAddToCartButton(2);
        await storePage.verifyNumberOfCart('3');
    });

    test('TC-006: ตรวจสอบการเปลี่ยนหน้า pagination', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.clickNextPageButton();
        await storePage.verifyCurrentPage('2');
        await expect(page).toHaveURL('https://merchandise-dev.odds.team/store.html?page=2');
    });
});

// const mailPit = new MailPit(page);

// await storePage.selectProductAddToCartNumberOfList(0);
// await storePage.selectProductAddToCartNumberOfList(1);
// await storePage.openShoppingCart();
// await storePage.checkoutProductInCart();

// await storePage.shippingAddressInfo('kendo', 'koden', 'kendo-email', '99999');
// await storePage.clickConfirmPaymentButton();

// await storePage.verifyThankyouWording();

// await mailPit.goToMailPit();
// await mailPit.verifyReceivedMailSuccess(/^Hi Kendo Koden/);
