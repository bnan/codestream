const utils = require('./utils')
const http = require('http')
const PORT = process.env.PORT || 1337
const httpServer = http.createServer((request, response) => {})
httpServer.listen(PORT, () => utils.info(`WS-supporting HTTP server is listening on port ${PORT}`))

const uuidv4 = require('uuid/v4')
const WebSocket = require('ws')
const wsServer = new WebSocket.Server({ server: httpServer })
let currentFiles = {}
wsServer.on('connection', (ws, request) => {
  ws.ip = request.connection.remoteAddress
  ws.id = uuidv4()

  ws.on('message', (data) => {
    const json = JSON.parse(data)

    if (json.type === 'role' && json.role === 'streamer') {
      ws.role = 'streamer'
      ws.send(JSON.stringify({'type': 'uuid', 'uuid': ws.id, 'url': `http://127.0.0.1:3000/#${ws.id}`}))
      currentFiles[ws.id] = json.file
      utils.info(`Streamer ${ws.id} connected`)
    } else if (json.type === 'role' && json.role === 'viewer') {
      ws.role = 'viewer'
      ws.viewing = json.viewing
      utils.info(`Viewer connected with intention to watch ${json.viewing}`)
      // Stream file the first time the viewer connects
      if(currentFiles[ws.viewing]) {
        ws.send(JSON.stringify({'type': 'file', 'file': currentFiles[ws.viewing]}))
      }
    } else if (json.type === 'file') {
      wsServer.clients.forEach(client => {
        if (client.role === 'viewer' && client.viewing === json.streamer && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(json))
          utils.info(`Streamer ${json.streamer} streamed to viewer ${client.id}`)
        }
      })
    }
  })
})
