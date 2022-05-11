const users = [];

const addUser = ({ socket_id, user_id }) => {

  const existingUser = users.find((user) => user.user_id == user_id);

  if(existingUser) return { error: 'Username is taken.' };

  const user = { socket_id, user_id , room : '1'};
  users.push(user);

  return { user };
}

const removeUser = (socket_id) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (socket_id) => users.find((user) => user.socket_id === socket_id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsersInRoom }