const { chromium } = require('playwright');

(async () => {
    // Launch browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to Beeceptor login page
    await page.goto('https://beeceptor.com');

    // Click the login button and fill login form
    await page.click('text=Login'); // Ensure the Login button is correctly targeted
    await page.fill('input#email', 'manideepakp8@gmail.com'); // Adjust if ID is different
    await page.fill('input#password', 'm1n9d5ep1k@'); // Adjust if ID is different
    await page.click('button[type="submit"]');

    // Navigate to the Proxy/Callout Rule section
    await page.goto('https://app.beeceptor.com/endpoints');
    await page.waitForSelector('button:has-text("Add New Rule")');

    await page.click('a[href="/console/bcbc-endpoint"]'); // Click the link with href="/console/bcbc-endpoint"

    // Optionally, wait for a selector to ensure navigation
    await page.waitForSelector('text=Some Content After Redirect'); // Adjust with actual content that appears after click



    // Wait for the Proxy Rule form to be ready
    await page.waitForSelector('input#rule-name');
    await page.waitForSelector('input#url');

    // Fill out the Proxy Rule form
    await page.fill('input#rule-name', 'My Proxy Rule'); 
    await page.fill('input#url', 'https://example.com/endpoint');

    // Save the rule
    await page.click('button:has-text("Save Rule")');

    // Wait for confirmation message
    await page.waitForSelector('.success-message');
    const successMessage = await page.textContent('.success-message');
    console.log('Validation:', successMessage.includes('Rule created successfully'));

    // Close the browser
    await browser.close();
})(); 
