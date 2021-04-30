'use strict'

const defaultHandler = (argv) => {
  console.dir(argv, { depth: null })
  throw new Error('Not implemented!')
}

/**
 * @param {import('yargs').Argv} section
 */
module.exports = (section) => section
