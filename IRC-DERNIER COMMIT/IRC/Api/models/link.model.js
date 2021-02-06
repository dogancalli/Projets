let connection = require('../config/database');


const Link = function(link) {
    this.link_id = link.link_id;
    this.user_ID = link.user_ID;
    this.channel_ID = link.channel_ID;
  };


Link.getAllChannelsFromUser = (UID, result) => {
  connection.query(`SELECT channel.Name FROM link JOIN channel ON (link.channel_ID = channel.ID) JOIN user ON (link.user_ID = user.UID) WHERE (user.UID = ${UID})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found list of channels: ", res);
      result(null, res);
      return;
    }


    result({ kind: "not_found" }, null);
  });
}



Link.getAllUsersFromChannel = (CID, result) => {
  connection.query(`SELECT user.UName FROM link JOIN channel ON (link.channel_ID = channel.ID) JOIN user ON (link.user_ID = user.UID) WHERE (channel_ID = ${CID})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found list of users: ", res);
      result(null, res);
      return;
    }


    result({ kind: "not_found" }, null);
  });
}



  module.exports = Link;
