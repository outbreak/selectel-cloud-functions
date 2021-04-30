'use strict'

const api = require('../../../')
const { attachProjectOptions, printResult } = require('../../common')

exports.command = 'show <name>'

exports.description = 'Get the function parameters'

/**
 * @param {import('yargs').Argv} yargs
 */
exports.builder = (yargs) =>
  attachProjectOptions(
    yargs.positional('name', {
      description: 'Function name',
      type: 'string',
    })
  )

exports.handler = async (argv) => {
  const result = await api.Functions.show.run({
    name: argv['name'],
    projectId: argv['project-id'],
    token: argv['token'],
    endpointUrl: argv['endpoint-url'],
  })

  printResult(result)
}
