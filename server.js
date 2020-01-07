const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const mongoose = require('mongoose');
const Message = mongoose.model('Message', { 
    name: String,
    message: String 
});

const dbUrl = 'mongodb+srv://rvbrindle:chattest@cha-wiagk.mongodb.net/test?retryWrites=true&w=majority'

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(dbUrl , err => { 
    console.log('mongodb connected', err);
})

io.on('connection', () => {
    console.log('user connected');
})

app.get('/messages', (req, res) => {
    Message.find({},(err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    let message = new Message(req.body);
    message.save( err => {
        if(err) {
            sendStatus(500);
            io.emit('message', req.body)
            res.sendStatus(200);
        }
    })
})

const server = app.listen(5050, () => {
    console.log(`listening on port ${ server.address().port }`);
});