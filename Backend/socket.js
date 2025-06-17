const socketIo = require('socket.io');
const userModel = require('./models/user.model'); 
const captainModel= require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Handle user connection
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);
            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId,{
                        socketId: socket.id
                    })

                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId,{
                        socketId: socket.id
                    })
                }
            } catch (error) {
                console.error('Error joining room:', error);
            }
        })


        socket.on('update-location-captain',async (data) =>{

            const {userId , location} = data;

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error',{message:'invalid location data'})
            }

            await captainModel.findByIdAndUpdate(userId,{
                location:{
                ltd:location.ltd,
                lng:location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }else {
        console.error('Socket.io not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
};
