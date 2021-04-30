import { ApiInvocation, got, ProjectOptions } from '../../common'

export type CommandOptions = {}

export type CommandParameters = {
  name: string
}

export type Options = ProjectOptions & CommandOptions & CommandParameters

export const run: ApiInvocation<Options> = async (options) => {
  const url = `${options.endpointUrl}/functions/${options.name}`

  const headers = {
    'x-auth-token': options.token,
    'project-id': options.projectId,
  }

  const request = got(url, {
    method: 'get',
    headers,
  })

  const { statusCode, timings, body } = await request

  return {
    statusCode,
    timings,
    body
  }
}
