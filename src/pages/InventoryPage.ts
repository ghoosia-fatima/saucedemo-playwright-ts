import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  title = () => this.page.getByTestId('title');
  items = () => this.page.getByTestId('inventory-item');
  itemPrices = () => this.page.getByTestId('inventory-item-price');
  sortDropdown = () => this.page.getByTestId('product-sort-container');
  cartBadge = () => this.page.getByTestId('shopping-cart-badge');
  cartLink = () => this.page.getByTestId('shopping-cart-link');

  addToCartButton = (slug: string) => this.page.getByTestId(`add-to-cart-${slug}`);
  removeButton = (slug: string) => this.page.getByTestId(`remove-${slug}`);

  async addToCart(slug: string) {
    await this.addToCartButton(slug).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown().selectOption(option);
  }

  async getPrices() {
    const texts = await this.itemPrices().allInnerTexts();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }
}
