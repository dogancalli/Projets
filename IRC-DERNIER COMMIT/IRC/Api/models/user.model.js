let connection = require('../config/database');


const User = function(user) {
    this.UID = user.UID;
    this.UName = user.UName;
  };
  
  User.create = (newUser, result) => {
    connection.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { UID: res.insertId, ...newUser });
      result(null, { UID: res.insertId, ...newUser });
    });
  };
  
  User.findById = (UID, result) => {
    connection.query(`SELECT * FROM user WHERE UID = ${UID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      
      result({ kind: "not_found" }, null);
    });
  };
  
  User.getAll = result => {
    connection.query("SELECT * FROM user ORDER BY UID DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("user: ", res);
      result(null, res);
    });
  };
  
  User.updateById = (UID, user, result) => {
    connection.query(
      "UPDATE user SET UName = ?,  = ?,  = ? WHERE UID = ?",
      [user.UName, , , user.UID],
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
  
        console.log("updated user: ", { UID: UID, ...user });
        result(null, { UID: UID, ...user });
      }
    );
  };
  
  User.remove = (UID, result) => {
    connection.query("DELETE FROM user WHERE UID = ?", UID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with UID: ", UID);
      result(null, res);
    });
  };
  
  
  module.exports = User;