'use strict'

exports.command = 'modules <command>'
exports.description = 'Manage Modules'

/**
 * @param {import('yargs').Argv} yargs
 */
exports.builder = (yargs) =>
  yargs
    .command(require('./list'))
    .command(require('./show'))
    .command(require('./upload'))
    .command(require('./destroy'))
