import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateToChart(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async navigateToList(): Promise<unknown> {
    return browser.get(browser.baseUrl + "students/grade3");
  }

  async getTitleText(): Promise<string> {
    return element(by.css('.toolbar')).getText();
  }

  async getEditButton() {
    return element(by.css('input[value=Edit]'));
  }

  async getCancelButton() {
    return element(by.css('input[value=Cancel]'));
  }

  async getSaveButton() {
    return element(by.css('input[value=Save]'));
  }

  async getNameCell() {
    return element(by.css('.name-cell input'));
  }

  async getNameCellValue() {
    return element(by.css('.name-cell input')).getText();
  }
  
}
