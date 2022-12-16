import * as util from 'util'
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);

export const startTorrentDaemon = async () => {
  return await commandExec('transmission-daemon')
}

export const checkDaemonRunning = async () => {
  const result = await commandExec('pgrep transmission-da')
  if (!result) return false
  if (!result[0]) return false
  if (!isNan(result[0])) return false
  return true
}

export const listTorrents = async () => {
  return await commandExec('transmission-remote -l')
}

export const addTorrent = async (magnetUrl, dirPath) => {
  return await commandExec(`transmission-remote -a "${magnetUrl}" -w ${dirPath}`)
}

export const stopTorrent = async (torrentId) => {
  return await commandExec(`transmission-remote -t ${torrentId} --remove`)
}

export const stopAllTorrent = async () => {
  return await commandExec('transmission-remote -t all --remove')
}

export const pauseTorrent = async (torrentId) => {
  return await commandExec(`transmission-remote -t ${torrentId} --stop`)
}

export const pauseAllTorrent = async () => {
  return await commandExec('transmission-remote -t all --stop')
}

export const startAllTorrent = async () => {
  return await commandExec('transmission-remote -t all --start')
}

export const commandExec = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);
    if (stderr) {
      return stderr
    }
    return stdout

  } catch (error) {
    return error
  }
}
