import {Command} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import fetch from 'node-fetch'
import * as filesize from 'filesize'
import {API_URL} from '../constants'
import {encode} from 'base-64'

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
        watch: false, // default
        v8cache: false, // default
        quiet: false, // default
        debugLog: false, // default
      }).then(({code}) => {
        // console.log(code)
        resolve({success: true, code})
      }).catch(error => {
        resolve({success: false, error})
      })
    })
  }

  async upload(buildCode: string) {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + encode('a232-71f6-4ed5-8c54-as:sas'),
        },
        body: JSON.stringify({}),
      })
      if (response.status === 200) {
        this.log('Success deploy')
      }
    } catch (error) {
      this.error(error)
    }
  }

  getBytes(code: string) {
    return Buffer.byteLength(code, 'utf8')
  }

  async run() {
    const dir = process.cwd()
    // const makeProdInstall =
    const buildCode: any = await this.getBuildCode(dir + '/index.js')
    if (!buildCode.success) {
      this.error(buildCode.err)
    }
    const fSize = filesize(Number(Buffer.byteLength(buildCode.code, 'utf8')))
    this.log('Build size: ' + fSize)
    // console.log(encode(buildCode.code))
    // const getBase = encode(buildCode.code)
    this.upload(buildCode.code)
  }
}
