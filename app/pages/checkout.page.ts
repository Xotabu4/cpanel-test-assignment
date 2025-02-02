import { BasePage } from "./base.page";

export class Checkout extends BasePage {
  getCategoryByHeadingLocator = (heading: string) =>
    this.page.locator(".sub-heading").getByText(heading);

  orderCompleteButtonLocator = this.page.locator("#btnCompleteOrder");
}
