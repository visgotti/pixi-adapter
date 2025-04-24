import { test, expect } from '@playwright/test';
import path from 'path';
import { PNG } from 'pngjs';
import fs from 'fs';
import pixelmatch from 'pixelmatch';

const asyncTimeout = (ts: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ts);
  });
}
async function loadAndAwait(page, testName: string) {
  await page.goto(`${path.resolve(import.meta.dirname, `../index.html`)}test=${testName}`);
  await asyncTimeout(1000);
  // wait for the page to finish the test
}

test.describe('WebGL library tests', () => {
  test('renders bunny', async ({ page }) => {
    await loadAndAwait(page, 'loadBunny');
    const canvas = await page.$('#canvas');
    const canvasBuffer = await canvas?.screenshot({ type: 'png'})!;
    console.log({ canvasBuffer})
    // save to test.png
    fs.writeFileSync(path.join(import.meta.dirname, 'test.png'), canvasBuffer);
    const expectedPngBuffer = fs.readFileSync(path.resolve(import.meta.dirname, '..', '..', '..', 'raw_images', 'rabbitv3_ash.png'));
    
    const actualPng   = PNG.sync.read(canvasBuffer);
    const expectedPng = PNG.sync.read(expectedPngBuffer);
    expect(actualPng.width).toBe(expectedPng.width);
    expect(actualPng.height).toBe(expectedPng.height);
    
    const diffOutput = new Uint8Array(Math.max(canvasBuffer.length, expectedPngBuffer.length));
    const numDiffPixels = pixelmatch(
      canvasBuffer,
      expectedPngBuffer,
      diffOutput,
      expectedPng.width,
      expectedPng.height,
      { threshold: 0 }
    );
    
    expect(numDiffPixels).toBe(0);
  });
});
