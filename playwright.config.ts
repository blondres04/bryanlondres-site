import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT ?? '3008';
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  testMatch: '*.e2e.ts',
  timeout: 30 * 1000,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  expect: { timeout: 15 * 1000 },
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: baseURL,
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_APP_URL: baseURL },
  },
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
