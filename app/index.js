const express = require("express")
const mongoose = require("mongoose")
const v1 = require("./Routes/v1")
const cors = require("cors")
const ErrorHandler = require('./Handler/ErrorHandler')
const StatusCodes = require('./Values/StatusCodes')
const app = express()
require("dotenv").config()

// redis
const redis = require('redis')
const session = require('express-session');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    legacyMode: true
})
redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
}))
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

// express app config
app.use(cors())
app.use(express.json())


app.use("/api/v1", v1)
app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        const { result = '' } = err
        res.status(err.httpCode).json({ httpCode: err.httpCode, statusCode: err.statusCode, result })
    } else {
        console.log({ err })
        res.status(500).json({ statusCode: StatusCodes.ERROR_INTERNAL })
    }
});

module.exports = app
