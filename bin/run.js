#!/usr/bin/env node

const program = require('yargs/yargs')(process.argv.slice(2))

const FeedsSection = require('./commands/feeds')
const ActivationsSection = require('./commands/activations')

program
  .usage(
    '$0 <authorize|modules|functions|feeds|activations> <command> [options]'
  )
  .command(require('./commands/authorize'))
  .command(require('./commands/modules'))
  .command(require('./commands/functions'))
  .command('feeds <command>', 'manage Feeds', FeedsSection)
  .command('activations <command>', 'manage Activations', ActivationsSection)

  .option('verbose', {
    description: 'Run commands with details',
    type: 'boolean',
    global: true,
    default: false,
  })
  .group(['help', 'version', 'verbose'], 'Options:')

  .completion()
  .demandCommand()
  .epilog('>> https://github.com/outbreak/selectel-cloud-functions')
  .wrap(program.terminalWidth()).argv
