import {H3Event} from "h3";

export const getTh2InfraConfigsVersions = async (): Promise<string[]> => {
  const baseDir = 'src:server:assets:config-templates:th2-infra:'
  const allFiles: string[] = await useStorage().getKeys(baseDir)
  const versionsSet = new Set(
    allFiles
      .map(f => f.replace(baseDir, ''))
      .map(f => f.split(':')[0])
      )
  return [...versionsSet]
}

export async function useTh2InfraVersion({ context }: H3Event) {
    const { version }: { version: string } = context.params
    const versions = await getTh2InfraConfigsVersions()
    if (!versions.includes(version)){
        throw new Error(`Wrong th2-infra version: ${version}.\n Supported versions: ${versions.join(', ')}`)
    }
    return version
}