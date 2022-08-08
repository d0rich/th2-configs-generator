import {H3Event} from "h3";

const DEFAULT_VERSION = '1-5-x'

export const getRawConfig = async (filename: string, version: string = DEFAULT_VERSION): Promise<string> => {
  return await useStorage().getItem(`src:server:assets:config-templates:th2-infra:${version}:${filename}.yaml`)
}

export function setYamlResponse({ res }: H3Event) {
  res.setHeader('content-type', 'text/yaml')
}