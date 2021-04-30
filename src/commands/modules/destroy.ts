import { got, ApiInvocation, ProjectOptions } from '../../common'

export type CommandOptions = {}

export type CommandParameters = {
  moduleId: string
}

export type Options = ProjectOptions & CommandOptions & CommandParameters

export const run: ApiInvocation<Options> = async (options) => {
  const url = `${options.endpointUrl}/modules/${options.moduleId}`

  const headers = {
    'x-auth-token': options.token,
    'project-id': options.projectId,
  }

  const request = got(url, {
    method: 'delete',
    headers,
  })

  const { statusCode, timings, body } = await request

  return { statusCode, timings, body }
}
