let connection = require('../config/database');


const Message = function(msg) {
    this.MID = msg.MID;
    this.UserID = msg.UserID;
    this.Text = msg.Text;
    this.ChanelID = msg.ChanelID;
  };

  Message.createMessage = (newMessage, result) => {
    connection.query("INSERT INTO msg SET ?", newMessage, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created msg: ", { MID: res.insertId, ...newMessage });
      result(null, { MID: res.insertId, ...newMessage });
    });
  };

  Message.findMessageById = (MID, result) => {
    connection.query(`SELECT * FROM msg WHERE MID = ${MID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found msg: ", res[0]);
        result(null, res[0]);
        return;
      }


      result({ kind: "not_found" }, null);
    });
  };

  Message.getAllMessages = result => {
    connection.query("SELECT * FROM msg ORDER BY MID DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("msg: ", res);
      result(null, res);
    });
  };

  Message.updateMessageById = (MID, msg, result) => {
    connection.query(
      "UPDATE msg SET UserID = ?, Text = ?, ChanelID = ? WHERE MID = ?",
      [msg.UserID, msg.Text, msg.ChanelID, msg.MID],
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

        console.log("updated msg: ", { MID: MID, ...msg });
        result(null, { MID: MID, ...msg });
      }
    );
  };

  Message.removeMessage = (MID, result) => {
    connection.query("DELETE FROM msg WHERE MID = ?", MID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {

        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted msg with MID: ", MID);
      result(null, res);
    });
  };


  module.exports = Message;
