import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { StorePage } from '../pages/store-page';
import { MailPit } from '../pages/mailpit';

test.describe('ODT x Merchandise', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        if (testInfo.title != 'TC-008: ตรวจสอบการเข้าถึงเมื่อไม่ได้ login') {
            const loginPage = new LoginPage(page);
            await loginPage.navigateToMerchandiseWeb();
            await loginPage.fillUsername('customer1');
            await loginPage.fillPassword('password');
            await loginPage.clickLoginButton();
        }
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
        await storePage.verifyPagesNumber('1');
        await storePage.clickNextPageButton();
        await storePage.verifyPagesNumber('2');
    });

    test('TC-007: ตรวจสอบปุ่ม “Log Out”', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.clickMenuButton();
        await storePage.clickLogOut();
        await expect(page).toHaveURL('https://merchandise-dev.odds.team/index.html');
    });

    test('TC-008: ตรวจสอบการเข้าถึงเมื่อไม่ได้ login', async ({ page }) => {
        await page.goto('https://merchandise-dev.odds.team/store.html');
        await expect(page).toHaveURL('https://merchandise-dev.odds.team/index.html');
    });

    test('TC-009: ตรวจสอบข้อความสินค้าแต่ละประเภท', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.verifyProductDetail(0, 'TerraFlex Hoodie', `Men's hoodie for gym. Crafted from recycled polyester with regular fit; made with recycled fibers.`);
    });

    test('TC-010: ตรวจสอบความเข้ากันของ UI', async ({ page }) => {
        const storePage = new StorePage(page);
        await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        await storePage.verifyStorePageBeVisible(0);
        await storePage.verifyStorePageBeVisible(1);
        await storePage.verifyStorePageBeVisible(2);
    });
});
