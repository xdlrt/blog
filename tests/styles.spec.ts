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
    const leadTitle = document.querySelector(
      "#recent-posts .article-card-lead .card-title"
    );
    const leadDate = document.querySelector(
      "#recent-posts .article-card-lead time"
    );
    const leadLink = document.querySelector(
      "#recent-posts .article-card-lead > a"
    );
    const regularTitle = document.querySelector(
      "#recent-posts .article-card:not(.article-card-lead) .card-title"
    );
    const regularLink = document.querySelector(
      "#recent-posts .article-card:not(.article-card-lead) > a"
    );

    if (
      !heading ||
      !leadTitle ||
      !leadDate ||
      !leadLink ||
      !regularTitle ||
      !regularLink
    ) {
      throw new Error("Expected homepage editorial elements were not rendered");
    }

    const headingRect = heading.getBoundingClientRect();
    const leadTitleRect = leadTitle.getBoundingClientRect();
    const leadDateRect = leadDate.getBoundingClientRect();
    const leadLinkRect = leadLink.getBoundingClientRect();
    const regularTitleRect = regularTitle.getBoundingClientRect();
    const regularLinkRect = regularLink.getBoundingClientRect();

    return {
      leadLeftDifference: Math.round(leadTitleRect.left - headingRect.left),
      regularLeftDifference: Math.round(
        regularTitleRect.left - headingRect.left
      ),
      leadRightDifference: Math.round(headingRect.right - leadDateRect.right),
      hoverEdgeDifference: Math.round(
        regularLinkRect.left - leadLinkRect.left
      ),
    };
  });

  expect(alignment).toEqual({
    leadLeftDifference: 0,
    regularLeftDifference: 0,
    leadRightDifference: 0,
    hoverEdgeDifference: 0,
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
