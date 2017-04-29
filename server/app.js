const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {resolve} = require('path')

const app = express()
const env = process.env
const cPort = env.PORT || 3000

app.use(morgan(':status :method :url'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(resolve(__dirname, '..', 'public')))

const server = app.listen(cPort, () => {
  const { address, port } = server.address()
  const host = address === '::' ? 'localhost' : address
  const urlSafeHost = host.includes(':') ? `[${host}]` : host
  console.log(`Blaundry App: http://${urlSafeHost}:${port}`)
})
