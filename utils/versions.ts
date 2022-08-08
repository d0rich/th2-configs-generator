import {H3Event} from "h3";
import fs from 'fs/promises'

export const getTh2InfraConfigsVersions = async (): Promise<string[]> => {
  const baseDir = 'src:public:config-templates:th2-infra:'
  return await fs.readdir('public/config-templates/th2-infra')
}

export async function useTh2InfraVersion({ context }: H3Event) {
    const { version }: { version: string } = context.params
    const versions = await getTh2InfraConfigsVersions()
    if (!versions.includes(version)){
        throw new Error(`Wrong th2-infra version: ${version}.\n Supported versions: ${versions.join(', ')}`)
    }
    return version
}