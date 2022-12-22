const outputFrame = document.getElementById('output')
document.querySelectorAll('.request-button').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    outputFrame.innerHTML = ''
    sendRequest(e.target)
  })
})




const sendRequest = async (sender) => {
  const result = await fetch(`/torrent/${sender.id}`, { method: 'post' })
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

