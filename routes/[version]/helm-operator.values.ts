import { getRawConfig } from "../../utils/yamlWorker"
import {configureConfigResponse} from "../../utils/config";

export default defineEventHandler(async ({ event }) => {
  const {version} = await configureConfigResponse(event)
  const config = await getRawConfig('helm-operator.values', version)
  return config
})