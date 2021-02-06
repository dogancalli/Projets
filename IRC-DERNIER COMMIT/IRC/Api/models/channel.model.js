let connection = require('../config/database');


const Channel = function(channel) {
    this.ID = channel.ID;
    this.Name = channel.Name;
  };

  Channel.createChannel = (newChannel, result) => {
    connection.query("INSERT INTO channel SET ?", newChannel, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created channel: ", { ID: res.insertId, ...newChannel });
      result(null, { ID: res.insertId, ...newChannel });
    });
  };

  Channel.findChannelByName = (Name, result) => {
    connection.query(`SELECT * FROM channel WHERE Name = test1`, (err, res) => {
   //   if (err) {
   //     console.log("error: ", err);
   //     result(err, null);
   //     return;
   //   }

    //  if (res.length) {
    //    console.log("found channel: ", res);
    //    result(null, res);
    //     return;
    //  }

console.log("result",result(res));
    //  result({ kind: "not_found" }, null);
    });
  };

  Channel.getAllChannels = result => {
    connection.query("SELECT * FROM channel ORDER BY ID DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("channel: ", res);
      result(null, res);
    });
  };

  Channel.updateChannelById = (ID, channel, result) => {
    connection.query(
      "UPDATE channel SET Name = ? WHERE ID = ?",
      [channel.Name, channel.ID],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {

          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated channel: ", { ID: ID, ...channel });
        result(null, { ID: ID, ...channel });
      }
    );
  };

  Channel.removeChannel = (Name, result) => {
    connection.query("DELETE FROM channel WHERE Name = ?", Name, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {

        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted channel with Name: ", Name);
      result(null, res);
    });
  };


  module.exports = Channel;
