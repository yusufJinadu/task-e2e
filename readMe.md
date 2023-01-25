# Setup

Clone the Main branch

## Running from browser

1. Run npm install to install all package
2. Run npm "ui:test:en" or "ui:test:de" to run the UI version of the test in english or German respectively
3. Select test to run

## Running headlessly

1.  Run npm "test:en" or "test:de" to run the headless version of the test in english or German respectively

# Remarks

1. I tested the url qr code section of the qr monkey website
2. From my perspective, it seems the page is a teaser for users to easily see, use, verify the possibilities, and more importantly, be converted to signed up and consequently, paying users. So I implemented the following tests

- Verifying that the URL QR codes can be generated and lead to the correct link when decoded
- verifying that the signUp prompts lead to the signup Modal and subsequently to signup page
- Verifying that users can sign up with minimal data
- Verifying that users sign up with maximal data

# Difficulties faced

1. It was sometimes difficult to find unique selectors without using the chromium selector ribbon
2. Some required plugins for qr codes are either outdated or do not have sufficent documentation
3. The Plugin for decoding the qr code did not work on customized qr codes
4. Some paid plugins might be required
5. Non displayed elements do not seem to be removed from the dom causing duplicated dom element, making it difficult to get unique selectors necessitating the use of ({force:true}) when interacting with certain elements
6. Used plugin for decoding qr codes only seems to work with image formats
7. Sometimes, errors resulted from the application under test (Adding a retry functionality helped with this)

# Potential Improvements

1. Verifying that the generated qr code (HTML Image) on the web redirects to the right place (unable to implement because the zxing-js plugin seems to only accept 'id' selectors, and the generated image had no 'id' tag )
2. Verifying that the generated qr code (HTML Image) on the web looks like it's supposed to (Can be done using a visual regression tool e.g. applitools eye)
3. Verifying that all supported formats of the qr code can be downloaded (Not implemented because cypres currently has an open issue causing the doenload of dynamically generated files to trigger a page load event, cypress ultimately times out waiting for the page load)
4. Verifying that the downloaded qr code looks as expected (should be possible with applitools eye, but cypress dwonload issue stands in the way)
5. Verifying that downloaded qr code files redirect to expected link (not currently implemented because of cypress download issue)
6. Verify that users can complete sign up (Could be implemented with an email tool e.g. mailosaur)
7. Verifying that all of the other signup modals lead to the sign up page (One function would have been sufficient if only one modal was in the DOM at every point in time)
8. Checking that it is not possible to login with existing emaail
