import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';


const app = express ();
const PORT = process.env.PORT||8080;
const server =  app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

const io = new Server(server); 

app.use(express.static(__dirname + '/public'))
let messagelog = [];


io.on('connection', socket=>{
    socket.broadcast.emit('notification')

    socket.on('message',data=>{
        messagelog.push(data)
        io.emit('log',messagelog)
    })

})