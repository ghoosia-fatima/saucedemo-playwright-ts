import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { users, products, checkoutInfo } from '../src/data/testData';

test.describe('Checkout', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.cartLink().click();
    await cartPage.checkout();
  });

  test('user can complete a purchase', async ({ page }) => {
    await checkoutPage.fillInfo(checkoutInfo);
    await checkoutPage.continueButton().click();
    await checkoutPage.finishButton().click();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader()).toHaveText('Thank you for your order!');
  });

  test('first name is required', async () => {
    await checkoutPage.lastNameInput().fill(checkoutInfo.lastName);
    await checkoutPage.postalCodeInput().fill(checkoutInfo.postalCode);
    await checkoutPage.continueButton().click();

    await expect(checkoutPage.errorMessage()).toContainText('First Name is required');
  });

  // TODO (you): last name is required
  // TODO (you): postal code is required
  // TODO (you): order summary total = item total + tax
  // TODO (you): cancel on the checkout form returns to the cart
});
