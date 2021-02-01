let connection = require('../config/database');


const Channel = function(channel) {
    this.ID = channel.ID;
    this.Name = channel.Name;
  };
  
  Channel.create = (newChannel, result) => {
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
  
  Channel.findById = (ID, result) => {
    connection.query(`SELECT * FROM channel WHERE ID = ${ID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found channel: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      
      result({ kind: "not_found" }, null);
    });
  };
  
  Channel.getAll = result => {
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
  
  Channel.updateById = (ID,channel, result) => {
    connection.query(
      "UPDATE channel SET Name = ?, WHERE ID = ?",
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
  
  Channel.remove = (ID, result) => {
    connection.query("DELETE FROM channel WHERE ID = ?", ID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted channel with ID: ", ID);
      result(null, res);
    });
  };
  
  
  module.exports = Channel;