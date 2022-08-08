import { getRawConfig } from "../../utils/yamlWorker"
import {configureConfigResponse} from "../../utils/config";

export default defineEventHandler(async ({ event }) => {
  const {version} = await configureConfigResponse(event)
  // @ts-ignore
  const {hosts}: { hosts: string | undefined } = useQuery(event)
  const config = await getRawConfig('prometheus-operator.values', version)
  return config.replace(/<hosts>/g, hosts || '');
})