# codestream

Stream a file to a server which relays it to connected clients via WebSockets.

## Relay

Start the server that relays the stream to the connected clients:

```
cd relay/
npm install
node server.js
```

## Streamer

Stream a file to the server:

```
cd streamer/
npm install
node stream.js --file stream.js --url ws://127.0.0.1:1337
```

## Viewer

Launch the viewer web application:

```
cd viewer/
npm install
node viewer.js
```
