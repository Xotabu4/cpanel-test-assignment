import { Checkout } from "../app/pages/checkout.page";
import { Configure } from "../app/pages/configure.page";
import { Product } from "../app/pages/product.page";
import { Review } from "../app/pages/review.page";
import { Page } from "@playwright/test";

// TODO: probably using anonymous class is not the best idea, declare base page holder class ?
export class Application extends class {
  constructor(protected page: Page) {}
} {
  productPage = new Product(this.page);
  configurePage = new Configure(this.page);
  checkoutPage = new Checkout(this.page);
  reviewPage = new Review(this.page);
}
