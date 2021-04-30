'use strict'

const api = require('../../../')
const { attachProjectOptions } = require('../../common')

exports.command = 'show <module-id> [options]'

exports.description = 'Get the uploaded module (file) from the project'

/**
 * @param {import('yargs').Argv} yargs
 */
exports.builder = (yargs) =>
  attachProjectOptions(
    yargs.positional('module-id', {
      description: 'Module ID',
      type: 'string',
    })
  )

exports.handler = async (argv) => {
  const result = await api.Modules.show.run({
    moduleId: argv['module-id'],
    projectId: argv['project-id'],
    token: argv['token'],
    endpointUrl: argv['endpoint-url'],
  })

  console.dir(result, { depth: null })
}
