module.exports = app => {
    const message = require("../controllers/message.controller.js");

    // Create a new document
    app.post("/message", message.createMessage);

    // Retrieve all message
    app.get("/message", message.findAllMessages);

    // Retrieve a single document with MID
    app.get("/message/:MID", message.findOneMessage);

    // Update a document with MID
    app.put("/message/:MID", message.updateMessage);

    // Delete a document with MID
    app.delete("/message/:MID", message.deleteMessage);

  };
