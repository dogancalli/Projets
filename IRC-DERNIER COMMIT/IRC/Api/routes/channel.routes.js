module.exports = app => {
    const channel = require("../controllers/channel.controller.js");

    // Create a new document
    app.post("/channel",channel.createChannel);

    // Retrieve all channel
    app.get("/channel", channel.findAllChannels);

    // Retrieve a single document with ID
    app.get("/channel/:ID", channel.findOneChannel);

    // Update a document with ID
    app.put("/channel/:ID", channel.updateChannel);

    // Delete a document with ID
    app.delete("/channel/:ID", channel.deleteChannel);

  };
