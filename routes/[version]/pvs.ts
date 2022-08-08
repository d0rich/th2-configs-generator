import { getRawConfig } from "../../utils/yamlWorker"
import {configureConfigResponse} from "../../utils/config";

export default defineEventHandler(async ({ event }) => {
  const {version} = await configureConfigResponse(event)
  // @ts-ignore
  const {'node-name': nodename}: { 'node-name': string | undefined } = useQuery(event)
  const config = await getRawConfig('pvs', version)
  return config.replace(/<node-name>/g, nodename || 'minikube')
})