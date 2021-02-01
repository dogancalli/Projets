const Channel = require("../models/channel.model.js");

// Create and Save a new channel
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Le contenu ne peut être vide !!!"
        });
      }
    
      // Create a channel
      const channel = new Channel({
        Name: req.body.Name,
      });
    
      // Save channel in the database
      Channel.create(channel, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "erreur, le channel n'a pas été créer !"
          });
        else res.send(data);
      });
};

// Retrieve all channel from the database.
exports.findAll = (req, res) => {
    Channel.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "erreur, les channel n'ont pas été retrouver !"
          });
        else res.send(data);
      });
};

// Find a single channel with it's id
exports.findOne = (req, res) => {
    Channel.findById(req.params.ID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le channel n'a pas été retrouver via l'id ${req.params.ID}.`
            });
          } else {
            res.status(500).send({
              message: "le channel n'a pas été retrouver via l'id " + req.params.ID
            });
          }
        } else res.send(data);
      });
};

// Update a channel identified by the channel's id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "le contenu ne peut être vide !!!"
        });
      }
    
      Channel.updateById(
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
exports.delete = (req, res) => {
    Channel.remove(req.params.ID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le channel n'a pas été retrouver via l'id ${req.params.ID}.`
            });
          } else {
            res.status(500).send({
              message: "le channel n'a pas été supprimer via l'id " + req.params.ID
            });
          }
        } else res.send({ message: `channel supprimé avec succès !!!` });
      });
};