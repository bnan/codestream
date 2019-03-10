const utils = require('./utils')

const express = require('express')
const app = express()
const port = 3000
const path = require('path')
app.use('/', express.static(path.join(__dirname, '../viewer')))
app.listen(port, () => utils.info(`App HTTP server is listening on port ${port}`))


const http = require('http')
const PORT = process.env.PORT || 1337
const httpServer = http.createServer((request, response) => {})
httpServer.listen(PORT, () => utils.info(`WS-supporting HTTP server is listening on port ${PORT}`))


const uuidv4 = require('uuid/v4')
const WebSocket = require('ws')
const wsServer = new WebSocket.Server({ server: httpServer })
wsServer.on('connection', (ws, request) => {
  ws.ip = request.connection.remoteAddress
  ws.id = uuidv4()

  // Stream code from source to
  ws.on('message', (data) => {
    const json = JSON.parse(data)

    if (json.type === 'role' && json.role === 'streamer') {
      ws.role = 'streamer'
      ws.send(JSON.stringify({'type': 'uuid', 'uuid': ws.id, 'url': `http://127.0.0.1:3000/#${ws.id}`}))
      utils.info(`Streamer ${ws.id} connected`)
    } else if (json.type === 'role' && json.role === 'viewer') {
      ws.role = 'viewer'
      ws.viewing = json.viewing
      utils.info(`Viewer connected to ${json.viewing}`)
    } else if (json.type === 'file') {
      wsServer.clients.forEach(function each(client) {
        if (client.role === 'viewer' && client.viewing === json.streamer && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(json))
          utils.info(`Streamer ${json.streamer} streamed to viewer ${client.id}`)
        }
      })
    }
  })
})
