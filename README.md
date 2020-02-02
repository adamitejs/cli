@adamite/cli
============

Generate and manage Adamite instances

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@adamite/cli.svg)](https://npmjs.org/package/@adamite/cli)
[![CircleCI](https://circleci.com/gh/adamitejs/cli/tree/master.svg?style=shield)](https://circleci.com/gh/adamitejs/cli/tree/master)
[![Codecov](https://codecov.io/gh/adamitejs/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/adamitejs/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@adamite/cli.svg)](https://npmjs.org/package/@adamite/cli)
[![License](https://img.shields.io/npm/l/@adamite/cli.svg)](https://github.com/adamitejs/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @adamite/cli
$ adamite COMMAND
running command...
$ adamite (-v|--version|version)
@adamite/cli/0.2.0-beta.2 darwin-x64 node-v10.17.0
$ adamite --help [COMMAND]
USAGE
  $ adamite COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`adamite help [COMMAND]`](#adamite-help-command)
* [`adamite start [EXECUTABLE]`](#adamite-start-executable)

## `adamite help [COMMAND]`

display help for adamite

```
USAGE
  $ adamite help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `adamite start [EXECUTABLE]`

starts an Adamite server

```
USAGE
  $ adamite start [EXECUTABLE]
```

_See code: [src/commands/start.ts](https://github.com/adamitejs/cli/blob/v0.2.0-beta.2/src/commands/start.ts)_
<!-- commandsstop -->
