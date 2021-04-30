'use strict'

const api = require('../../../')
const { attachProjectOptions, printResult } = require('../../common')

exports.command = 'list'

exports.description = 'Get the list of all functions in the project'

/**
 * @param {import('yargs').Argv} yargs
 */
exports.builder = (yargs) =>
  attachProjectOptions(
    yargs
      .option('skip', {
        type: 'number',
        description: 'Count of functions to skip',
        demandOption: false,
      })
      .option('limit', {
        type: 'number',
        description: 'Count of functions to show',
        demandOption: false,
      })
      .option('name', {
        type: 'string',
        description: 'Function name',
        demandOption: false,
      })
      .option('sort-by', {
        type: 'string',
        description: 'Sort field, default is last update',
        demandOption: false,
      })
      .option('order-by', {
        type: 'string',
        description: 'Order by, may "asc" or "desc"',
        demandOption: false,
        choices: ['asc', 'desc'],
        default: 'asc',
      })
      .group(
        ['limit', 'skip', 'name', 'sort-by', 'order-by'],
        'Command Options:'
      )
  )

exports.handler = async (argv) => {
  const result = await api.Functions.list.run({
    projectId: argv['project-id'],
    token: argv['token'],
    endpointUrl: argv['endpoint-url'],
    limit: argv['limit'],
    skip: argv['skip'],
    name: argv['name'],
    sortBy: argv['sort-by'],
    orderBy: argv['order-by'],
  })

  printResult(result)
}
