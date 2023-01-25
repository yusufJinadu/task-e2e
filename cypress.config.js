const { defineConfig } = require('cypress');
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');
const fs = require('fs');
module.exports = defineConfig({
  env: {
    qrMonkeyUrl: 'https://www.qrcode-monkey.com',
    qrGeneratorLoginUrl: 'https://login.qr-code-generator.com',
  },
  retries: {
    runMode: 3,
    openMode: 3,
  },
  e2e: {
    specPattern: './cypress/e2e/**/*.spec.{js,jsx}',

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        deleteDownloads: (downloadsPath) => {
          if (fs.existsSync(downloadsPath)) {
            fs.rmdirSync(downloadsPath, { recursive: true });
          }
          return null;
        },
        checkDownloadsExistence: (downloadsPath) => {
          if (fs.existsSync(downloadsPath)) {
            return true;
          } else {
            return false;
          }
        },
        downloadFile,
      });
    },
  },
});
