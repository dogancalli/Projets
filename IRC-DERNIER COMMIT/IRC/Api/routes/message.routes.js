module.exports = app => {
    const message = require("../controllers/message.controller.js");
  
    // Create a new document
    app.post("/message", message.create);
  
    // Retrieve all message
    app.get("/message", message.findAll);
  
    // Retrieve a single document with MID
    app.get("/message/:MID", message.findOne);
  
    // Update a document with MID
    app.put("/message/:MID", message.update);
  
    // Delete a document with MID
    app.delete("/message/:MID", message.delete);
  
  };