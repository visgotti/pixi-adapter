import { defineConfig, devices } from '@playwright/test';
import path from 'path';
const pathToTestHtml = path.resolve(import.meta.dirname, 'test');
const webserverPort = 4173;
export default defineConfig({
  testDir: './test',               // point at your “test” folder
  // (optional) explicitly match only “.spec.ts” files:
  testMatch: /.*\.spec\.ts/,
  timeout: 120_000,
  use: {
    headless: true,
    baseURL: 'http://localhost:4173',
    viewport: { width: 800, height: 600 },
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `npx serve ./test -l ${webserverPort}`,
    port: webserverPort,
    reuseExistingServer: !process.env.CI,
  },
});
