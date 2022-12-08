import * as fs from 'node:fs/promises'
import dirTree from 'directory-tree'

const getFilesAndFolders = async (path) => {
  const fileAndFolders = await fs.readdir(path, { withFileTypes: true })
  console.log(dirTree(path, { extensions: /\.(mp4|wmv)$/ }))
  return fileAndFolders
}

const filterMp4 = (file) => {
  if (file.name.endsWith('mp4')) return file
}

const filterDirectory = (folder) => {
  if (folder.isDirectory()) return folder
}

const getDirTree = async () => {
  return dirTree(`public/media`, { extensions: /\.(mp4|wmv)$/ })
}


export { getFilesAndFolders, filterMp4, filterDirectory, getDirTree }
