'use strict'

const api = require('../../../')
const { attachProjectOptions } = require('../../common')

exports.command = 'upload <file> [options]'

exports.description = 'Upload module (file) into the project'

/**
 * @param {import('yargs').Argv} yargs
 */
exports.builder = (yargs) =>
  attachProjectOptions(
    yargs.positional('file', {
      description: 'Path to file for upload',
      type: 'string',
    })
  )

exports.handler = async (argv) => {
  const result = await api.Modules.upload.run({
    file: argv['file'],
    projectId: argv['project-id'],
    token: argv['token'],
    endpointUrl: argv['endpoint-url'],
  })

  console.dir(result, { depth: null })
}
