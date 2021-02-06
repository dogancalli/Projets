const Channel = require("../models/channel.model.js");

// Create and Save a new channel
exports.createChannel = (newChannel, req, res) => {
 // console.log(req.body);
    // Validate request
   // if (!req.body) {
    //    res.status(400).send({
      //    message: "Le contenu ne peut être vide !!!"
       // });
      //}

      // Create a channel
      const channel = new Channel({
        Name: newChannel
      });

      // Save channel in the database
      Channel.createChannel(channel, (err, data) => {
   //     if (err)
     //     res.status(500).send({
       //     message:
         //     err.message || "erreur, le channel n'a pas été créer !"
        //  });
     //   else res.send(data);
      });
};

// Retrieve all channel from the database.
exports.findAllChannels = (req, res) => {
    Channel.getAllChannels((err, data) => {
  //      if (err)
    //      res.status(500).send({
      //      message:
      //        err.message || "erreur, les channel n'ont pas été retrouver !"
      //    });
      //  else res.send(data);
      });
};

// Find a single channel with it's id
exports.findOneChannel = (Name,req, res) => {
 
    Channel.findChannelByName(Name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le channel n'a pas été retrouver via le nom ${req.params.ID}.`
            });
          } else {
            res.status(500).send({
              message: "le channel n'a pas été retrouver via le nom " + req.params.ID
            });
          }
        } else console.log(data);
      });
};

// Update a channel identified by the channel's id in the request
exports.updateChannel = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "le contenu ne peut être vide !!!"
        });
      }

      Channel.updateChannelById(
        req.params.ID,
        new Channel(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `le channel n'a pas été retrouver via l'id ${req.params.ID}.`
              });
            } else {
              res.status(500).send({
                message: "le channel n'a pas été mis à jour via l'id" + req.params.ID
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a channel with the specified channel's id in the request
exports.deleteChannel = (Name,req, res) => {
    Channel.removeChannel(Name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le channel n'a pas été retrouver via le nom ${Name}.`
            });
          } else {
            res.status(500).send({
              message: "le channel n'a pas été supprimer via le nom " + Name
            });
          }
        } else console.log({ message: `channel supprimé avec succès !!!` });
      });
};
