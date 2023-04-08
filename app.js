const express = require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const tasks = require('./routes/tasks')

// add frontend
app.use(express.static('./public'))

// middlewares
app.use(express.json())


// routes
app.use('/api/v1/tasks', tasks)

// NotFound
app.use(notFound)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
