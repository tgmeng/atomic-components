import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.browser,
      name: 'FabricComponents',
      format: 'umd',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    peerDepsExternal(),
    typescript({
      include: 'src/**',
    }),
    babel({
      babelHelpers: 'bundled',
      include: 'src/**',
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
    }),
    url(),
    svgr(),
  ],
};
