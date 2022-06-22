import socketio from 'socket.io'
import Message from '../models/messagesModel.js';
import User from '../models/usersModel.js';
let users = []
function SocketIO(server) {
    const io = socketio(server);
    io.on('connect', (socket) => {
        socket.on('JOIN_CHAT', async ({ user_id }) => {
            // io.to(user.room).emit('ROOM_DATA', { room: user.room, users: getUsersInRoom(user.room) });
            
            if (!users.some(user => user.user_id == user_id)) {
                let new_user = await User.findOne({ _id: user_id })
                if (new_user) {
                    let data =
                    {   user_id : new_user._id  ,
                        username : new_user.username , 
                        full_name : new_user.full_name , 
                        socket_id: socket.id }
                    users.push(data)
                }
                io.emit('USERS_ROOM', { users });
            }
        });
        
        socket.on('JOIN_ROOM', async ({ user_id, room_id }, callback) => {
            socket.join(room_id);   
            if (!users.some(user => user._id == user_id)) {
                let new_user = await User.findOne({ _id: user_id })
                if (new_user) {
                    users.push({ username : new_user.username , socket_id: socket.id })
                }
            }
        });

        socket.on('IS_TYPING_CLIENT', async ({ user_id, room_id , is_typing }) => {
            if (!user_id || !room_id ) return
            let room = users.find(a => a.user_id == room_id)
            if(room) io.to(room.socket_id).emit('TYPING_SERVER',{ userId : user_id, roomId : room_id , is_typing  })
        });

        socket.on('UPDATE_STATUS_MESSAGE',  ({ data}) => {
            const { _id,sender , room_id ,status } = data
            let room = users.find(a => a.user_id == sender)
            let message_update = {
                _id, sender , room_id ,status
            }
            if(room) io.to(room.socket_id).emit('UPDATE_STATUS_MESSAGE_SEVER',{ message_update })
        });

        socket.on('SEND_MESSAGE', async (message) => {
            const { sender, room_id , isGroup } = message
            if (!sender || !room_id ) return
            if(!isGroup){
                let new_message = new Message(message);
                //await new_message.save()
                let room = users.find(a => a.user_id == room_id)
                let users_get_message = [socket.id]
                if(room) users_get_message.push(room.socket_id)
                users_get_message.forEach(item  => io.to(item).emit('NEW_MESSAGE', new_message));
            }
            
        });

        socket.on('disconnect', () => {
            users = users.filter(a => a.socket_id != socket.id)
            io.emit('USERS_ROOM', {users});
        })
    });
}
export default SocketIO; 