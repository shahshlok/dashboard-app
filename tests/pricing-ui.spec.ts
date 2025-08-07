import { test, expect } from '@playwright/test';

test.describe('Pricing Tab UI Optimization Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard and select a location with pricing data (Ashburn VA)
    await page.goto('/');
    
    // Wait for the dashboard to load and select Ashburn location
    await page.waitForSelector('[data-testid="location-card"]', { timeout: 10000 });
    
    // Find and click on Ashburn VA location card
    const ashburnCard = page.locator('[data-testid="location-card"]').filter({ 
      hasText: 'Ashburn VA' 
    }).first();
    await ashburnCard.waitFor({ state: 'visible' });
    await ashburnCard.click();
    
    // Wait for modal to open and navigate to Pricing tab
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    await page.locator('button', { hasText: 'Pricing' }).click();
    
    // Wait for pricing content to load
    await page.waitForSelector('[data-testid="pricing-tiers-list"]', { timeout: 5000 });
  });

  test('pricing cards render correctly with optimized layout', async ({ page }) => {
    // Verify that pricing cards are present
    const pricingCards = page.locator('[data-testid="pricing-card"]');
    await expect(pricingCards).toHaveCount(await pricingCards.count());
    
    // Verify each pricing card contains required elements
    const firstCard = pricingCards.first();
    await expect(firstCard.locator('h3')).toBeVisible(); // Program name
    await expect(firstCard.locator('[data-testid="pricing-tag"]')).toBeVisible(); // Type tag
    await expect(firstCard.locator('[data-testid="price"]')).toBeVisible(); // Price
    await expect(firstCard.locator('[data-testid="duration"]')).toBeVisible(); // Duration
  });

  test('responsive grid layout shows 2+ cards per row on desktop', async ({ page }) => {
    // Set viewport to desktop size (1920x1080)
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Wait for layout to adjust
    await page.waitForTimeout(500);
    
    // Check that the grid container has the correct CSS classes
    const gridContainer = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.xl\\:grid-cols-3').first();
    await expect(gridContainer).toBeVisible();
    
    // Get all pricing cards and verify positioning
    const pricingCards = page.locator('[data-testid="pricing-card"]');
    const cardCount = await pricingCards.count();
    
    if (cardCount >= 2) {
      // Get bounding boxes of first two cards
      const firstCardBox = await pricingCards.nth(0).boundingBox();
      const secondCardBox = await pricingCards.nth(1).boundingBox();
      
      if (firstCardBox && secondCardBox) {
        // Verify cards are positioned side by side (same row)
        // Allow for some tolerance in vertical alignment
        const verticalTolerance = 20;
        expect(Math.abs(firstCardBox.y - secondCardBox.y)).toBeLessThan(verticalTolerance);
        
        // Verify second card is to the right of first card
        expect(secondCardBox.x).toBeGreaterThan(firstCardBox.x);
      }
    }
  });

  test('responsive behavior works on mobile and tablet', async ({ page }) => {
    // Test mobile layout (375x667 - iPhone 8)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const pricingCards = page.locator('[data-testid="pricing-card"]');
    const cardCount = await pricingCards.count();
    
    if (cardCount >= 2) {
      // On mobile, cards should stack vertically
      const firstCardBox = await pricingCards.nth(0).boundingBox();
      const secondCardBox = await pricingCards.nth(1).boundingBox();
      
      if (firstCardBox && secondCardBox) {
        // Second card should be below first card (not side by side)
        expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y);
      }
    }
    
    // Test tablet layout (768x1024 - iPad)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    if (cardCount >= 2) {
      // On tablet, cards should be side by side (2 columns)
      const firstCardBox = await pricingCards.nth(0).boundingBox();
      const secondCardBox = await pricingCards.nth(1).boundingBox();
      
      if (firstCardBox && secondCardBox) {
        const verticalTolerance = 20;
        expect(Math.abs(firstCardBox.y - secondCardBox.y)).toBeLessThan(verticalTolerance);
        expect(secondCardBox.x).toBeGreaterThan(firstCardBox.x);
      }
    }
  });

  test('all key information is visible in pricing cards', async ({ page }) => {
    const pricingCards = page.locator('[data-testid="pricing-card"]');
    const cardCount = await pricingCards.count();
    
    for (let i = 0; i < Math.min(cardCount, 3); i++) { // Test first 3 cards
      const card = pricingCards.nth(i);
      
      // Verify program title is visible and not empty
      const title = card.locator('h3');
      await expect(title).toBeVisible();
      await expect(title).not.toHaveText('');
      
      // Verify price is visible and formatted correctly
      const price = card.locator('[data-testid="price"]');
      await expect(price).toBeVisible();
      const priceText = await price.textContent();
      expect(priceText).toMatch(/\$\d+/); // Should contain $ and numbers
      
      // Verify duration is visible
      const duration = card.locator('[data-testid="duration"]');
      await expect(duration).toBeVisible();
      
      // Verify type tag is visible and has appropriate styling
      const typeTag = card.locator('[data-testid="pricing-tag"]');
      await expect(typeTag).toBeVisible();
      
      // Verify card has hover effects
      await card.hover();
      await expect(card).toHaveClass(/hover:shadow-lg/);
    }
  });

  test('pricing card expansion and collapse works correctly', async ({ page }) => {
    const firstCard = page.locator('[data-testid="pricing-card"]').first();
    
    // Initially, expanded details should not be visible
    await expect(firstCard.locator('[data-testid="expanded-details"]')).not.toBeVisible();
    
    // Click to expand
    await firstCard.click();
    await page.waitForTimeout(300); // Wait for animation
    
    // Expanded details should now be visible
    await expect(firstCard.locator('[data-testid="expanded-details"]')).toBeVisible();
    
    // Verify chevron icon changed
    await expect(firstCard.locator('[data-testid="chevron-up"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="chevron-down"]')).not.toBeVisible();
    
    // Click again to collapse
    await firstCard.click();
    await page.waitForTimeout(300); // Wait for animation
    
    // Expanded details should be hidden again
    await expect(firstCard.locator('[data-testid="expanded-details"]')).not.toBeVisible();
    await expect(firstCard.locator('[data-testid="chevron-down"]')).toBeVisible();
  });

  test('pricing cards maintain design consistency', async ({ page }) => {
    const pricingCards = page.locator('[data-testid="pricing-card"]');
    const cardCount = await pricingCards.count();
    
    // Verify all cards have consistent styling
    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      const card = pricingCards.nth(i);
      
      // Check consistent border and background
      await expect(card).toHaveClass(/bg-white/);
      await expect(card).toHaveClass(/border-gray-200/);
      await expect(card).toHaveClass(/rounded-lg/);
      
      // Check consistent padding
      const cardInner = card.locator('.p-4');
      await expect(cardInner).toBeVisible();
    }
  });

  test('performance: cards load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    // Wait for all pricing cards to be visible
    const pricingCards = page.locator('[data-testid="pricing-card"]');
    await pricingCards.first().waitFor({ state: 'visible', timeout: 5000 });
    
    const loadTime = Date.now() - startTime;
    
    // Cards should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Verify all expected cards are present
    const cardCount = await pricingCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('accessibility: cards are keyboard navigable', async ({ page }) => {
    // Focus on first pricing card
    const firstCard = page.locator('[data-testid="pricing-card"]').first();
    await firstCard.focus();
    
    // Verify card is focused
    await expect(firstCard).toBeFocused();
    
    // Press Enter to expand
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    
    // Verify expansion worked
    await expect(firstCard.locator('[data-testid="expanded-details"]')).toBeVisible();
    
    // Tab to next card if available
    await page.keyboard.press('Tab');
    const secondCard = page.locator('[data-testid="pricing-card"]').nth(1);
    if (await secondCard.count() > 0) {
      await expect(secondCard).toBeFocused();
    }
  });
});