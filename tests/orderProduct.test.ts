import { test } from "../fixtures";
import { expect } from "@playwright/test";

const productData = {
  productTitle: "cPanel Solo® Cloud (1 Account)",
  price: 0,
};

const addonData = {
  productTitle: "Monthly CloudLinux for cPanel License",
  price: 0,
};

test("order product", async ({ app }) => {
  await app.productPage.goto();

  productData.price = await app.productPage.orderProductByTitle(
    productData.productTitle
  );

  await app.configurePage.fillIpAddress("2.2.2.2");

  addonData.price = await app.configurePage.selectAddon(addonData.productTitle);

  await expect(
    app.configurePage.getProductInSummaryLocator(productData)
  ).toBeVisible();

  await expect(
    app.configurePage.getProductInSummaryLocator(addonData)
  ).toBeVisible();

  let totalPrice = await app.configurePage.getTotalDueToday();
  expect((productData.price + addonData.price).toFixed(1)).toEqual(
    totalPrice.toFixed(1)
  );

  await app.configurePage.clickContinue();

  const productPrice = await app.reviewPage.getProductPrice(
    productData.productTitle
  );

  const addonPrice = await app.reviewPage.getProductPrice(
    addonData.productTitle
  );
  totalPrice = await app.configurePage.getTotalDueToday();

  expect(productData.price).toEqual(productPrice);
  expect(addonData.price).toEqual(addonPrice);
  expect((productPrice + addonPrice).toFixed(1)).toEqual(totalPrice.toFixed(1));

  await app.reviewPage.clickCheckout();

  for (const cat of [
    "Personal Information",
    "Billing Address",
    "Account Security",
    "Terms & Conditions",
  ]) {
    await expect(
      app.checkoutPage.getCategoryByHeadingLocator(cat)
    ).toBeVisible();
  }

  await expect(app.checkoutPage.orderCompleteButtonLocator).toBeDisabled();
});
