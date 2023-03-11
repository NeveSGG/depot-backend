require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/model')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')

const PORT = process.env.PORT || 5005

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
      .then(() => console.log('Connection has been established successfully.'))
      .catch(err => console.error('Unable to connect to the database:', err));
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()