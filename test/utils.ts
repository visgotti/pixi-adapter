import { Page } from "@playwright/test";
import {PNG} from 'pngjs';
import fs from 'fs';
import path from 'path';

const images = [
  'rabbitv3_ash.png',
  'rabbitv3_batman.png',
  'rabbitv3_bb8.png',
  'rabbitv3_frankenstein.png',
  'rabbitv3_neo.png',
  'rabbitv3_sonic.png',
  'rabbitv3_spidey.png',
  'rabbitv3_stormtrooper.png',
  'rabbitv3_superman.png',
  'rabbitv3_tron.png',
  'rabbitv3_wolverine.png',
  'rabbitv3.png'
];

function base64ToUint8Array(base64) : Uint8Array {
  const binary = atob(base64); 
  const len    = binary.length;
  const bytes  = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function getImageDataUrl(page: Page, canvasId='canvas') {
  const dataUrl = await page.evaluate(() => {
    const _selector = canvasId.startsWith('#') ? canvasId : `#${canvasId}`;
    const canvas = document.querySelector(_selector) as HTMLCanvasElement;
    return canvas.toDataURL('image/png');    
  });
  return dataUrl;
}

export async function getCanvasPixelData(page: Page, canvasId='canvas') {
  const dataUrl = await getImageDataUrl(page, canvasId);
  const base64     = dataUrl.split(',')[1];
  const pixelArray = base64ToUint8Array(base64);
}

export function getBunnyImage(bunnyId: string) {
  const imgName = bunnyId.endsWith('.png') ? bunnyId : `${bunnyId}.png`;
  const found = images.find((img) => img === imgName);
  if(!found) {
    throw new Error(`Image ${imgName} not found`);
  }
  const imgPath = path.resolve(__dirname, `raw_images/${imgName}`);
  return fs.readFileSync(imgPath);
}