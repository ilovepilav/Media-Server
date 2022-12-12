import dirTree from 'directory-tree'
import { allowedVideoTypes } from './constants.js'

const getDirTree = async () => {
  const reg = new RegExp(`\.(${allowedVideoTypes.join('|')})`)
  return dirTree(`public/media`, { extensions: reg, attributes: ['type'] })
}

export { getDirTree }
