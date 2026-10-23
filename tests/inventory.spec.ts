import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { users } from '../src/data/testData';

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('shows 6 products', async () => {
    await expect(inventoryPage.items()).toHaveCount(6);
  });

  test('sort by price low to high', async () => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  // TODO (you): sort by price high to low
  // TODO (you): sort by name A to Z and Z to A (hint: add a getNames() helper to InventoryPage)
  // TODO (you): clicking a product name opens its details page with the right name and price
});
