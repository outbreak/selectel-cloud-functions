import { got, ApiInvocation, ProjectOptions } from '../../common'

export type CommandOptions = {
  limit?: number
  skip?: number
  name?: string
  sortBy?: string
  orderBy?: 'asc' | 'desc'
}

export type Options = ProjectOptions & CommandOptions

export const run: ApiInvocation<Options> = async (options) => {
  const url = `${options.endpointUrl}/functions`

  const headers = {
    'x-auth-token': options.token,
    'project-id': options.projectId,
  }

  const { limit, skip, name, sortBy, orderBy } = options

  const searchParams: Record<string, string> = {}
  limit && (searchParams['limit'] = String(limit))
  skip && (searchParams['skip'] = String(skip))
  name && (searchParams['name'] = name)
  sortBy && (searchParams['sort_field'] = sortBy)
  orderBy && (searchParams['sort_type'] = orderBy)

  const request = got(url, {
    method: 'get',
    headers,
    searchParams
  })

  const { statusCode, timings, body, requestUrl } = await request

  console.log(requestUrl, searchParams)

  return {
    statusCode,
    timings,
    body,
  }
}
