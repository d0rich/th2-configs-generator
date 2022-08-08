import fs from 'fs'

const DEFAULT_VERSION = '1-5-x'

const getYamlConfig = async (filename: string, version: string = DEFAULT_VERSION): Promise<string> => {
  return fs.readFileSync(`assets/config-templates/th2-infra/${version}/${filename}.yaml`).toString()
}