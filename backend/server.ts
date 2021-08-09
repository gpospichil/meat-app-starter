import * as jsonServer from 'json-Server'
import { Express } from 'express'
import * as fs from 'fs'
import * as https from 'https'
import { handleAuthentication } from './auth'

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.post('/login', handleAuthentication)

server.use(router)

const options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server)
    .listen(3001, () => {
        console.log('JSON Server is running on https://localhost:3001')
    })