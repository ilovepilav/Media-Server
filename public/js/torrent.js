const outputFrame = document.getElementById('output')
const folderSelection = document.getElementById('folder-selection')
const magnetUrlInput = document.getElementById('magnet-url')

const addTorrent = async () => {
  const dirPath = folderSelection.value
  const magnetUrl = magnetUrlInput.value
  if (!dirPath || !magnetUrl) return console.error('path empty')
  clearOutput()
  const result = await sendRequest('/torrent/add-torrent', { url: magnetUrl, path: dirPath })
  fillOutput(result)
}


const startTorrent = async () => {
  clearOutput()
  const result = await sendRequest('/torrent/start-torrent', { id: torrentId })
  fillOutput(result)
}

const stopTorrent = async () => {
  clearOutput()
  const result = await sendRequest('/torrent/stop-torrent', { id: torrentId })
  fillOutput(result)
}

const pauseTorrent = async () => {
  clearOutput()
  const result = await sendRequest('/torrent/pause-torrent', { id: torrentId })
  fillOutput(result)
}

const listTorrents = async () => {
  clearOutput()
  const result = await sendRequest('/torrent/list-torrents')
}

const checkDaemon = async () => {
  clearOutput()
  const result = await sendRequest('/torrent/check-daemon')
  fillOutput(result)
}

const startDaemon = async () => {
  clearOutput()
  const result = await sendRequest('/torrent/start-daemon')
  fillOutput(result)
}

const stopDaemon = async () => {
  clearOutput()
  const result = await sendRequest('/torrent/stop-daemon')
  fillOutput(result)
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
  const result = await fetch(endPoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(body)
  })
  const resultJson = await result.json()

  return resultJson
}

const clearOutput = () => {
  outputFrame.innerHTML = ''
}

const fillOutput = (jsonData) => {
  jsonData.output.map((item) => {
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
