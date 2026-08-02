import { expect, test } from "@playwright/test";

test.describe("responsive display controls", () => {
  test("640–767 keeps touch-first navigation and pagination", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto("/posts/8");

    const menuButton = page.getByTestId("header-menu");
    const menuItems = page.locator("#menu-items");
    const desktopPagination = page.locator(".desktop-pagination");
    const mobilePagination = page.locator(".mobile-pagination");

    await expect(menuButton).toBeVisible();
    await expect(menuItems).toBeHidden();
    await expect(desktopPagination).toBeHidden();
    await expect(mobilePagination).toBeVisible();

    const menuButtonBox = await menuButton.boundingBox();
    expect(menuButtonBox?.width).toBeGreaterThanOrEqual(44);
    expect(menuButtonBox?.height).toBeGreaterThanOrEqual(44);

    await menuButton.click();
    await expect(menuItems).toBeVisible();
  });

  test("768 desktop header keeps every visible target at least 44px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await page.goto("/");

    await expect(page.getByTestId("header-menu")).toBeHidden();
    await expect(page.locator("#menu-items")).toBeVisible();

    const undersizedTargets = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>("header a, header button"))
        .filter(element => {
          const styles = getComputedStyle(element);
          return styles.display !== "none" && styles.visibility !== "hidden";
        })
        .map(element => {
          const rect = element.getBoundingClientRect();
          return {
            label:
              element.getAttribute("aria-label") ||
              element.textContent?.trim() ||
              element.tagName,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        })
        .filter(target => target.width < 44 || target.height < 44)
    );

    expect(undersizedTargets).toEqual([]);
  });

  test("phone pagination shows a visible select indicator", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/posts/8");

    const pageSelect = page.getByLabel("选择页码");
    const indicator = page.getByTestId("page-select-indicator");

    await expect(pageSelect).toBeVisible();
    await expect(indicator).toBeVisible();
    await expect(indicator).toHaveText("▾");
  });

  test("wide display shells share the public layout width", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/posts/8");
    await page.addStyleTag({
      content: ":root { --layout-display-width: 74rem; }",
    });

    const layout = await page.evaluate(() => {
      const widthOf = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing display shell: ${selector}`);
        return Math.round(element.getBoundingClientRect().width);
      };
      const footer = document.querySelector("footer");
      if (!footer) throw new Error("Missing footer");
      const footerRect = footer.getBoundingClientRect();

      return {
        widths: {
          header: widthOf("header .nav-container"),
          rule: widthOf("header .section-break"),
          breadcrumbs: widthOf(".breadcrumb.wide"),
          main: widthOf("main#main-content"),
          pagination: widthOf(".pagination"),
          footerInner: widthOf(".footer-shell"),
        },
        footerLeft: Math.round(footerRect.left),
        footerRight: Math.round(window.innerWidth - footerRect.right),
      };
    });

    expect(layout.widths).toEqual({
      header: 1184,
      rule: 1184,
      breadcrumbs: 1184,
      main: 1184,
      pagination: 1184,
      footerInner: 1184,
    });
    expect(layout.footerLeft).toBe(0);
    expect(layout.footerRight).toBe(0);
  });
});
