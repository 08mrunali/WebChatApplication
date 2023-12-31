//Node server which will handle socket io connections
// const io = require('socket.io')(8000);
const io = require('socket.io')(8000, 
    {
    cors: {
    origin: '*', 
    }
});
const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        //If any new user joins, let other users connected to the server know
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //If someone sends a message, broadcast it to other people
    socket.on('send', message=>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });

    //If someone leaves the chat let others know 
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})