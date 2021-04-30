import { got, ApiInvocation } from '../common'

export type Options = {
  projectId: string
  projectDomainName: string
  userName: string
  userPassword: string
  userDomainName: string
  endpointUrl: string
}

export const run: ApiInvocation<Options> = async (options) => {
  const url = options.endpointUrl

  const json = {
    auth: {
      identity: {
        methods: ['password'],
        password: {
          user: {
            name: options.userName,
            password: options.userPassword,
            domain: { name: options.userDomainName },
          },
        },
      },
      scope: {
        project: {
          id: options.projectId,
          domain: { name: options.projectDomainName },
        },
      },
    },
  }

  const request = got(url, { method: 'post', json })

  const { statusCode, headers, timings } = await request

  const token = headers['x-subject-token']

  return { statusCode, timings, body: token ? String(token) : null }
}
