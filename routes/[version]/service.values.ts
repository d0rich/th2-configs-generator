import { H3Event } from 'h3'
import { getRawConfig } from "../../utils/yamlWorker"
import {configureConfigResponse} from "../../utils/config"

export default defineEventHandler(async ({ event }) => {
  const {version} = await configureConfigResponse(event)
  const config = await getRawConfig('service.values', version)
  switch (version) {
    case '1-5-x':
      return process1_5_x(config, event);
    default:
      throw new Error(`Version ${version} is not supported`)
  } 
})

function process1_5_x(config: string, event: H3Event){
  interface ServiceInput1_5_x {
    host: string | undefined,
    token: string | undefined,
    repository: string,
    'c-host': string | undefined,
    dc: string | undefined,
  }
  // @ts-ignore
  const { "c-host": cassandraHost, dc, host, repository, token }: ServiceInput1_5_x = useQuery(event)
  return config.replace(/<repository>/g, repository)
    .replace(/<host>/g, host || '127.0.0.1')
    .replace(/<cassandra-host>/g, cassandraHost || '127.0.0.1')
    .replace(/<datacenter>/g, dc || 'datacenter1')
    .replace(/<username>/g, token || "''")
    .replace(/<password>/g, token || "''")
}