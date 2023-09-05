import { test as base, chromium, type BrowserContext } from '@playwright/test';
import { initialSetup } from '@synthetixio/synpress/commands/metamask';
import { prepareMetamask } from '@synthetixio/synpress/helpers';
import { setExpectInstance } from '@synthetixio/synpress/commands/playwright';
import { resetState } from '@synthetixio/synpress/commands/synpress';
import dotenv from 'dotenv';
dotenv.config();

interface pagesAndContext {
  context: BrowserContext;
}

let privateKey: string;
let network: string;
let password: string;

if (
  process.env.METAMASK_SETUP_PRIVATE_KEY != null &&
  process.env.METAMASK_SETUP_NETWORK != null &&
  process.env.METAMASK_SETUP_PASSWORD != null
) {
  privateKey = process.env.METAMASK_SETUP_PRIVATE_KEY;
  network = process.env.METAMASK_SETUP_NETWORK;
  password = process.env.METAMASK_SETUP_PASSWORD;
} else {
  throw new Error(
    'One or more of required Metamask setup environment variables is not set',
  );
}

export const test = base.extend<pagesAndContext>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    // required for synpress as it shares same expect instance as playwright
    await setExpectInstance(expect);
    // download metamask
    const metamaskPath: string = await prepareMetamask(
      process.env.METAMASK_VERSION != null || '10.25.0',
    );
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      '--remote-debugging-port=9222',
    ];
    if (process.env.CI != null) {
      browserArgs.push('--disable-gpu');
    }
    if (process.env.HEADLESS_MODE === 'true') {
      browserArgs.push('--headless=new');
    }
    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: true,
      args: browserArgs,
    });
    // wait for metamask
    await context.pages()[0].waitForTimeout(3000);
    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey: privateKey,
      network,
      password,
      enableAdvancedSettings: true,
      enableExperimentalSettings: false,
    });
    await use(context);
    await context.close();
    await resetState();
  },
});

export const expect = test.expect;
