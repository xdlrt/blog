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

test("homepage editorial cards share one content axis", async ({ page }) => {
  await page.goto("/");

  const alignment = await page.evaluate(() => {
    const heading = document.querySelector("#recent-posts .section-heading");
    const cards = document.querySelectorAll("#recent-posts .article-card");
    const firstTitle = cards[0]?.querySelector(".card-title");
    const firstLink = cards[0]?.querySelector("a");
    const secondLink = cards[1]?.querySelector("a");

    if (!heading || !firstTitle || !firstLink || !secondLink) {
      throw new Error("Expected homepage editorial elements were not rendered");
    }

    const headingRect = heading.getBoundingClientRect();
    const firstTitleRect = firstTitle.getBoundingClientRect();
    const firstLinkRect = firstLink.getBoundingClientRect();
    const secondLinkRect = secondLink.getBoundingClientRect();

    return {
      firstLeftDifference: Math.round(
        firstTitleRect.left - headingRect.left
      ),
      cardWidthDifference: Math.round(
        firstLinkRect.width - secondLinkRect.width
      ),
      rowTopDifference: Math.round(firstLinkRect.top - secondLinkRect.top),
    };
  });

  expect(alignment).toEqual({
    firstLeftDifference: 0,
    cardWidthDifference: 0,
    rowTopDifference: 0,
  });
});

test("footer background spans the viewport with aligned inner content", async ({
  page,
}) => {
  await page.goto("/");

  const layout = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    const footerInner = document.querySelector(".footer-shell");
    const recentHeading = document.querySelector(
      "#recent-posts .section-heading"
    );

    if (!footer || !footerInner || !recentHeading) {
      throw new Error("Expected footer alignment elements were not rendered");
    }

    const footerRect = footer.getBoundingClientRect();
    const innerRect = footerInner.getBoundingClientRect();
    const headingRect = recentHeading.getBoundingClientRect();
    const footerStyles = getComputedStyle(footer);

    return {
      footerLeft: Math.round(footerRect.left),
      footerRight: Math.round(window.innerWidth - footerRect.right),
      innerLeftDifference: Math.round(
        innerRect.left + 16 - headingRect.left
      ),
      hasBackground: footerStyles.backgroundColor !== "rgba(0, 0, 0, 0)",
    };
  });

  expect(layout).toEqual({
    footerLeft: 0,
    footerRight: 0,
    innerLeftDifference: 0,
    hasBackground: true,
  });
});
