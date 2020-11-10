<?php 
  class Application {
    // DB stuff
    private $conn;
    private $table = 'application';

    // Post Properties
    public $IdAp;
    public $MailSentAp;
    public $PeopleAp;
    public $AdvertisementsAp;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Applies
    public function read() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table . ' ORDER BY PeopleAp DESC';
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Get Single Post
    public function read_single() {
          // Create query
          $query = 'SELECT * FROM ' . $this->table . '
                                    WHERE
                                      IdAp = ?
                                    LIMIT 0,1';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Bind ID
          $stmt->bindParam(1, $this->IdAp);

          // Execute query
          $stmt->execute();

          $row = $stmt->fetch(PDO::FETCH_ASSOC);

          // Set properties
          $this->IdAp = $row['IdAp'];
          $this->MailSentAp = $row['MailSentAp'];
          $this->PeopleAp = $row['PeopleAp'];
          $this->AdvertisementsAp = $row['AdvertisementsAp'];
    }

    // Create Application
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' SET MailSentAp = :MailSentAp, PeopleAp = :Advertisements, AdvertisementsAp = :AdvertisementsAp';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->MailSentAp = htmlspecialchars(strip_tags($this->MailSentAp));
          $this->PeopleAp = htmlspecialchars(strip_tags($this->PeopleAp));
          $this->AdvertisementsAp = htmlspecialchars(strip_tags($this->AdvertisemenstAp));

          // Bind data
          $stmt->bindParam(':MailSentAp', $this->MailSentAp);
          $stmt->bindParam(':PeopleAp', $this->PeopleAp);
          $stmt->bindParam(':AdvertisementsAp', $this->AdvertisementsAp);

          // Execute query
          if($stmt->execute()) {
            return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    // Update Application
    public function update() {
          // Create query
          $query = 'UPDATE ' . $this->table . '
                                SET MailSentAp = :MailSentAp, PeopleAp = :PeopleAp, AdvertisementsAp = :AdvertisementsAp
                                WHERE IdAp = :IdAp';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->MailSentAp = htmlspecialchars(strip_tags($this->MailSentAp));
          $this->PeopleAp = htmlspecialchars(strip_tags($this->PeopleAp));
          $this->AdvertisementsAp = htmlspecialchars(strip_tags($this->AdvertisementsAp));
          $this->IdAp = htmlspecialchars(strip_tags($this->IdAp));

          // Bind data
          $stmt->bindParam(':MailSentAp', $this->MailSentAp);
          $stmt->bindParam(':PeopleAp', $this->PeopleAp);
          $stmt->bindParam(':AdvertisementsAp', $this->AdvertisemenstAp);
          $stmt->bindParam(':IdAp', $this->IdAp);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }

    // Delete Post
    public function delete() {
          // Create query
          $query = 'DELETE FROM ' . $this->table . 'WHERE IdAp = :IdAp';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->IdAp = htmlspecialchars(strip_tags($this->IdAp));

          // Bind data
          $stmt->bindParam(':IdAp', $this->IdAp);

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