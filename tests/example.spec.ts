import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { StorePage } from '../pages/store-page';
import { MailPit } from '../pages/mailpit';

test.describe('ODT Merchandise', () => {

  test('Buy merchandise success', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const storePage = new StorePage(page);
    const mailPit = new MailPit(page);

    await loginPage.goToWebsite();
    await loginPage.userNameAndPasswordField('customer1', 'password');
    await loginPage.clickLoginButton();

    await storePage.selectProductAddToCartNumberOfList(0);
    await storePage.selectProductAddToCartNumberOfList(1);
    await storePage.openShoppingCart();
    await storePage.checkoutProductInCart();
    
    await storePage.shippingAddressInfo('kendo', 'koden', 'kendo-email', '99999');
    await storePage.clickConfirmPaymentButton();

    await storePage.verifyThankyouWording();

    await mailPit.goToMailPit();
    await mailPit.verifyReceivedMailSuccess(/^Hi Kendo Koden/);
  });
});