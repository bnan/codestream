# stream

## Server

Start the server that relays the streamer data to the connected clients:

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
node stream.js -f stream.js -u ws://localhost:1337
```
