import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Title message', async () => {
    await page.navigateToChart();
    expect(await page.getTitleText()).toEqual('Student Management');
  });


  it('should make record editable', async () => {

    await page.navigateToList();

    (await page.getEditButton()).click();
    (await page.getNameCell()).clear();
    (await page.getNameCell()).sendKeys("vikas Kumar singh");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
