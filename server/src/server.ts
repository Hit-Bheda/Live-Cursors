import app from "./app";
import config from "./configs/config";
import { errorLogger, infoLogger } from "./logger/logger";
import WebSocket,{ WebSocketServer } from 'ws'
import http,{ createServer } from "http";
import url from "url";
import { v4 as uuidv4 } from 'uuid';

// Creted http server
const server = createServer(app)
const wsServer = new WebSocketServer({ server })

// Define connections
type connType = {
    [key:string]:WebSocket
}
const connections:connType = {} 

// Define user
type userType = {
    username:string,
    state:{
        x:number,
        y:number
    }
}
const users:{[key:string]:userType} = {}

// Created wsserver
wsServer.on("connection",(conn:WebSocket,req:http.IncomingMessage)=>{

    // Get username
    infoLogger.info("Connected With Client")
    const { username } = url.parse(req.url || '',true).query

    // Get uuid
    const uuid = uuidv4()
    infoLogger.info(`Username is ${username} And UUID is ${uuid}`)

    // Add uuid to connections
    connections[uuid] = conn

    // Add user to user object
    users[uuid] = {
        username : username as string,
        state:{
            x:0,
            y:0
        }
    }

    conn.on("message", message => handleMessage(message,uuid))

    // Delete user from user object
    conn.on("close",()=>{
        infoLogger.info(`Client ${username} Disconnected`)
        delete connections[uuid]
        delete users[uuid]
    })

})

const handleMessage = (message:any,uuid:string) => {
    const data = JSON.parse(message.toString())
    const user = users[uuid]
    user.state = data

    broadcastUser()
    infoLogger.info(`Message Received ${JSON.stringify(user)}`)
}

const broadcastUser = () => {
    Object.keys(connections).forEach((key)=>{
        connections[key].send(JSON.stringify(users))
    })
}
server.listen(config.port, () => {
    infoLogger.log('info','Server Is Listning On Port 3000')
})