import { expect, test } from "@playwright/test";

test("global styles do not fall back to browser defaults", async ({ page }) => {
  await page.goto("http://localhost:4321/");

  const styles = await page.evaluate(() => {
    const recentPosts = document.querySelector("#recent-posts ul");
    const themeButton = document.querySelector("#theme-btn");
    const logo = document.querySelector("header .logo");

    if (!recentPosts || !themeButton || !logo) {
      throw new Error("Expected homepage elements were not rendered");
    }

    const buttonStyles = getComputedStyle(themeButton);

    return {
      bodyMargin: getComputedStyle(document.body).margin,
      listStyleType: getComputedStyle(recentPosts).listStyleType,
      themeButtonBackground: buttonStyles.backgroundColor,
      themeButtonBorderWidth: buttonStyles.borderTopWidth,
      logoOutlineColor: getComputedStyle(logo).outlineColor,
    };
  });

  expect(styles).toEqual({
    bodyMargin: "0px",
    listStyleType: "none",
    themeButtonBackground: "rgba(0, 0, 0, 0)",
    themeButtonBorderWidth: "0px",
    logoOutlineColor: "rgba(0, 0, 0, 0)",
  });
});
