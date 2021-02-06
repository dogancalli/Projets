module.exports = app => {
    const user = require("../controllers/user.controller.js");

    // Create a new document
    app.post("/user", user.createUser);

    // Retrieve all user
    app.get("/user", user.findAllUsers);

    // Retrieve a single document with UID
    app.get("/user/:UID", user.findOneUser);

    // Update a document with UID
    app.put("/user/:UID", user.updateUser);

    // Delete a document with UID
    app.delete("/user/:UID", user.deleteUser);

  };
