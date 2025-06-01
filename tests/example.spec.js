const { test, expect } = require("@playwright/test");
require("dotenv").config();

const filePath = "./tests/Sudarshan_Patil_Resume.pdf";
const name = process.env.NAME;
const unit = process.env.UNIT;

test.use({ storageState: 'auth.json' });

test("test1", async ({ page, context }) => {
  await test.step("Navigate to Naukri login page", async () => {
  await page.goto('https://www.naukri.com/nlogin/login?URL=http://www.naukri.com/mnjuser/recommendedjobs');
  });

  // await test.step("Fill in login credentials", async () => {
  //   await page.getByPlaceholder('Enter Email ID / Username').fill(name);
  //   await page.getByPlaceholder('Enter Password').fill(unit);
  // });

  // await test.step("Click Login button", async () => {
  //   await page.getByRole('button', { name: 'Login', exact: true }).click();
  // });

  await test.step("Navigate to home page", async () => {
    await page.getByRole('link', { name: 'Naukri Logo' }).first().click();
    await page.waitForTimeout(4000);
  });

  await test.step("View all recommended jobs", async () => {
    await page.locator('#s2j-ear-component').getByRole('link', { name: 'View all' }).click();
    await page.waitForTimeout(5000);
  });

  await test.step("Share interest in a job", async () => {
    await page.locator('button:has-text("Share interest")').first().click();
    await page.waitForTimeout(10000);
    const buttons = page.locator("(//div[@class='s2j__button'])");
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await page.waitForTimeout(1000);
    }
  });

  await test.step("Navigate to profile", async () => {
    await page.getByRole('link', { name: 'Naukri Logo' }).first().click();
    await page.waitForTimeout(5000);
    await page.getByRole('link', { name: 'View profile' }).click();
    await page.waitForTimeout(5000);
  });

  await test.step("Delete old resume", async () => {
    await page.getByText('deleteOneTheme').click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(5000);
  });

  await test.step("Upload new resume", async () => {
    const upload = page.locator("//input[@id='attachCV']");
    await upload.setInputFiles(filePath);
    await page.waitForTimeout(25000);
    const resumeName = await page.getByText('Sudarshan_Patil_Resume.pdf').textContent();
    expect(resumeName?.trim()).toBe('Sudarshan_Patil_Resume.pdf');
    const uploadDate = await page.locator("//div[@class='updateOn typ-14Regular']").textContent();
  });

  await test.step("Edit resume headline", async () => {
    await page.locator('#lazyResumeHead').getByText('editOneTheme').click();
    await page.getByPlaceholder('Minimum 5 words. Sample').press('ControlOrMeta+a');
    await page.getByPlaceholder('Minimum 5 words. Sample').fill('Serving Notice Period | SDET@Cognizant | Playwright | Javascript | API testing | Rest Assured | Selenium | Java | Axios | Mocha | TestNg | Postman | SQL | SoapUI | Performance testing | Python | GitHub actions | CI/CD GitLab | ReactJS | Agile |');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.locator('#lazyResumeHead').getByText('editOneTheme').click();
    await page.getByPlaceholder('Minimum 5 words. Sample').press('ControlOrMeta+a');
    await page.getByPlaceholder('Minimum 5 words. Sample').fill('Serving Notice Period | SDET@Cognizant | Playwright | Javascript | API testing | Rest Assured | Selenium | Java | Axios | Mocha | TestNg | Postman | SQL | SoapUI | Performance testing | Python | GitHub actions | CI/CD GitLab | ReactJS | Agile | Jira');
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await context.storageState({ path: 'auth.json' });
});