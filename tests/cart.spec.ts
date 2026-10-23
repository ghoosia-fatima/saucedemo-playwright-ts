import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { users, products } from '../src/data/testData';

test.describe('Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('adding a product updates the cart badge', async () => {
    await inventoryPage.addToCart(products.backpack.slug);

    await expect(inventoryPage.cartBadge()).toHaveText('1');
    await expect(inventoryPage.removeButton(products.backpack.slug)).toBeVisible();
  });

  test('added product appears in the cart', async () => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.cartLink().click();

    await expect(cartPage.items()).toHaveCount(1);
    await expect(cartPage.items()).toContainText(products.backpack.name);
  });

  // TODO (you): adding 2-3 products shows the right badge count
  // TODO (you): removing a product from the cart page empties the cart
  // TODO (you): removing from the inventory page hides the badge
  // TODO (you): cart keeps its items after "Continue Shopping"
});
