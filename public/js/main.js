let data;
const outerUl = document.getElementById('outer-list')
const videoElement = document.getElementById('video-element')
const dropDown = document.getElementById('dropdown')

const getFolders = async () => {
  const folderData = await fetch('/getfolders')
  const jsonData = await folderData.json()
  data = jsonData
  return jsonData
}

getFolders()

const fillDropdown = async () => {
  if (!data) {
    data = await getFolders()
  }

  data.map((element) => {
    const tempDropElement = document.createElement('option')
    tempDropElement.setAttribute('name', element.name)
    tempDropElement.innerText = element.name
    tempDropElement.value = element.name

    dropDown.appendChild(tempDropElement)
  })
}

fillDropdown()

const fillMovie = async (sender) => {
  if (!data) {
    await getFolders()
  }
  outerUl.innerHTML = ''
  const selected = getSelectedFolder(sender.value).children.sort((a, b) => { return abcSort(a.name, b.name) })

  selected.map((item) => {
    const ulElement = createUlElement(item)
    outerUl.appendChild(ulElement)
  })

}

const getSelectedFolder = (folderName) => {
  return data.filter(folder => folder.name === folderName)[0]
}

const createLiElement = (data) => {
  let liElement = document.createElement('li')
  liElement.classList.add('list-item')
  liElement.setAttribute('data', data.path)
  liElement.addEventListener('click', (e) => {
    e.preventDefault()
    const source = e.target.getAttribute('data')
    return changeVideo(source)
  })
  liElement.innerText = data.name
  return liElement
}

const createUlElement = (data) => {
  let ulElement = document.createElement('ul')
  ulElement.classList.add('inner-list')
  ulElement.appendChild(createH4Element(data.name))

  data.children && data.children.sort((a, b) => { return abcSort(a.name, b.name) }).map((ele) => {
    if (ele.type === 'directory') {
      ulElement.appendChild(createUlElement(ele))
    } else {
      ulElement.appendChild(createLiElement(ele))
    }
  })
  return ulElement
}

const createH4Element = (name) => {
  let h4Element = document.createElement('h4')
  h4Element.classList.add('list-title')
  h4Element.innerText = name
  return h4Element
}
const abcSort = (a, b) => {
  a = a.slice(0, 2).replace(/\D/g, '')
  b = b.slice(0, 2).replace(/\D/g, '')
  return a - b
}

const changeVideo = (source) => {
  const sourceElement = document.getElementById('source-element')
  videoElement.removeChild(sourceElement)
  let srcEle = document.createElement('source')
  srcEle.src = source.replace('public/media', '/media')
  srcEle.type = 'video/mp4'
  srcEle.id = 'source-element'
  videoElement.appendChild(srcEle)
  videoElement.play()
}
