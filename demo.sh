#!/bin/sh

tmux new-session -d 'node server/server.js'
tmux split-window -v 'node viewer/viewer.js'
tmux split-window -v 'node streamer/stream.js --file README.md --url ws://127.0.0.1:1337'
tmux -2 attach-session -d
