import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { users } from '../src/data/testData';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid user can log in', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(new InventoryPage(page).title()).toHaveText('Products');
  });

  test('locked out user sees an error', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage()).toContainText('locked out');
  });

  // TODO (you): invalid username/password shows "do not match any user" error
  // TODO (you): empty username shows "Username is required"
  // TODO (you): empty password shows "Password is required"
  // TODO (you): logout from the side menu returns to the login page
  // TODO (you): opening /inventory.html without logging in redirects to login
});
