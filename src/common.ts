import G from 'got'
import { Timings } from '@szmarczak/http-timer'
import { name, version, homepage } from '../package.json'

export type ProjectOptions = {
  token: string
  projectId: string
  endpointUrl: string
}

export type ApiInvocationResult = {
  statusCode: number
  timings: Timings
  body: unknown
}

export type ApiInvocation<T> = (options: T) => Promise<ApiInvocationResult>

const got = G.extend({
  headers: {
    'user-agent': `${name}/${version} (${homepage})`
  },
  responseType: 'json'
})

export { got }
