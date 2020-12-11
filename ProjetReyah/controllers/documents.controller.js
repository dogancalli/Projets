const Documents = require("../models/documents.model.js");

// Create and Save a new documents
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Le contenu ne peut être vide !!!"
        });
      }
    
      // Create a document
      const documents = new Documents({
        docContent: req.body.docContent,
        docName: req.body.docName,
        docLink: req.body.docLink
      });
    
      // Save document in the database
      Documents.create(documents, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "erreur, le document n'a pas été créer !"
          });
        else res.send(data);
      });
};

// Retrieve all documents from the database.
exports.findAll = (req, res) => {
    Documents.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "erreur, les documents n'ont pas été retrouver !"
          });
        else res.send(data);
      });
};

// Find a single document with it's id
exports.findOne = (req, res) => {
    Documents.findById(req.params.docID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le document n'a pas été retrouver via l'id ${req.params.docID}.`
            });
          } else {
            res.status(500).send({
              message: "le document n'a pas été retrouver via l'id " + req.params.docID
            });
          }
        } else res.send(data);
      });
};

// Update a document identified by the document's id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "le contenu ne peut être vide !!!"
        });
      }
    
      Documents.updateById(
        req.params.docID,
        new Documents(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `le document n'a pas été retrouver via l'id ${req.params.docID}.`
              });
            } else {
              res.status(500).send({
                message: "le document n'a pas été mis à jour via l'id" + req.params.docID
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a document with the specified document's id in the request
exports.delete = (req, res) => {
    Documents.remove(req.params.docID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `le document n'a pas été retrouver via l'id ${req.params.docID}.`
            });
          } else {
            res.status(500).send({
              message: "le document n'a pas été supprimer via l'id " + req.params.docID
            });
          }
        } else res.send({ message: `document supprimé avec succès !!!` });
      });
};