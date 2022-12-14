import * as util from 'util'
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);

export const startTorrentDaemon = async () => {
  if (!(await checkDaemonRunning())) {
    return await commandExec('transmission-daemon')
  }
}

export const stopTorrentDaemon = async () => {
  return await commandExec('pkill -f transmission*')
}

export const checkDaemonRunning = async () => {
  const result = await commandExec('pgrep transmission-da')
  if (!isNaN(result[0])) return true
  return false
}


export const listTorrents = async () => {
  if (!(await checkDaemonRunning())) return 'Daemon is not running'
  return await commandExec('transmission-remote -l')
}

export const addTorrent = async (magnetUrl, dirPath) => {
  const currentDirectory = process.cwd()
  return await commandExec(`transmission-remote -a "${magnetUrl}" -w ${currentDirectory}/public/media/${dirPath}`)
}

export const stopTorrent = async (torrentId) => {
  return await commandExec(`transmission-remote -t ${torrentId} --remove`)
}

export const pauseTorrent = async (torrentId) => {
  return await commandExec(`transmission-remote -t ${torrentId} --stop`)
}

export const startTorrent = async (torrentId) => {
  return await commandExec(`transmission-remote -t ${torrentId} --start`)
}

export const commandExec = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);
    if (stderr) {
      return stderr
    }
    return stdout

  } catch (error) {
    return error.toString()
  }
}

