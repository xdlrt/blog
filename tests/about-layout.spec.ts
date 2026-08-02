import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

test("about content remains maintainable as standard Markdown", () => {
  const source = readFileSync("src/pages/about.md", "utf8");

  expect(source).toContain("## 现在");
  expect(source).toContain("## 我相信的原则");
  expect(source).toContain("## 我的实践");
  expect(source).toContain("## 为什么写作");
  expect(source).not.toContain("多维表格研发");
  expect(source).not.toMatch(/<\/?[a-z][^>]*>/i);
});

test("about page exposes the profile and maintained Markdown content", async ({
  page,
}) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("关于我");
  await expect(
    page.getByText("产品工程师 · 长期写作者 · 从 2016 年开始写博客")
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "我的实践", level: 2 })
  ).toBeVisible();
  await expect(
    page.getByText("所有的努力都是为了拥有更多选择的权利。")
  ).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "GitHub", exact: true })
  ).toBeVisible();
});

test("about navigation marks the current page and exposes theme switching", async ({
  page,
}) => {
  await page.goto("/about");

  await expect(
    page.getByRole("navigation").getByRole("link", { name: "关于我" })
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator("#theme-btn")).toHaveAttribute(
    "aria-label",
    /切换到(深色|浅色)模式/
  );
});
