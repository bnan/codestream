const WebSocket = require('ws')
const uuidv4 = require('uuid/v4')
const http = require('http')
const utils = require('./utils')


const PORT = process.env.PORT || 1337
const httpServer = http.createServer((request, response) => {})
httpServer.listen(PORT, () => utils.info(`Server is listening on port ${PORT}`))

const wsServer = new WebSocket.Server({ server: httpServer })
wsServer.on('connection', (ws, request) => {
  ws.ip = request.connection.remoteAddress
  ws.id = uuidv4()
  utils.info(`New connection from origin with IP address ${ws.ip} has been given the UUID ${ws.id}.`)

  // Stream code from source to
  ws.on('message', (message) => {
    utils.info(`Received stream of code`)
    wsServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })
})
