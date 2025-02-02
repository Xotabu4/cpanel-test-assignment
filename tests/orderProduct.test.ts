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
  await app.cPanelLicenses.open();
  const orderedProduct = (await app.cPanelLicenses.getProducts())[0];
  // TODO: fix type
  await app.cPanelLicenses.order(orderedProduct.title as string);
  await app.configure.fillIpAddress("2.2.2.2");
  addonData.price = await app.configure.selectAddon(addonData.productTitle);

  await expect(
    app.configure.getProductInSummaryLocator(productData)
  ).toBeVisible();

  await expect(
    app.configure.getProductInSummaryLocator(addonData)
  ).toBeVisible();

  let totalPrice = await app.configure.getTotalDueToday();
  expect((productData.price + addonData.price).toFixed(1)).toEqual(
    totalPrice.toFixed(1)
  );

  await app.configure.clickContinue();

  const productPrice = await app.review.getProductPrice(
    productData.productTitle
  );

  const addonPrice = await app.review.getProductPrice(addonData.productTitle);
  totalPrice = await app.configure.getTotalDueToday();

  expect(productData.price).toEqual(productPrice);
  expect(addonData.price).toEqual(addonPrice);
  expect((productPrice + addonPrice).toFixed(1)).toEqual(totalPrice.toFixed(1));

  await app.review.clickCheckout();

  for (const cat of [
    "Personal Information",
    "Billing Address",
    "Account Security",
    "Terms & Conditions",
  ]) {
    await expect(app.checkout.getCategoryByHeadingLocator(cat)).toBeVisible();
  }

  await expect(app.checkout.orderCompleteButtonLocator).toBeDisabled();
});
