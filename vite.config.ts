import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'umd'], 
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PIXI_ADAPTER',
      fileName: (format) => `pixi-adapter.${format}.js`
    },
    rollupOptions: {
      // externalize any peer deps you don’t want bundled:
      external: ['pixi.js'],
      output: {
        // provide a global variable for UMD builds:
        globals: {
          'pixi.js': 'PIXI'
        },
        // ensure correct export style in CJS:
        exports: 'named'
      }
    }
  }
});