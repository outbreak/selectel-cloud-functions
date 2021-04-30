import { createReadStream } from 'fs'
import FormData from 'form-data'

import { got, ApiInvocation, ProjectOptions } from '../../common'

export type CommandOptions = {}

export type CommandParameters = {
  file: string
}

export type Options = ProjectOptions & CommandOptions & CommandParameters

export const run: ApiInvocation<Options> = async (options) => {
  const url = `${options.endpointUrl}/modules/upload`

  const form = new FormData()

  form.append('module', createReadStream(options.file))

  const headers = {
    'x-auth-token': options.token,
    'project-id': options.projectId,
    ...form.getHeaders(),
  }

  const request = got(url, {
    method: 'post',
    headers,
    body: form,
  })

  const { statusCode, timings, body } = await request

  return {
    statusCode,
    timings,
    body,
  }
}
