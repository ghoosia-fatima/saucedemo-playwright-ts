import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  firstNameInput = () => this.page.getByTestId('firstName');
  lastNameInput = () => this.page.getByTestId('lastName');
  postalCodeInput = () => this.page.getByTestId('postalCode');
  continueButton = () => this.page.getByTestId('continue');
  finishButton = () => this.page.getByTestId('finish');
  errorMessage = () => this.page.getByTestId('error');
  completeHeader = () => this.page.getByTestId('complete-header');

  async fillInfo(info: { firstName: string; lastName: string; postalCode: string }) {
    await this.firstNameInput().fill(info.firstName);
    await this.lastNameInput().fill(info.lastName);
    await this.postalCodeInput().fill(info.postalCode);
  }
}
