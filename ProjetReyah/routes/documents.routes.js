module.exports = app => {
    const documents = require("../controllers/documents.controller.js");
  
    // Create a new document
    app.post("/documents", documents.create);
  
    // Retrieve all documents
    app.get("/documents", documents.findAll);
  
    // Retrieve a single document with docID
    app.get("/documents/:docID", documents.findOne);
  
    // Update a document with docID
    app.put("/documents/:docID", documents.update);
  
    // Delete a document with docID
    app.delete("/documents/:docID", documents.delete);
  
  };