const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const vue = require('rollup-plugin-vue')
const pkg = require('./package.json')

const banner = `/*
 * vue-cloudimage-responsive v${pkg.version}
 *
 * @license
 * Copyright 2020, Scaleflex
 * Released under the MIT License
 */`

module.exports = {
    input: 'src/index.js',
    output: [
        { file: 'dist/index.cjs.js', format: 'cjs', banner, exports: 'named' },
        { file: 'dist/index.es.js', format: 'es', banner }
    ],
    external: [
        'vue',
        'lodash.throttle',
        'core-js',
        'cloudimage-responsive-utils'
    ],
    plugins: [
        commonjs(),
        vue(),
        babel({
            runtimeHelpers: true
        })
    ]
}