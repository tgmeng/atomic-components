import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

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
    typescript(),
    babel({
      babelHelpers: 'bundled',
      include: 'src/**',
    }),
    peerDepsExternal(),
  ],
};
