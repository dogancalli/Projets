const Link = require("../models/link.model.js");


// Find the list of channels that a user joined
exports.findChannelsByUser = (req, res) => {
    Link.getAllChannelsFromUser(req.params.UID, (err, data)=> {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `la liste des channels n'a pas été retrouvée via l'id ${req.params.UID}.`
                });
            } else {
                res.status(500).send({
                    message:  `la liste des channels n'a pas été retrouvée via l'id ${req.params.UID}.`
                });
            }
        } else res.send(data);
    });
}

// Find a list of users in a channel
exports.findUsersByChannel = (req, res) => {
    Link.getAllUsersFromChannel(req.params.CID, (err, data)=> {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `la liste des users n'a pas été retrouvée via l'id ${req.params.CID}.`
                });
            } else {
                res.status(500).send({
                    message:  `la liste des users n'a pas été retrouvée via l'id ${req.params.CID}.`
                });
            }
        } else res.send(data);
    });
}
