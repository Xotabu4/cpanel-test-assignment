import { Page } from "@playwright/test";

export class BasePage {
  //header will be created

  constructor(protected page: Page) {}

  protected async goto(url?: string) {
    url = url || "/";

    await this.page.goto(url);
  }
}
