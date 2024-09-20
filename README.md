# cord extension

A very simple scaffolding browser extension that injects Signer into a page, along with any associated accounts, allowing for use by any dapp. This is an extensible POC implementation of a Cordbrowser signer.

As it stands, it does one thing: it _only_ manages accounts and allows the signing of transactions with those accounts. It does not inject providers for use by dapps at this early point, nor does it perform wallet functions where it constructs and submits txs to the network.

## Development version

Steps to build the extension and view your changes in a browser:

1. Build via `yarn build` or `yarn watch`
2. Install the extension
  - Chrome:
    - go to `chrome://extensions/`
    - ensure you have the Development flag set
    - "Load unpacked" and point to `packages/extension/build`
    - if developing, after making changes - refresh the extension
  - Firefox:
    - go to `about:debugging#addons`
    - check "Enable add-on debugging"
    - click on "Load Temporary Add-on" and point to `packages/extension/build/manifest.json`
    - if developing, after making changes - reload the extension

Once added, you can create an account (via a generated seed) or import via an existing seed.

