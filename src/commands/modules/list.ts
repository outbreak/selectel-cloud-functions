import { got, ApiInvocation, ProjectOptions } from '../../common'

export type CommandOptions = {}

export type Options = ProjectOptions & CommandOptions

export const run: ApiInvocation<Options> = async (options) => {
  const url = `${options.endpointUrl}/modules`

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
    body,
  }
}
