const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {resolve} = require('path')

const app = express()

app.use(morgan(':status :method :url'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(resolve(__dirname, '..', 'public')))

app.listen(3000, () => {
  console.log('Phaser Test listening on port 3000!')
})
