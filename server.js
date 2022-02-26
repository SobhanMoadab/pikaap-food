const app = require('./app')
const http = require('http')
const port = process.env.PORT
const server = http.createServer(app)

server.listen( port, err => {
    err ? console.log(e) : console.log('Server connected on port: ' + port)
})