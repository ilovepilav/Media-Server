const outputFrame = document.getElementById('output')
const folderSelection = document.getElementById('folder-selection')
const magnetUrlInput = document.getElementById('magnet-url')

const addTorrent = async () => {
  const dirPath = folderSelection.value
  const magnetUrl = magnetUrlInput.value
  if (!dirPath || !magnetUrl) return console.error('path empty')
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

const getDirList = async () => {
  folderSelection.innerHTML = ''
  const folders = await fetch('/getfolders')
  const foldersJson = await folders.json()
  foldersJson.map((item) => {
    const optionElement = createOptionElement(item.name)
    folderSelection.appendChild(optionElement)
  })
}


const sendRequest = async (endPoint, body) => {
  outputFrame.innerHTML = ''
  const result = await fetch(endPoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(body)
  })
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
const createOptionElement = (name) => {
  const element = document.createElement('option')
  element.innerText = name
  return element
}
getDirList()
