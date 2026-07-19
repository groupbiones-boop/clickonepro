import { test, expect } from "@playwright/test";

const routes = ["/", "/contato", "/sobre", "/blog", "/agendar-demo"];

for (const route of routes) {
  test(`renders ${route} without JS errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), `status for ${route}`).toBeLessThan(400);

    await expect(page.locator("#root")).not.toBeEmpty();
    expect(errors, `pageerrors on ${route}`).toEqual([]);
  });
}
