import { test, expect } from '@playwright/test';

// Test: Client Work Navigation
// This file will contain a Playwright test that navigates from the EPAM header to the Client Work page.

test('Client Work Navigation - header to client work page', async ({ page }) => {
  // Navigate to EPAM homepage
  await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

  // Optional: accept cookies if the banner appears
  const acceptButton = page.locator('button:has-text("Accept")');
  if (await acceptButton.count() > 0) {
    await acceptButton.first().click();
  }

  // Click the "Services" item in the header menu
  await page.click('text=Services', { timeout: 5000 });

  // Click the "Explore Our Client Work" link
  await page.click('text=Explore Our Client Work', { timeout: 10000 });

  // Wait for navigation to complete and verify the "Client Work" text is visible
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Client Work')).toBeVisible({ timeout: 10000 });
});
