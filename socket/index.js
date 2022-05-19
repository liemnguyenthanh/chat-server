import socketio from 'socket.io'
import Message from '../models/messagesModel.js';
import User from '../models/usersModel.js';
let users = []
function SocketIO(server) {
    const io = socketio(server);
    io.on('connect', (socket) => {
        socket.on('JOIN_CHAT', ({ user_id }, callback) => {
            // io.to(user.room).emit('ROOM_DATA', { room: user.room, users: getUsersInRoom(user.room) });
            callback();
        });

        socket.on('JOIN_ROOM', async ({ user_id, room_id }, callback) => {
            socket.join(room_id);   
            if (!users.some(user => user._id == user_id)) {
                let new_user = await User.findOne({ _id: user_id })
                if (new_user) {
                    users.push(new_user)
                }
            }
            io.to(room_id).emit('USERS_ROOM', { users });
        });


        socket.on('SEND_MESSAGE', async (message, callback) => {
            const { sender, room_id } = message
            if (sender) {
                let new_message = new Message(message);
                await new_message.save()
                io.to(room_id).emit('NEW_MESSAGE', new_message);

            }
            callback();
        });

        // socket.on('disconnect', () => {
        //     const new_users = users.filter(a => a.socket_id != socket.id)

        //     if (new_users) {
        //         io.emit('USERS_ROOM', {new_users});
        //     }
        // })
    });
}
export default SocketIO; 