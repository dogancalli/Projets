module.exports = app => {
    const channel = require("../controllers/channel.controller.js");
  
    // Create a new document
    app.post("/channel", channel.create);
  
    // Retrieve all channel
    app.get("/channel", channel.findAll);
  
    // Retrieve a single document with ID
    app.get("/channel/:ID", channel.findOne);
  
    // Update a document with ID
    app.put("/channel/:ID", channel.update);
  
    // Delete a document with ID
    app.delete("/channel/:ID", channel.delete);
  
  };