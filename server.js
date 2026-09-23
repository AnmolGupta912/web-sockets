import http from "node:http"
import fs from "node:fs"
import path from "node:path"
import {WebSocketServer} from 'ws'

const PORT = process.env.PORT ?? 9000


const httpServer = http.createServer(async function(req, res) {
    const indexFile =  await fs.promises.readFile(path.resolve("./index.html"), 'utf-8', () => console.log("reading html file"))
    // console.log(indexFile)
    res.setHeader('Content-type', "text/html")
    return res.end(indexFile)
})
const wsSocket = new WebSocketServer({server: httpServer})

wsSocket.on("connection", (webSocket) => {
    console.log(`WebSocket connection...`)

    webSocket.on("message", (data) => {
        console.log(`websocket Server message recv.. : ${data.toString()}`)
        webSocket.send("pongg.. hello ji from server") // sending res to client
    })

})

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
