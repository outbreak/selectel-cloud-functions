'use strict'

const api = require('../../../')
const { attachProjectOptions } = require('../../common')

exports.command = 'destroy <module-id> [options]'

exports.description = 'Destroy the uploaded module (file) from the project'

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
  const result = await api.Modules.destroy.run({
    moduleId: argv['module-id'],
    projectId: argv['project-id'],
    token: argv['token'],
    endpointUrl: argv['endpoint-url'],
  })

  console.dir(result, { depth: null })
}
