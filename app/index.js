const express = require("express")
const mongoose = require("mongoose")
const v1 = require("./Routes/v1")
const cors = require("cors")
const ErrorHandler = require('./Handler/ErrorHandler')
const StatusCodes = require('./Values/StatusCodes')
const app = express()

require("dotenv").config()
app.use(cors())
app.use(express.json())

// const MONGOOSE_USR = process.env.MONGOOSE_USR
// const MONGOOSE_PWD = process.env.MONGOOSE_PWD
// const MONGOOSE_PORT = process.env.MONGOOSE_PORT
// const MONGOOSE_IP = process.env.MONGOOSE_IP
// const MONGOOSE_DATABASE_NAME = process.env.MONGOOSE_DATABASE_NAME
// const MONGOOSE_CONNECTION_URL = `mongodb://${MONGOOSE_USR}:${MONGOOSE_PWD}@${MONGOOSE_IP}:${MONGOOSE_PORT}/${MONGOOSE_DATABASE_NAME}`
// const MONGOOSE_CONFIG = {
//   useNewUrlParser: true,
//   authSource: MONGOOSE_DATABASE_NAME,
//   useUnifiedTopology: true,
// }
const MONGOOSE_CONNECTION_URL = 'mongodb://localhost/pikaapFood'
mongoose
    .connect(MONGOOSE_CONNECTION_URL)
    .then(async () => {
        console.log('Mongoose connected')
    })
    .catch((err) => {
        console.log({ MONGO_ERROR: err })
    })

app.use("/api/v1", v1)
app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        const { result = '' } = err
        res.status(err.httpCode).json({ httpCode: err.httpCode, statusCode: err.statusCode, result})
    } else {
        console.log({ err })
        res.status(500).json({ statusCode: StatusCodes.ERROR_INTERNAL })
    }
});

module.exports = app
