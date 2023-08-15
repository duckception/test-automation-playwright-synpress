import { test as base, chromium, type BrowserContext } from '@playwright/test';
import { initialSetup } from '@synthetixio/synpress/commands/metamask';
import { prepareMetamask } from '@synthetixio/synpress/helpers';
import dotenv from 'dotenv';
dotenv.config();

interface pagesAndContext {
  context: BrowserContext;
}

const privateKey: string = process.env.METAMASK_SETUP_PRIVATE_KEY!;
const network: string = process.env.METAMASK_SETUP_NETWORK!;
const password: string = process.env.METAMASK_SETUP_PASSWORD!;

export const test = base.extend<pagesAndContext>({
  context: async ({}, use) => {
    // required for synpress
    global.expect = expect;
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
    if (process.env.METAMASK_SETUP_HEADLESS_MODE === 'true') {
      browserArgs.push('--headless=new');
    }
    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: false,
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
  }
});

export const expect = test.expect;
