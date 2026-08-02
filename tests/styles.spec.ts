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

test("archive cards align with the page content axis", async ({ page }) => {
  await page.goto("/posts");

  const alignment = await page.evaluate(() => {
    const heading = document.querySelector("#main-content h1");
    const cardTitle = document.querySelector(".article-card .card-title");
    const cardDate = document.querySelector(".article-card time");
    const main = document.querySelector("#main-content");

    if (!heading || !cardTitle || !cardDate || !main) {
      throw new Error("Expected archive alignment elements were not rendered");
    }

    const headingRect = heading.getBoundingClientRect();
    const titleRect = cardTitle.getBoundingClientRect();
    const dateRect = cardDate.getBoundingClientRect();
    const mainRect = main.getBoundingClientRect();
    const mainRightContentEdge = mainRect.right - 16;

    return {
      leftDifference: Math.round(titleRect.left - headingRect.left),
      rightDifference: Math.round(mainRightContentEdge - dateRect.right),
    };
  });

  expect(alignment).toEqual({
    leftDifference: 0,
    rightDifference: 0,
  });
});
