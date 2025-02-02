import { test as base } from "@playwright/test";
import { Application } from "../app";

export const test = base.extend<{
  app: Application;
}>({
  app: async ({ page }, use) => {
    await use(new Application(page));
  },
});
