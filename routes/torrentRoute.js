import * as torrentCommands from '../utilities/torrent.js'

export const torrentRoute = async (req, res) => {
  let response = 'success'
  const { id, url, path } = req.body
  try {
    switch (req.params.command) {
      case 'start-daemon':
        await torrentCommands.startTorrentDaemon()
        break;
      case 'check-daemon':
        response = await torrentCommands.checkDaemonRunning() ? 'Running' : 'Not running'
        break;
      case 'stop-daemon':
        await torrentCommands.stopTorrentDaemon()
        break;
      case 'list-torrents':
        response = await torrentCommands.listTorrents()
        break;
      case 'add-torrent':
        await torrentCommands.addTorrent(url, path)
        break;
      case 'stop-torrent':
        await torrentCommands.stopTorrent(id)
        break;
      case 'pause-torrent':
        await torrentCommands.pauseTorrent(id)
        break;
      case 'start-torrent':
        await torrentCommands.startTorrent(id)
        break;
      default:
        break;
    }
  } catch (error) {
    response = `Error : ${error}`
  }

  res.json({ output: response.split('\n') })
}

