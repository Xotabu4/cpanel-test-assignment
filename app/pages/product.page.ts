import { expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { Price } from "../components/price.component";

export class cPanelLicenses extends BasePage {
  private products = this.page.locator(".products .product");

  async getProducts() {
    await expect(
      this.products.first(),
      "Atleast one product must be visible"
    ).toBeVisible();
    return Promise.all(
      (await this.products.all()).map(async (product, index) => ({
        title: await product.locator("header").textContent(),
        // TODO: Will be replaced with Licenses collection component
        price: await new Price(product.locator(".price")).getPrice(),
        index,
      }))
    );
  }
  async order(title: string) {
    await this.products
      .filter({ hasText: title })
      .locator(`a.btn-order-now`)
      .click();
  }
  async open() {
    await this.page.goto("/store/cpanel-licenses");
  }
}
