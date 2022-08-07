const express = require('express');
const cors = require('cors')

const app = express();

let port = 5000||process.env.PORT

const server = app.listen(port);

const {Server}= require('socket.io')
// let app = express(), server = require('http').createServer(app), io = require('socket.io')(server);
// app.use(cors())
io = new Server(server, {
    cors: {
        origin: '*',
        // methods: ["GET", "POST"]
    }
})

const driversLocation = [{id:"1",lng:67.1344,lat:24.9204}]
io.on('connection', socket => {
    console.log('issue resolved: ',socket.id)
    socket.emit("first",{
        from:"server",
    })

    socket.on('Booker',(resp)=>{
        console.log('Booker: ',resp)

        let driver = driversLocation.find(eachDriver => resp.id == eachDriver.id)

        socket.emit('driverLocation',{
            driver
        })
    
    })
    socket.on("first2",(resp)=>{
        console.log('resp first2: ',resp)
        socket.emit('accepted',{
            data:"accepted"
        })
    })
    socket.on("second",(resp)=>{
        console.log('digit: ',resp)
    })
    socket.on('disconnect', () => { 
        console.log(socket.id,' disconnected')
     });
});

// 
// let server = app.listen(5000,()=>{
//     console.log(`WooHoo...`)
// })
// server.listen(5000,()=>{
//     console.log('WooHoo..')
// })
// let port = 5000||process.env.PORT
// io.listen(port)