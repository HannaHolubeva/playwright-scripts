import { test, expect } from '@playwright/test';

test.describe('Explore Our Client Work - Playwright Test', () => {
  test('navigate to EPAM and verify Client Work', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

    // Step 2: Select "Services" from the header menu
    const servicesLink = page.getByRole('link', { name: /Services/i });
    await servicesLink.click();

    // Step 3: Click the "Explore Our Client Work" link
    const exploreLink = page.getByRole('link', { name: /Explore Our Client Work/i });
    // If the role-based locator fails, fall back to text locator
    if (!(await exploreLink.count())) {
      await page.click('text=Explore Our Client Work');
    } else {
      await exploreLink.click();
    }

    // Wait for navigation/content to load
    await page.waitForLoadState('networkidle');

    // Step 4: Verify that the "Client Work" text is visible on the page
    const clientWork = page.locator('text=Client Work');
    await expect(clientWork).toBeVisible({ timeout: 10000 });

    // Close the page (explicit close to satisfy scenario execution step)
    await page.close();
  });
});
