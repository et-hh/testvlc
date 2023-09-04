import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import clear from 'rollup-plugin-clear';
import json from 'rollup-plugin-json';

export default {
  input: [
    'src/main/index.js'
  ],
  output: {
    dir: 'app/main',
    format: 'cjs',
  },
  plugins: [
    clear({ targets: ['app/main'] }),
    replace({
      __PROD__: true,
    }),
    json(),
    resolve({
      resolveOnly: [/^@main\/.*$/],
    }),
    commonjs(),
  ],
};
