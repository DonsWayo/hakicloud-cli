import {Command} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import fetch from 'node-fetch'
import * as filesize from 'filesize'
import {API_URL} from '../constants'
import {encode} from 'base-64'
import cli from 'cli-ux'
const parse = require('comment-parser')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

export default class Deploy extends Command {
  static description = 'describe the command here'

  static examples = [
    '$ hakicloud deploy',
  ]

  async getProjectConfig(dir: any) {
    const userDaConfig = await fs.readJSON(path.join(dir, 'hakicloud.json'))
    return userDaConfig
  }

  getBuildCode(dir: any) {
    return new Promise(resolve => {
      require('@vercel/ncc')(dir, {
        // provide a custom cache path or disable caching
        // externals to leave as requires of the build
        // directory outside of which never to emit assets
        filterAssetBase: process.cwd(), // default
        minify: true, // default
        sourceMap: false, // default
        // when outputting a sourcemap, automatically include
        // source-map-support in the output file (increases output by 32kB).
        sourceMapRegister: true, // default
        watch: false,
        v8cache: false,
        quiet: true,
        debugLog: false,
      }).then(({code}) => {
        // console.log(code)
        resolve({success: true, code})
      }).catch(error => {
        resolve({success: false, error})
      })
    })
  }

  async upload(body: any): Promise<string> {
    return new Promise(async resolve => {
      const response = await fetch(API_URL + 'upload-function', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.status === 201) {
        resolve(chalk.green('Success deploy ') + chalk.yellow(body.name))
      } else {
        resolve(chalk.red('Upload fail ') +  response.status.toString())
      }
    })
  }

  getBytes(code: string) {
    return Buffer.byteLength(code, 'utf8')
  }

  async handleFunctionUpload(filePath: string, fileName: any, config: any) {
    cli.action.start('Deploying function ' + chalk.yellow(fileName))
    const functionParam = await fs.readFile(filePath,  'utf8')
    const typeApi = await parse(functionParam)
    const tag = typeApi[0].tags[0].tag
    const {env, namespace} = config

    if (!env) {
      return this.error('Env is missing')
    }

    if (!tag) {
      return this.error('Tag is missing, check if function have the comment with the type. (example: @GET)')
    }

    if (!namespace) {
      return this.error('namespace is missing')
    }
    const buildCode: any = await this.getBuildCode(filePath)
    if (!buildCode.success) {
      this.error(buildCode.error)
    }

    const body = {
      namespace,
      gatewayBasePath: env,
      gatewayPath: fileName,
      gatewayMethod: tag,
      name: fileName,
      code: buildCode.code,
    }

    const upload: string = await this.upload(body)
    const fSize = filesize(Number(Buffer.byteLength(buildCode.code, 'utf8')))
    cli.action.stop(upload + ' Build size: ' + chalk.blue(fSize))
  }

  async run() {
    cli.action.start('Starting')
    const dir = process.cwd()
    const config = await this.getProjectConfig(dir)
    const functions = await fs.readdir(dir + '/src/functions')
    for await (const file of functions) {
      await this.handleFunctionUpload(dir + '/src/functions/' + file, file.split('.').slice(0, -1).join('.'), config)
    }
    this.log(logSymbols.info, 'Url: https://functions-lon-1.hakicloud.com/api/23bc46b1-71f6-4ed5-8c54-816aa4f8c502/dev')
  }
}
