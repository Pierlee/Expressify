const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv')
//seting up config file
dotenv.config({ path: 'backend/config/config.env'})

// Connecting to database
connectDatabase()

app.listen(process.env.PORT, () => {
console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`)
  console.log('Shuttin down the server due to Unhandled Promise rejection')
  server.close(() => {
    process.exit(1)
  })
})