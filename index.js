// implement socket.io server
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

app.use(cors());
app.get('/', (req, res) => {
    // req.header("Access-Control-Allow-Origin", "*");
    res.send('Connected')
})
io.on('connection', (socket) => {
    console.log('User Connected');
    socket.on('buyerPaid', (msg) => {
        console.log(msg);
        io.emit('receipientRelease', msg);
        console.log("Emmitted the release funds functionality");
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});
http.listen(8000, () => {
    console.log('listening on *:8000');
});
