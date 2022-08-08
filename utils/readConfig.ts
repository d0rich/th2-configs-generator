const DEFAULT_VERSION = '1-5-x'

const getYamlConfig = async (filename: string, version: string = DEFAULT_VERSION): Promise<string> => {
  return await useStorage().getItem(`assets/server/config-templates/th2-infra/${version}/${filename}.yaml`).toString()
}