const Message = require("../models/message.model.js");

// Create and Save a new msg
exports.createMessage = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Le contenu ne peut être vide !!!"
        });
      }

      // Create a message
      const msg = new Message({
        Text: req.body.Text,
        UserID: req.body.UserID,
        ChanelID: req.body.ChanelID
      });

      // Save message in the database
      Message.createMessage(msg, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "erreur, le message n'a pas été créer !"
          });
        else res.send(data);
      });
};

// Retrieve all msg from the database.
exports.findAllMessages = (req, res) => {
    Message.getAllMessages((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "erreur, les msg n'ont pas été retrouver !"
          });
        else res.send(data);
      });
};

// Find a single message with it's id
exports.findOneMessage = (req, res) => {
    Message.findMessageById(req.params.MID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le message n'a pas été retrouver via l'id ${req.params.MID}.`
            });
          } else {
            res.status(500).send({
              message: "le message n'a pas été retrouver via l'id " + req.params.MID
            });
          }
        } else res.send(data);
      });
};

// Update a message identified by the message's id in the request
exports.updateMessage = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "le contenu ne peut être vide !!!"
        });
      }

      Message.updateMessageById(
        req.params.MID,
        new Message(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `le message n'a pas été retrouver via l'id ${req.params.MID}.`
              });
            } else {
              res.status(500).send({
                message: "le message n'a pas été mis à jour via l'id" + req.params.MID
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a message with the specified message's id in the request
exports.deleteMessage = (req, res) => {
    Message.removeMessage(req.params.MID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le message n'a pas été retrouver via l'id ${req.params.MID}.`
            });
          } else {
            res.status(500).send({
              message: "le message n'a pas été supprimer via l'id " + req.params.MID
            });
          }
        } else res.send({ message: `message supprimé avec succès !!!` });
      });
};
