<?php 
  class People {
    // DB stuff
    private $conn;
    private $table = 'people';

    // People Properties
    public $IdPe;
    public $FirstNamePe;
    public $LastNamePe;
    public $EmailPe;
    public $PhonePe;
    public $RolePe;
    public $statut;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Posts
    public function read() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table . ' ORDER BY PhonePe DESC';
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Get Single People
    public function read_single() {
          // Create query
          $query = 'SELECT * FROM ' . $this->table . ' WHERE IdPe = ?
                                    LIMIT 0,1';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Bind ID
          $stmt->bindParam(1, $this->IdPe);

          // Execute query
          $stmt->execute();

          $row = $stmt->fetch(PDO::FETCH_ASSOC);

          // Set properties
          $this->FirstNamePe = $row['FirstNamePe'];
          $this->LastNamePe = $row['LastNamePe'];
          $this->EmailPe = $row['EmailPe'];
          $this->PhonePe = $row['PhonePe'];
          $this->RolePe = $row['RolePe'];
          $this->statut = $row['statut'];

    }

    // Create People
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' SET FirstNamePe = :FirstNamePe, LastNamePe = :LastNamePe, EmailPe = :EmailPe, RolePe = :RolePe, PhonePE = :PhonePe, statut = :statut';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->FirstNamePe = htmlspecialchars(strip_tags($this->FirstNamePe));
          $this->LastNamePe = htmlspecialchars(strip_tags($this->LastNamePe));
          $this->EmailPe = htmlspecialchars(strip_tags($this->EmailPe));
          $this->PhonePe = htmlspecialchars(strip_tags($this->PhonePe));
          $this->RolePe = htmlspecialchars(strip_tags($this->RolePe));
          $this->statut = htmlspecialchars(strip_tags($this->statut));

          // Bind data
          $stmt->bindParam(':FirstNamePe', $this->FirstNamePe);
          $stmt->bindParam(':LastNamePe', $this->LastNamePe);
          $stmt->bindParam(':EmailPe', $this->EmailPe);
          $stmt->bindParam(':PhonePe', $this->PhonePe);
          $stmt->bindParam(':RolePe', $this->RolePe);
          $stmt->bindParam(':statut', $this->statut);

          // Execute query
          if($stmt->execute()) {
            return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    // Update People
    public function update() {
          // Create query
          $query = 'UPDATE ' . $this->table . '
                                SET FirstNamePe = :FirstNamePe, LastNamePe = :LastNamePe, EmailPe = :EmailPe, RolePe = :RolePe, PhonePe = :PhonePe, statut = :statut
                                WHERE IdPe = :IdPe';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->FirstNamePe = htmlspecialchars(strip_tags($this->FirstNamePe));
          $this->LastNamePe = htmlspecialchars(strip_tags($this->LastNamePe));
          $this->EmailPe = htmlspecialchars(strip_tags($this->EmailPe));
          $this->PhonePe = htmlspecialchars(strip_tags($this->PhonePe));
          $this->RolePe = htmlspecialchars(strip_tags($this->RolePe));
          $this->IdPe = htmlspecialchars(strip_tags($this->IdPe));
          $this->statut = htmlspecialchars(strip_tags($this->statut));

          // Bind data
          $stmt->bindParam(':FirstNamePe', $this->FirstNamePe);
          $stmt->bindParam(':LastNamePe', $this->LastNamePe);
          $stmt->bindParam(':EmailPe', $this->EmailPe);
          $stmt->bindParam(':PhonePe', $this->PhonePe);
          $stmt->bindParam(':RolePe', $this->RolePe);
          $stmt->bindParam(':IdPe', $this->IdPe);
          $stmt->bindParam(':statut', $this->statut);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }

    // Delete People
    public function delete() {
          // Create query
          $query = 'DELETE FROM ' . $this->table . ' WHERE IdPe = :IdPe';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->IdPe = htmlspecialchars(strip_tags($this->IdPe));

          // Bind data
          $stmt->bindParam(':IdPe', $this->IdPe);

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