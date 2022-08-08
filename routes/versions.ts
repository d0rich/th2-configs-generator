import { getTh2InfraConfigsVersions } from '../utils/versions'

export default defineEventHandler(async (event) => {
  const versions = await getTh2InfraConfigsVersions()
  return ({
      _description: 'Supported configurations for versions of th2-infra',
      _count: versions.length,
      items: versions
  })
})