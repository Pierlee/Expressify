const express = require('express')
const app = express()

const errorMiddleware = require('./middlewares/errors')

app.use(express.json())

//Import all routes
const product = require('./routes/product')
const auth = require('./routes/auth')

//any route defined in routes/product.js will be prefixed with /api/v1
app.use('/api/v1', product)
app.use('/api/v1', auth)

//Middleware to handle errors
app.use(errorMiddleware)
module.exports = app