# Dummy project for reproduction of an issue related to Synpress library with Playwright

For reproduction of running the tests and reproduction of the issue:

1. npm install
2. npx playwright install
3. Add .env file with
- METAMASK_SETUP_PRIVATE_KEY=ANY_PRIVATE_KEY
- METAMASK_SETUP_HEADLESS_MODE=false
- METAMASK_SETUP_NETWORK=polygon (or any network other than ethereum mainnet)
- METAMASK_SETUP_PASSWORD=PASSWORD
4. Run the tests and observe that network is changed to polygon only for the first test, and for the rest of the tests getCurrentNetwork() shows Polygon, but Polygon is not even added.

Trying to do addNetwork(), changeNetwork(), etc. inside the tests results in either failures, or doesn't work, or works for some of the tests and fails for others.
