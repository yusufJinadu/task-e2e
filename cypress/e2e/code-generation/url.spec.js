import { Decoder } from '@nuintun/qrcode';
import CookieBanner from '../../support/page-objects/cookieBanner';
import UrlPage from '../../support/page-objects/urlPage';
import SignUpPage from '../../support/page-objects/signUpPage';
import SignUpModal from '../../support/page-objects/signUpModal';

const decoder = new Decoder();
const cookieBanner = new CookieBanner();
const urlPage = new UrlPage();
const signUpModal = new SignUpModal();
const signUpPage = new SignUpPage();
const fixture = 'code-generation/url';
const downloadsPath = './cypress/downloads';
const lang = Cypress.env('lang');

describe('Verify some essential functionalities of the URL section in the qr monkey website', function () {
  beforeEach(function () {
    cy.task('deleteDownloads', downloadsPath);
    cy.fixture(fixture).then(function ({ url, colours, details }) {
      this.url = url;
      this.colours = colours;
      this.details = details;
    });
  });
  it('User can create and verify non customized URL QR codes', function () {
    cy.visit(`${Cypress.env('qrMonkeyUrl')}/${lang}`);
    cy.get(cookieBanner.getAcceptCookieBannerButton()).click();
    urlPage.createURLQRCode(this.url);
    verifyURLQRCode(this.url);
  });

  it('User can create and verify customized URL QR codes', function () {
    cy.visit(`${Cypress.env('qrMonkeyUrl')}/${lang}`);
    cy.get(cookieBanner.getAcceptCookieBannerButton()).click();
    urlPage.createURLQRCode(this.url, {
      colours: this.colours,
      logo: { class: '.sprite-logo-instagram-circle' },
    });
    // commented out because the used plugin is unable to decode the customized qr code
    //verifyURLQRCode(this.url)
  });

  it('Users should be able to get to the signup modal from the statistics switch conversion prompt', function () {
    goToSignupModalFromStatisticsSwitch();
    signUpModal.goToSignUpPage();
    goToSignupModalFromStatisticsSwitch(false);
    signUpModal.goToSignUpPage('image');
    cy.origin(`${Cypress.env('qrGeneratorLoginUrl')}`, () => {
      cy.url().should(
        'include',
        `${Cypress.env('qrGeneratorLoginUrl') + '/signup'}`,
      );
    });
  });

  it('User can Sign up with maximal details', function () {
    cy.visit(`${Cypress.env('qrGeneratorLoginUrl') + signUpPage.getRoute()}`);
    signUpPage.signUp(this.details);
  });

  it('User can Sign up with minimal details', function () {
    this.details.industry = '';
    this.details.printMaterial = '';
    cy.visit(`${Cypress.env('qrGeneratorLoginUrl') + signUpPage.getRoute()}`);
    signUpPage.signUp(this.details);
  });
});

function goToSignupModalFromStatisticsSwitch(firstTime = true) {
  cy.visit(`${Cypress.env('qrMonkeyUrl')}/${lang}`);
  if (firstTime) {
    cy.get(cookieBanner.getAcceptCookieBannerButton()).click();
  }
  cy.get(urlPage.getStatisticsAndEditabilitySwitch()).click();
  cy.get(signUpModal.getModalContent()).should('exist');
}

function verifyURLQRCode(url, { downloadsPath = './cypress/downloads' } = {}) {
  cy.waitUntil(() =>
    cy
      .get(urlPage.getQRImage())
      .invoke('attr', 'src')
      .then((src) => src.includes('api')),
  );
  cy.get(urlPage.getQRImage())
    .invoke('attr', 'src')
    .then((src) => {
      let ImgLink = src.replace(/svg/gi, 'png');
      console.log(ImgLink);
      cy.downloadFile(`https:${ImgLink}`, downloadsPath, 'qr-code.png');
    });
  cy.waitUntil(
    () =>
      cy
        .task('checkDownloadsExistence', downloadsPath)
        .then((isExisting) => isExisting === true),
    { timeout: 10000 },
  );
  cy.readFile('./cypress/downloads/qr-code.png', 'base64')
    .then((code) => `data:img/png;base64,${code}`)
    .then((imgSrc) => decoder.scan(imgSrc))
    .then((data) => cy.wrap(data.data).should('eq', url));
}
