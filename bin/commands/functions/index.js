'use strict'

exports.command = 'functions <command>'

exports.description = 'Manage Functions'

/**
 * @param {import('yargs').Argv} section
 */
exports.builder = (section) =>
  section
    .command(require('./list'))
    .command(require('./show'))
    .command(
      'create <name> [options]',
      'Create function',
      (cmd) =>
        cmd
          .positional('name', {
            description: 'Function name',
            type: 'string',
          })
          .option('id', {
            description: 'Function ID',
            type: 'string',
            demandOption: false,
          })
          .option('file-name', {
            description: 'Function file name',
            type: 'string',
            demandOption: false,
          })
          .option('index-file', {
            description:
              'Path to index function file in uploaded module (file), example: "package/index.js"',
            type: 'string',
            demandOption: false,
          })
          .option('index-method', {
            description: 'Name of "main" method in index file, example: "run"',
            type: 'string',
            demandOption: false,
          })
          .option('env-var', {
            description:
              'Environment variable, can many in format: ENV_NAME=ENV_VALUE',
            type: 'array',
            demandOption: false,
          })
          .option('limit-memory', {
            description: 'Memory limit',
            type: 'number',
            choices: [256, 512, 1024],
            default: 256,
            demandOption: false,
          })
          .group(
            [
              'id',
              'file-name',
              'index-file',
              'index-method',
              'env-var',
              'limit-memory',
            ],
            'Command Options:'
          )
          .example(['scf functions create my-function'].join('\n\t'), ''),
    )
    .command('update', '', (cmd) => cmd)
    .command('publish', '', (cmd) => cmd)
    .command('invoke', '', (cmd) => cmd)
    .command(
      'destroy <name> [options]',
      'Destroy the uploaded module (file) from the project',
      (cmd) =>
        cmd.positional('name', {
          description: 'Function name',
          type: 'string',
        }),
    )
