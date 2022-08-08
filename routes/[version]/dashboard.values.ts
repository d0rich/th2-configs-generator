import { getRawConfig } from "../../utils/yamlWorker"
import { useTh2InfraVersion } from "../../utils/versions";
import {configureConfigResponse} from "../../utils/config";

export default defineEventHandler(async ({ event }) => {
  const {version} = await configureConfigResponse(event)
  // @ts-ignore
  const {hosts}: { hosts: string | undefined } = useQuery(event)
  let config = await getRawConfig('dashboard.values', version)
  return config.replace('<hosts>', hosts || '')
  
})