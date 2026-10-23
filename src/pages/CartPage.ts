import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  items = () => this.page.getByTestId('inventory-item');
  checkoutButton = () => this.page.getByTestId('checkout');

  async removeItem(slug: string) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async checkout() {
    await this.checkoutButton().click();
  }
}
