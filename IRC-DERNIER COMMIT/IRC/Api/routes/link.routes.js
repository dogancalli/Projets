module.exports = app => {
    const link = require("../controllers/link.controller.js");


    // Retrieve a list of users in a channel
    app.get("/linkUser/:CID", link.findUsersByChannel);

    // Retrieve a list of channels from a user
    app.get("/linkChannel/:UID", link.findChannelsByUser);
};
