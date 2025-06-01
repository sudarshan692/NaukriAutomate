const { test, expect } = require("@playwright/test");
require("dotenv").config();
const filePath = "./tests/Sudarshan_Patil_Resume.pdf";
const videoRecordedPath = process.env.VIDEO_RECORD_PATH;
let context;
let page;

const name = process.env.NAME;
const unit = process.env.UNIT;


test.describe("Update Res", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
      recordVideo: {
        dir: videoRecordedPath,
        size: { width: 1920, height: 1080 },
      },
    });
    page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test("Login with naukri", async ({}) => {
    await page.goto('https://www.naukri.com/nlogin/login?URL=http://www.naukri.com/mnjuser/recommendedjobs');
    await page.getByPlaceholder('Enter Email ID / Username').fill(name);
    await page.getByPlaceholder('Enter Password').fill(unit);
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.waitForTimeout(5000);
  });

  test("test1", async ({}) => {
    await page.getByRole('link', { name: 'Naukri Logo' }).first().click();
    await page.waitForTimeout(4000);
    await page.locator('#s2j-ear-component').getByRole('link', { name: 'View all' }).click();
    await page.waitForTimeout(5000);
    await page.locator('button:has-text("Share interest")').first().click();
    await page.waitForTimeout(10000);
  });

  test("Do Share Interest", async ({}) => {
    const buttons = page.locator("(//div[@class='s2j__button'])");
    const count = await buttons.count();
    console.log(count);
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      console.log(`Clicked button at index: ${i}`);
      await page.waitForTimeout(1000);
    }
  });

    test("Delete Resume", async ({}) => {
    await page.getByRole('link', { name: 'Naukri Logo' }).first().click();
    await page.waitForTimeout(5000);
    await page.getByRole('link', { name: 'View profile' }).click();
    await page.waitForTimeout(5000);
    await page.getByText('deleteOneTheme').click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(5000);
    console.log("Resume Deleted Successfully");
  });

  test("Upload resume", async ({}) => {
    const upload = page.locator("//input[@id='attachCV']");
    await upload.setInputFiles(filePath);
    await page.waitForTimeout(25000);
    const resumeName = await page.getByText('Sudarshan_Patil_Resume.pdf').textContent();
    console.log("Resume Name is: " + resumeName);
    expect(resumeName?.trim()).toBe('Sudarshan_Patil_Resume.pdf');
    const uploadDate = await page.locator("//div[@class='updateOn typ-14Regular']").textContent();
    console.log("Uploaded Resume Date: " + uploadDate);
  });

    test('Update headLine', async ({}) => {
    await page.locator('#lazyResumeHead').getByText('editOneTheme').click();
    await page.getByPlaceholder('Minimum 5 words. Sample').press('ControlOrMeta+a');
    await page.getByPlaceholder('Minimum 5 words. Sample').fill('Serving Notice Period | SDET@Cognizant | Playwright | Javascript | API testing | Rest Assured | Selenium | Java | Axios | Mocha | TestNg | Postman | SQL | SoapUI | Performance testing | Python | GitHub actions | CI/CD GitLab | ReactJS | Agile |');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.locator('#lazyResumeHead').getByText('editOneTheme').click();
    await page.getByPlaceholder('Minimum 5 words. Sample').press('ControlOrMeta+a');
    await page.getByPlaceholder('Minimum 5 words. Sample').fill('Serving Notice Period | SDET@Cognizant | Playwright | Javascript | API testing | Rest Assured | Selenium | Java | Axios | Mocha | TestNg | Postman | SQL | SoapUI | Performance testing | Python | GitHub actions | CI/CD GitLab | ReactJS | Agile | Jira');
    await page.getByRole('button', { name: 'Save' }).click();
  });
});
