const vue = require('rollup-plugin-vue')
const pkg = require('./package.json')
const { terser } = require('rollup-plugin-terser')

const banner = `/*
 * vue-cloudimage-responsive v${pkg.version}
 *
 * @license
 * Copyright 2022, Scaleflex
 * Released under the MIT License
 */`

module.exports = {
    input: 'src/index.js',
    output: [
        {
          file: pkg.main,
          format: 'cjs',
          exports: 'named',
          sourcemap: false,
          banner
        },
        {
          file: pkg.module,
          format: 'es',
          exports: 'named',
          sourcemap: false,
          banner,
        }
      ],
    external: [
        'vue',
        'lodash.throttle',
        'core-js',
        'cloudimage-responsive-utils',
        'throttle-debounce'
    ],
    plugins: [
        vue(),
        terser(),
    ]
}