const express = require('express')
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const fs = require('fs')

var live_users = [];

const home_page = fs.readFileSync('index.html','utf-8')
const script = fs.readFileSync('script.js','utf-8')

app.get('/',(req,res) => {
    res.send(home_page)
})

app.get('/script.js',(req,res) => {
    res.send(script)
})

io.on('connection', (socket) => {
    socket.on('register', names => {
        live_users[socket.id] = names;
        socket.broadcast.emit('recive-msg',live_users[socket.id],'joined this chat');
    })

    socket.on('send-msg', msg => {
        socket.broadcast.emit('recive-msg', live_users[socket.id],msg);
    })
})

http.listen(7450)