const lang = Cypress.env('lang');

export default class UrlPage {
  constructor() {
    this._route = '#url';
    this._urlInput = 'input[name="qrcodeUrl"]';
    this._createQRCodeButton = '#button-create-qr-code';
    this._qrImage = 'img.card-img-top';
    this._downloadPNGButton = '#button-download-qr-code-png';
    this._codeLoaderSpinner = '.preview .loading-screen';
    this._customizationPanes = '.pane';
    this._foregroundColourInputs = '.color-group-body .color-picker-input';
    this._backgroundColourInput =
      '.form-group > .color-picker-wrapper > .color-picker-input-wrapper > .color-picker-input';
    this._statisticsAndEditabilitySwitch = 'a[href="#"] img';
    this._tryNowLink = '.d-flex > :nth-child(1) > :nth-child(2) > p > a';
  }

  getUrl() {
    return this._route;
  }

  getUrlInput() {
    return this._urlInput;
  }

  getCreateQRCodeButton() {
    return this._createQRCodeButton;
  }

  getQRImage() {
    return this._qrImage;
  }
  getDownloadPNGButton() {
    return this._downloadPNGButton;
  }

  getCodeLoaderSpinner() {
    return this._codeLoaderSpinner;
  }

  getCustomizationPanes() {
    return this._customizationPanes;
  }

  getForegroundColourInputs() {
    return this._foregroundColourInputs;
  }

  getBackgroundColourInput() {
    return this._backgroundColourInput;
  }

  getStatisticsAndEditabilitySwitch() {
    return this._statisticsAndEditabilitySwitch;
  }

  getTryNowLink() {
    return this._tryNowLink;
  }

  getText() {
    return {
      setColours: {
        en: 'Set Colors',
        de: 'Farben anpassen',
      },
      addLogo: {
        en: 'Add Logo Image',
        de: 'Logo hinzufügen',
      },
    };
  }

  createURLQRCode(url, { colours = null, logo = null } = {}) {
    cy.get(this.getUrlInput()).clear().type(url);
    if (colours) {
      cy.get(this.getCustomizationPanes())
        .contains(this.getText().setColours[lang])
        .click();
      if (colours.foreColour) {
        cy.get(this.getForegroundColourInputs())
          .eq(0)
          .clear()
          .type(colours.foreColour);
      }
      if (colours.background) {
        cy.get(this.getBackgroundColourInput())
          .clear({ force: true })
          .type(colours.background, { force: true });
      }
    }
    if (logo) {
      cy.get(this.getCustomizationPanes())
        .contains(this.getText().addLogo[lang])
        .click({ force: true });
      if (logo.class) {
        cy.get(logo.class).click();
      }
    }
    cy.get(this.getCreateQRCodeButton()).click();
  }
}
