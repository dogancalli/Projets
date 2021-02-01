const User = require("../models/user.model.js");

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Le contenu ne peut être vide !!!"
        });
      }
    
      // Create a user
      const user = new User({
        UName: req.body.UName,
      });
    
      // Save user in the database
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "erreur, le user n'a pas été créer !"
          });
        else res.send(data);
      });
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "erreur, les user n'ont pas été retrouver !"
          });
        else res.send(data);
      });
};

// Find a single user with it's id
exports.findOne = (req, res) => {
    User.findById(req.params.UID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le user n'a pas été retrouver via l'id ${req.params.UID}.`
            });
          } else {
            res.status(500).send({
              message: "le user n'a pas été retrouver via l'id " + req.params.UID
            });
          }
        } else res.send(data);
      });
};

// Update a user identified by the user's id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "le contenu ne peut être vide !!!"
        });
      }
    
      User.updateById(
        req.params.UID,
        new User(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `le user n'a pas été retrouver via l'id ${req.params.UID}.`
              });
            } else {
              res.status(500).send({
                message: "le user n'a pas été mis à jour via l'id" + req.params.UID
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a user with the specified user's id in the request
exports.delete = (req, res) => {
    User.remove(req.params.UID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le user n'a pas été retrouver via l'id ${req.params.UID}.`
            });
          } else {
            res.status(500).send({
              message: "le user n'a pas été supprimer via l'id " + req.params.UID
            });
          }
        } else res.send({ message: `user supprimé avec succès !!!` });
      });
};