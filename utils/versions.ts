import fs from 'fs/promises'
import { Request, Response } from 'express'

const DEFAULT_VERSION = '1-5-x'

export const getTh2InfraConfigsVersions = async (): Promise<string[]> => {
  return await fs.readdir('server/assets/config-templates/th2-infra')
}

export const checkTh2InfraVersion = async (req: Request, res: Response, next: any) => {
  const versions = await getTh2InfraConfigsVersions()
  const version: string = req.params.version?.toString() || DEFAULT_VERSION
  if (!versions.includes(version)){
      res.status(404).send(`Wrong th2-infra version: ${version}.\n Supported versions: ${versions.join(', ')}`)
      return
  }
  next()
}