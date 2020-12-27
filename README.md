@hakibase/cli
=============

Hakibase Cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@hakibase/cli.svg)](https://npmjs.org/package/@hakibase/cli)
[![CircleCI](https://circleci.com/gh/hakibase/hakibase-cli/tree/master.svg?style=shield)](https://circleci.com/gh/hakibase/hakibase-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@hakibase/cli.svg)](https://npmjs.org/package/@hakibase/cli)
[![License](https://img.shields.io/npm/l/@hakibase/cli.svg)](https://github.com/hakibase/hakibase-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @hakibase/cli
$ hakibase COMMAND
running command...
$ hakibase (-v|--version|version)
@hakibase/cli/0.0.0 darwin-x64 node-v14.12.0
$ hakibase --help [COMMAND]
USAGE
  $ hakibase COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hakibase hello [FILE]`](#hakibase-hello-file)
* [`hakibase help [COMMAND]`](#hakibase-help-command)

## `hakibase hello [FILE]`

describe the command here

```
USAGE
  $ hakibase hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ hakibase hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/hakibase/hakibase-cli/blob/v0.0.0/src/commands/hello.ts)_

## `hakibase help [COMMAND]`

display help for hakibase

```
USAGE
  $ hakibase help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_
<!-- commandsstop -->
