const io = require('socket.io')(3001);

io.on('connection', socket => {
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message)
    })
})