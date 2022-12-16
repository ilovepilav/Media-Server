import { execShellCommand } from './torrent.js'

const getResult = () => {
  execShellCommand('ls -al').then((stdout) => {
    console.log(stdout)
  })
}

getResult()
