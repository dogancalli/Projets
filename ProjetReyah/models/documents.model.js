let connection = require('../config/database');


const Documents = function(documents) {
    this.docID = documents.docID;
    this.docName = documents.docName;
    this.docContent = documents.docContent;
    this.docLink = documents.docLink;
  };
  
  Documents.create = (newDocuments, result) => {
    connection.query("INSERT INTO documents SET ?", newDocuments, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created documents: ", { docID: res.insertId, ...newDocuments });
      result(null, { docID: res.insertId, ...newDocuments });
    });
  };
  
  Documents.findById = (docID, result) => {
    connection.query(`SELECT * FROM documents WHERE docID = ${docID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found documents: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      
      result({ kind: "not_found" }, null);
    });
  };
  
  Documents.getAll = result => {
    connection.query("SELECT * FROM documents ORDER BY docID DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("documents: ", res);
      result(null, res);
    });
  };
  
  Documents.updateById = (docID, documents, result) => {
    connection.query(
      "UPDATE documents SET docName = ?, docContent = ?, docLink = ? WHERE docID = ?",
      [documents.docName, documents.docContent, documents.docLink, documents.docID],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
       
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated documents: ", { docID: docID, ...documents });
        result(null, { docID: docID, ...documents });
      }
    );
  };
  
  Documents.remove = (docID, result) => {
    connection.query("DELETE FROM documents WHERE docID = ?", docID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted documents with docID: ", docID);
      result(null, res);
    });
  };
  
  
  module.exports = Documents;