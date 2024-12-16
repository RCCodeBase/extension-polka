# Cord extension

A very simple scaffolding browser extension that injects Signer into a page, along with any associated accounts, allowing for use by any dapp. This is an extensible POC implementation of a Cordbrowser signer.

As it stands, it does one thing: it _only_ manages accounts and allows the signing of transactions with those accounts. It does not inject providers for use by dapps at this early point, nor does it perform wallet functions where it constructs and submits txs to the network.

## Development version

Steps to build the extension and view your changes in a browser:

NOTE: If you would like to regenerate the compressed master-ff-build.zip, and master-ff-src.zip files run: yarn build:zip:ff

1. Chrome:
    1. Build via `yarn build:chrome`
      - NOTE: You may need to enable corepack by running `corepack enable`
    2. Install the extension
      - go to `chrome://extensions/`
      - ensure you have the Development flag set
      - "Load unpacked" and point to `packages/extension/build`
      - if developing, after making changes - refresh the extension
2. Firefox
    1. Build via `yarn build:ff`
      - NOTE: You may need to enable corepack by running `corepack enable`
    2. Install the extension
      - go to `about:debugging#addons`
      - check "Enable add-on debugging"
      - click on "Load Temporary Add-on" and point to `packages/extension/build/manifest.json`
      - if developing, after making changes - reload the extension

Once added, you can create an account (via a generated seed) or import via an existing seed.

## Development

The repo is split into a number of packages -

- [extension](packages/extension/) - All the injection and background processing logic (the main entry)
- [extension-ui](packages/extension-ui/) - The UI components for the extension, to build up the popup
- [extension-dapp](packages/extension-dapp/) - A convenience wrapper to work with the injected objects, simplifying data extraction for any dapp that wishes to integrate the extension (or any extension that supports the interface)
- [extension-inject](packages/extension-inject/) - A convenience wrapper that allows extension developers to inject their extension for use by any dapp

It also contains a [`manifest_chrome.json`](packages/extension/manifest_chrome.json) file which contains the manifest configuration for Chrome and another [`manifest_firefox.json`](packages/extension/manifest_firefox.json) with the configuration for Firefox, for compatibility reasons, and a dummy `manifest.json` file that's only used by the build.