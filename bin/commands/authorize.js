'use strict'

const api = require('../../')
const { printResult } = require('../common')

const {
  OS_PROJECT_DOMAIN_NAME,
  OS_PROJECT_ID,
  OS_USER_DOMAIN_NAME,
  OS_PASSWORD,
  OS_AUTH_URL,
  OS_USERNAME,
} = process.env

exports.command = 'authorize <user-name>'

exports.description = 'Get access token'

/**
 * @param {import('yargs').Argv} yargs
 */
exports.builder = (yargs) =>
  yargs
    .positional('user-name', {
      description: 'User name',
      type: 'string',
    })
    .option('password', {
      description: 'User password',
      type: 'string',
      demandOption: false,
    })
    .option('project-domain-name', {
      description: 'Project domain name',
      type: 'string',
      demandOption: false,
    })
    .option('project-id', {
      description: 'Project ID',
      type: 'string',
      demandOption: false,
    })
    .option('user-domain-name', {
      description: 'User domain name',
      type: 'string',
      demandOption: false,
    })
    .option('endpoint-url', {
      description: 'Endpoint to get access token from Platform',
      type: 'string',
      demandOption: false,
      default: 'https://api.selvpc.ru/identity/v3/auth/tokens',
    })
    .group(
      [
        'password',
        'project-id',
        'project-domain-name',
        'user-domain-name',
        'endpoint-url',
      ],
      'Command Options:'
    )
    .middleware((argv) => {
      if (OS_PASSWORD) argv['password'] = OS_PASSWORD
      if (OS_PROJECT_ID) argv['project-id'] = OS_PROJECT_ID
      if (OS_PROJECT_DOMAIN_NAME)
        argv['project-domain-name'] = OS_PROJECT_DOMAIN_NAME
      if (OS_USER_DOMAIN_NAME) argv['user-domain-name'] = OS_USER_DOMAIN_NAME
      if (OS_AUTH_URL) argv['endpoint-url'] = OS_AUTH_URL
      if (OS_USERNAME) argv['user-name'] = OS_USERNAME

      return argv
    })


exports.handler = async (argv) => {
  const result = await api.authorize.run({
    userName: argv['user-name'],
    userPassword: argv.password,
    userDomainName: argv['user-domain-name'],
    projectId: argv['project-id'],
    projectDomainName: argv['project-domain-name'],
    endpointUrl: argv['endpoint-url'],
  })

  printResult(result)
}
