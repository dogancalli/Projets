<?php 
  class Utilisateurs {
    // DB stuff
    private $conn;
    private $table = 'utilisateurs';

    // Utilisateurs Properties
    public $IdUt;
    public $pseudoUt;
    public $EmailUt;
    public $PasswordUt;
    public $statutUt;
    public $Date_inscription_Ut;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Posts
    public function read() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table . ' ORDER BY Date_inscription_Ut DESC';
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Get Single Utilisateurs
    public function read_single() {
          // Create query
          $query = 'SELECT *     FROM ' . $this->table . ' WHERE
                                      IdUt = ?
                                    LIMIT 0,1';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Bind ID
          $stmt->bindParam(1, $this->IdUt);

          // Execute query
          $stmt->execute();

          $row = $stmt->fetch(PDO::FETCH_ASSOC);

          // Set properties
          $this->PasswordUt = $row['PasswordUt'];
          $this->statutUt = $row['statutUt'];
          $this->Date_inscription_Ut = $row['Date_inscription_Ut'];
          $this->pseudoUt = $row['pseudoUt'];
          $this->EmailUt = $row['EmailUt'];
    }

    // Create Utilisateurs
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' SET PasswordUt = :PasswordUt, statutUt = :statutUt, Date_inscription_Ut = :Date_inscription_Ut, pseudoUt = :pseudoUt, EmailUt = :EmailUt';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->PasswordUt = htmlspecialchars(strip_tags($this->PasswordUt));
          $this->statutUt = htmlspecialchars(strip_tags($this->statutUt));
          $this->Date_inscription_Ut = htmlspecialchars(strip_tags($this->Date_inscription_Ut));
          $this->pseudoUt = htmlspecialchars(strip_tags($this->pseudoUt));
          $this->EmailUt = htmlspecialchars(strip_tags($this->EmailUt));

          // Bind data
          $stmt->bindParam(':PasswordUt', $this->PasswordUt);
          $stmt->bindParam(':statutUt', $this->statutUt);
          $stmt->bindParam(':Date_inscription_Ut', $this->Date_inscription_Ut);
          $stmt->bindParam(':pseudoUt', $this->pseudoUt);
          $stmt->bindParam(':EmailUt', $this->EmailUt);

          // Execute query
          if($stmt->execute()) {
            return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    // Update Utilisateurs
    public function update() {
          // Create query
          $query = 'UPDATE ' . $this->table . '
                                SET PasswordUt = :PasswordUt, statutUt = :statutUt, Date_inscription_Ut = :Date_inscription_Ut, pseudoUt = :pseudoUt, EmailUt = :EmailUt
                                WHERE IdUt = :IdUt';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->PasswordUt = htmlspecialchars(strip_tags($this->PasswordUt));
          $this->statutUt = htmlspecialchars(strip_tags($this->statutUt));
          $this->Date_inscription_Ut = htmlspecialchars(strip_tags($this->Date_inscription_Ut));
          $this->pseudoUt = htmlspecialchars(strip_tags($this->pseudoUt));
          $this->IdUt = htmlspecialchars(strip_tags($this->IdUt));
          $this->EmailUt = htmlspecialchars(strip_tags($this->EmailUt));

          // Bind data
          $stmt->bindParam(':PasswordUt', $this->PasswordUt);
          $stmt->bindParam(':statutUt', $this->statutUt);
          $stmt->bindParam(':Date_inscription_Ut', $this->Date_inscription_Ut);
          $stmt->bindParam(':pseudoUt', $this->pseudoUt);
          $stmt->bindParam(':IdUt', $this->IdUt);
          $stmt->bindParam(':EmailUt', $this->EmailUt);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }

    // Delete Utilisateurs
    public function delete() {
          // Create query
          $query = 'DELETE FROM ' . $this->table . ' WHERE IdUt = :IdUt';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->IdUt = htmlspecialchars(strip_tags($this->IdUt));

          // Bind data
          $stmt->bindParam(':IdUt', $this->IdUt);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }
    
  }
  ?>