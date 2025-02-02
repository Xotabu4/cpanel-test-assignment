import { Page } from "@playwright/test";

export class BasePage {
  //header will be created

  constructor(protected page: Page) {}
}
