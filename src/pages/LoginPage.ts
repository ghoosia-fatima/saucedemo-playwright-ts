import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  usernameInput = () => this.page.getByTestId('username');
  passwordInput = () => this.page.getByTestId('password');
  loginButton = () => this.page.getByTestId('login-button');
  errorMessage = () => this.page.getByTestId('error');

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}
