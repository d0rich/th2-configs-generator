import fs from 'fs'
import { Request, Response } from 'express'

const DEFAULT_VERSION = '1-5-x'

const getTh2InfraConfigsVersions = (): string[] => {
  return fs.readdirSync('assets/config-templates/th2-infra')
}

const checkTh2InfraVersion = (req: Request, res: Response, next: any) => {
  const versions = getTh2InfraConfigsVersions()
  const version: string = req.params.version?.toString() || DEFAULT_VERSION
  if (!versions.includes(version)){
      res.status(404).send(`Wrong th2-infra version: ${version}.\n Supported versions: ${versions.join(', ')}`)
      return
  }
  next()
}