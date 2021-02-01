const users = [];

const addUser = ({id, nickname, channel}) => {
    nickname = nickname.trim().toLowerCase();
    channel = channel.trim().toLowerCase();

    const existingUser = users.find((user) => user.channel === channel && user.nickname === nickname);

    if(existingUser){
        return {error: 'This nickname is already taken. You must choose another one.'}
    }
    const oldNicknames = [];
    const user = {id, nickname, channel, oldNicknames}

    users.push(user);

    return {user};
}


const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUserByNickname = (nickname) => users.find((user) => user.nickname === nickname);

const getUsersInChannel = (channel) => {
    users.filter((user) => user.channel === channel);

}

const setNickname = (id, newNick) => {
    actualUser = getUser(id)
    console.log("nick : " + actualUser.nickname)
    actualUser.nickname = newNick
    console.log("new nick : "+ actualUser.nickname)
}

const setOldNicknames = (id, oldNick) => {
    actualUser = getUser(id);

    actualUser.oldNicknames.push(oldNick);
}

module.exports = { users, addUser, removeUser, getUser, getUsersInChannel, setNickname, setOldNicknames, getUserByNickname};
