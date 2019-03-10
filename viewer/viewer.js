const utils = require('./utils')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
app.use('/', express.static(path.join(__dirname, 'public')))
app.listen(PORT, () => utils.info(`App HTTP server is listening on port ${PORT}`))
