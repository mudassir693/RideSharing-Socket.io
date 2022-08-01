const express = require('express');
const cors = require('cors')


const {Server}= require('socket.io')
// let app = express(), server = require('http').createServer(app), io = require('socket.io')(server);
// app.use(cors())
io = new Server({
    cors: {
        origin: 'http://localhost:3000',
        // methods: ["GET", "POST"]
    }
})
io.on('connection', socket => {
    console.log('issue resolved: ')
    socket.emit("first",{
        from:"server",
    })
    socket.on("second",(resp)=>{
        console.log('digit: ',resp)
    })
    socket.on('disconnect', () => { /* … */ });
});


// let server = app.listen(5000,()=>{
//     console.log(`WooHoo...`)
// })
// server.listen(5000,()=>{
//     console.log('WooHoo..')
// })
io.listen(5000)