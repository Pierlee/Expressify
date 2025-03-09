const express = require('express')
const app = express()

const errorMiddleware = require('./middlewares/errors')

app.use(express.json())

//Import all routes
const product = require('./routes/product')

//any route defined in routes/product.js will be prefixed with /api/v1
app.use('/api/v1', product)

//Middleware to handle errors
app.use(errorMiddleware)
module.exports = app