const outputFrame = document.getElementById('output')
const addTorrent = async () => {
  await sendRequest('/torrent/add-torrent', { url: magnetUrl, path: dirPath })
}

const startTorrent = async () => {
  await sendRequest('/torrent/start-torrent', { id: torrentId })
}

const stopTorrent = async () => {
  await sendRequest('/torrent/stop-torrent', { id: torrentId })
}

const pauseTorrent = async () => {
  await sendRequest('/torrent/pause-torrent', { id: torrentId })
}

const listTorrents = async () => {
  await sendRequest('/torrent/list-torrents')
}

const checkDaemon = async () => {
  await sendRequest('/torrent/check-daemon')
}

const startDaemon = async () => {
  await sendRequest('/torrent/start-daemon')
}

const stopDaemon = async () => {
  await sendRequest('/torrent/stop-daemon')
}


const sendRequest = async (endPoint, body) => {
  outputFrame.innerHTML = ''
  const result = await fetch(endPoint, { method: 'post', body: body })
  const resultJson = await result.json()
  resultJson.output.map((item) => {
    const pLine = createPElement(item)
    outputFrame.appendChild(pLine)
  })
}

const createPElement = (line) => {
  const element = document.createElement('p')
  element.innerText = line
  return element
}

