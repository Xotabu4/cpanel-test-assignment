import { Checkout } from "../app/pages/checkout.page";
import { Configure } from "../app/pages/configure.page";
import { cPanelLicenses } from "../app/pages/product.page";
import { Review } from "../app/pages/review.page";
import { Page } from "@playwright/test";

// TODO: probably using anonymous class is not the best idea, declare base page holder class ?
export class Application extends class {
  constructor(protected page: Page) {}
} {
  cPanelLicenses = new cPanelLicenses(this.page);
  configure = new Configure(this.page);
  checkout = new Checkout(this.page);
  review = new Review(this.page);
}
