module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    // Create a new document
    app.post("/user", user.create);
  
    // Retrieve all user
    app.get("/user", user.findAll);
  
    // Retrieve a single document with UID
    app.get("/user/:UID", user.findOne);
  
    // Update a document with UID
    app.put("/user/:UID", user.update);
  
    // Delete a document with UID
    app.delete("/user/:UID", user.delete);
  
  };