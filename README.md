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
node stream.js -f stream.js -u ws://127.0.0.1:1337
```

## Viewer

Launch the viewer web application:

```
cd viewer/
npm install
node viewer.js
```
