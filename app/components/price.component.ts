import { Locator } from "@playwright/test";

export class Price {
  constructor(private price: Locator) {}

  async getPrice() {
    const priceOnPage = await this.price.textContent();
    if (!priceOnPage) {
      throw Error(`Price is null`);
    }
    const parsed = priceOnPage.match(/(.)(\d+\.\d+) (.+) (.+)/);
    if (parsed === null) {
      throw Error(`Can't parse ${priceOnPage}`);
    }

    return {
      symbol: parsed[0],
      value: parsed[1],
      currency: parsed[2],
      period: parsed[3],
    };
  }
}
