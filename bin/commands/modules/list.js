'use strict'

const api = require('../../../')
const { attachProjectOptions, printResult } = require('../../common')

exports.command = 'list'

exports.description = 'Get the list of all uploaded modules (files) from the project'

/**
 * @param {import('yargs').Argv} yargs
 */
exports.builder = (yargs) => attachProjectOptions(yargs)

exports.handler = async (argv) => {
  const result = await api.Modules.list.run({
    projectId: argv['project-id'],
    token: argv['token'],
    endpointUrl: argv['endpoint-url'],
  })

  printResult(result)
}
