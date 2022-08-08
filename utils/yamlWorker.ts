import {H3Event} from "h3";
import fs from 'fs/promises'

const DEFAULT_VERSION = '1-5-x'

export const getRawConfig = async (filename: string, version: string = DEFAULT_VERSION): Promise<string> => {
  return await fs.readFile(`public/config-templates/th2-infra/${version}/${filename}.yaml`, { encoding: 'utf-8' })
}

export function setYamlResponse({ res }: H3Event) {
  res.setHeader('content-type', 'text/yaml')
}