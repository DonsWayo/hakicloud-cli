import chalk = require('chalk')
import {exit} from 'process'
import * as fs from 'fs-extra'
const isNative = require('is-native-module')

export const scan = (dir: string) => {
  fs.readdir(dir, (err, files) => {
    if (err) return
    fs.readFile(`${dir}/package.json`, (err, json) => {
      if (err) return
      const pkg = JSON.parse(json.toString('utf8'))
      if (isNative(pkg)) {
        const path = dir
        .replace('node_modules/', '')
        .replace(/\/?node_modules\//g, ' -> ')
        const n = path.lastIndexOf('/')
        const result = path.substring(n + 1)
        console.log(chalk.yellow(`Native module no allowed ${chalk.red(result)}`))
        exit(1)
      }
    })
    files
    .filter(f => !/^\./.test(f))
    .forEach(f => scan(`${dir}/${f}`))
  })
}
