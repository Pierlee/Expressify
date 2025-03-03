const express = require('express')
const app = express()

app.use(express.json())

//Import all routes
const product = require('./routes/product')

//any route defined in routes/product.js will be prefixed with /api/v1
app.use('/api/v1', product)
module.exports = app