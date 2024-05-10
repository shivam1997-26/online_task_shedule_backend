const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const instructorRouter = require('./router/instructor')
const courseRouter = require('./router/course')
const lectureRouter = require('./router/lecture')
const dbConn = require('./config/conn')
const app = express()


app.use(express.json())
app.use(cors('*'))
app.use('/course', express.static('public'))

dbConn()

const PORT = process.env.PORT || 8000

app.use('/api', instructorRouter)
app.use('/api', courseRouter)
app.use('/api',lectureRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
