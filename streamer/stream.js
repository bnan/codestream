const chokidar = require('chokidar')
const fs = require('fs')
const WebSocket = require('ws')
const utils = require('./utils')
const argv = process.argv.slice(2)
const ws = new WebSocket(argv[1])

function stream(path) {
  if (ws.readyState === WebSocket.OPEN) {
    utils.info(`File ${path} changed on disk, streaming to central server...`)
    fs.readFile(path, 'utf8', (err, contents) => {
      ws.send(contents)
    })
  } else {
    utils.error(`Central server is not reachable.`)
    process.exit(1)
  }
}

chokidar.watch(argv[0]).on('change', (path) => stream(path))
