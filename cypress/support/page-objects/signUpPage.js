import Helper from '../utils/helper';
const helper = new Helper();
export default class SignUpPage {
  constructor() {
    this._route = '/signup';
    this._modalButtons = '.content a.button';
    this._industyDropdown = '.industry-selector .v-select__selections';
    this._industryItem = '.v-list-item ';
    this._email = 'input[type="email"]';
    this._password = 'input[type="password"]';
    this._materialDropdown = '.print-material-selector .v-input__slot';
    this._materialItem = '.v-list-item';
    this._termsAndConditions = '#terms-and-conditons-checkbox';
    this._buttons = 'button';
  }

  getRoute() {
    return this._route;
  }

  getModalButtons() {
    return this._modalButtons;
  }

  getIndustryDropdown() {
    return this._industyDropdown;
  }

  getIndustryItem() {
    return this._industryItem;
  }

  getEmailInput() {
    return this._email;
  }

  getPasswordInput() {
    return this._password;
  }

  getMaterialDropdown() {
    return this._materialDropdown;
  }

  getMaterialItem() {
    return this._materialItem;
  }

  getTermsAndConditions() {
    return this._termsAndConditions;
  }

  getButtons() {
    return this._buttons;
  }

  signUp({ industry, password, printMaterial } = {}) {
    const email = helper.getRandomEmail();
    cy.get(this.getEmailInput()).clear().type(email);
    cy.get(this.getPasswordInput()).clear().type(password);
    if (industry) {
      cy.get(this.getIndustryDropdown()).click();
      cy.get(this.getIndustryItem()).contains(industry).click();
    }
    if (printMaterial) {
      cy.get(this.getMaterialDropdown()).click();
      cy.get(this.getMaterialItem()).contains(printMaterial).click();
    }
    cy.get(this.getTermsAndConditions()).click();
    cy.get(this.getButtons()).contains('Sign up now').click();
    cy.url().should(
      'include',
      `${Cypress.env('qrGeneratorLoginUrl') + this.getRoute()}/ok/`,
    );
  }
}
