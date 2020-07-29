var shell = require('shelljs')

shell.rm('-r', 'dist')
shell.exec('rollup -c rollup.config.js')