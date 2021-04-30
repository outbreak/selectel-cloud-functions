'use strict'

const { OS_PROJECT_ID, OS_API_URL, OS_TOKEN } = process.env

/**
 * @param {import('yargs').Argv} yargs
 */
exports.attachProjectOptions = (yargs) =>
  yargs
    .option('token', {
      description: 'Access token',
      type: 'string',
      demandOption: false,
    })
    .option('project-id', {
      description: 'Project ID',
      type: 'string',
      demandOption: false,
    })
    .option('endpoint-url', {
      description: 'Endpoint to Cloud Functions',
      type: 'string',
      demandOption: false,
      default: 'https://ru-1.api.serverless.selcloud.ru/v1',
    })
    .group(['project-id', 'token', 'endpoint-url'], 'Project Options:')
    .middleware((argv) => {
      if (OS_PROJECT_ID) argv['project-id'] = OS_PROJECT_ID
      if (OS_TOKEN) argv['token'] = OS_TOKEN
      if (OS_API_URL) argv['api-url'] = OS_API_URL
      return argv
    })

/**
 * @param {import('../build/types').ApiInvocationResult} result
 */
exports.printResult = ({ body, timings }) => {
  console.log('Result:')
  console.log()
  console.log(JSON.stringify(body, null, 2))
  console.log()
  console.log('Execution time: %s ms', timings.end - timings.start)
}
