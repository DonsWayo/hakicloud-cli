@hakicloud/cli
=============

hakicloud Cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@hakicloud/cli.svg)](https://npmjs.org/package/@hakicloud/cli)
[![CircleCI](https://circleci.com/gh/hakicloud/hakicloud-cli/tree/master.svg?style=shield)](https://circleci.com/gh/hakicloud/hakicloud-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@hakicloud/cli.svg)](https://npmjs.org/package/@hakicloud/cli)
[![License](https://img.shields.io/npm/l/@hakicloud/cli.svg)](https://github.com/hakicloud/hakicloud-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @hakicloud/cli
$ hakicloud COMMAND
running command...
$ hakicloud (-v|--version|version)
@hakicloud/cli/0.0.0 darwin-x64 node-v14.12.0
$ hakicloud --help [COMMAND]
USAGE
  $ hakicloud COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hakicloud hello [FILE]`](#hakicloud-hello-file)
* [`hakicloud help [COMMAND]`](#hakicloud-help-command)

## `hakicloud hello [FILE]`

describe the command here

```
USAGE
  $ hakicloud hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ hakicloud hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/hakicloud/hakicloud-cli/blob/v0.0.0/src/commands/hello.ts)_

## `hakicloud help [COMMAND]`

display help for hakicloud

```
USAGE
  $ hakicloud help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_
<!-- commandsstop -->
