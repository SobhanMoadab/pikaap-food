const http = require('http')
const app = require('./app')

const port = process.env.PORT
const server = http.createServer(app)

server.listen(port, (err) => {
    if (err) console.log(e)
    else console.log('Server connected on port: ' + port)
})
