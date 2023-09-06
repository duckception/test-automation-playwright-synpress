import { test, expect } from '../fixtures/pomSynpressFixture';
import * as metamask from '@synthetixio/synpress/commands/metamask';
import { getCurrentNetwork } from '@synthetixio/synpress/helpers';


test.describe('Dummy Tests', async () => {
  // Network correctly switches to Polygon only here
  test('Test 1', async ({ page }) => {
    const currentNetwork = getCurrentNetwork();
    console.log('Test 1', {id: currentNetwork.id, name: currentNetwork.name, network: currentNetwork.network})
    await page.goto('https://dapp-citizen-react.vercel.app');
    await page.getByText('Connect').click();
    await metamask.acceptAccess();
    await page.waitForTimeout(2000);
  });


  // Starting from this test network will not switch to polygon again. Please note that getCurrentNetwork() shows Polygon, but in reality Polygon is not even added
  test('Test 2', async ({ page }) => {
    const currentNetwork = getCurrentNetwork();
    console.log('Test 2', {id: currentNetwork.id, name: currentNetwork.name, network: currentNetwork.network})
    await page.goto('https://dapp-citizen-react.vercel.app');
    await page.getByText('Connect').click();
    await metamask.acceptAccess();
    await page.waitForTimeout(2000);
  });

  test('Test 3', async ({ page }) => {
    const currentNetwork = getCurrentNetwork();
    console.log('Test 3', {id: currentNetwork.id, name: currentNetwork.name, network: currentNetwork.network})
    await page.goto('https://dapp-citizen-react.vercel.app');
    await page.getByText('Connect').click();
    await metamask.acceptAccess();
    await page.waitForTimeout(2000);
  });

  test('Test 4', async ({ page }) => {
    const currentNetwork = getCurrentNetwork();
    console.log('Test 4', {id: currentNetwork.id, name: currentNetwork.name, network: currentNetwork.network})
    await page.goto('https://dapp-citizen-react.vercel.app');
    await page.getByText('Connect').click();
    await metamask.acceptAccess();
    await page.waitForTimeout(2000);
  });
})


