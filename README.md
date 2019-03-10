# stream

Stream the contents of a file to a server (which web clients are connected to) via WebSockets whenever it is touched, effectively creating a live stream coding experience.

## Server

Start the server that relays the streamer to the connected clients:

```
cd server/
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
