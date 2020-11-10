<?php 
  class Companies {
    // DB stuff
    private $conn;
    private $table = 'companies';

    // Companies Properties
    public $IdCo;
    public $NameCo;
    public $sector_of_activityCo;
    public $SiretCo;
    public $number_of_employeesCo;
    public $Localisation;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Posts
    public function read() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table . ' ORDER BY sector_of_activityCo DESC';
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Get Single Companies
    public function read_single() {
          // Create query
          $query = 'SELECT sector_of_activityCo, IdCo, NameCo, SiretCo, number_of_employeesCo, Localisation
                                    FROM ' . $this->table . '
                                    WHERE
                                      IdCo = ?
                                    LIMIT 0,1';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Bind ID
          $stmt->bindParam(1, $this->IdCo);

          // Execute query
          $stmt->execute();

          $row = $stmt->fetch(PDO::FETCH_ASSOC);

          // Set properties
          $this->SiretCo = $row['SiretCo'];
          $this->number_of_employeesCo = $row['number_of_employeesCo'];
          $this->NameCo = $row['NameCo'];
          $this->sector_of_activityCo = $row['sector_of_activityCo'];
          $this->Localisation = $row['Localisation'];          
    }

    // Create Companies
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' SET SiretCo = :SiretCo, Localisation = :Localisation, number_of_employeesCo = :number_of_employeesCo, NameCo = :NameCo';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->SiretCo = htmlspecialchars(strip_tags($this->SiretCo));
          $this->Localisation = htmlspecialchars(strip_tags($this->Localisation));
          $this->number_of_employeesCo = htmlspecialchars(strip_tags($this->number_of_employeesCo));
          $this->NameCo = htmlspecialchars(strip_tags($this->NameCo));

          // Bind data
          $stmt->bindParam(':SiretCo', $this->SiretCo);
          $stmt->bindParam(':Localisation', $this->Localisation);
          $stmt->bindParam(':number_of_employeesCo', $this->number_of_employeesCo);
          $stmt->bindParam(':NameCo', $this->NameCo);

          // Execute query
          if($stmt->execute()) {
            return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    // Update Companies
    public function update() {
          // Create query
          $query = 'UPDATE ' . $this->table . '
                                SET SiretCo = :SiretCo, Localisation = :Localisation, number_of_employeesCo = :number_of_employeesCo, NameCo = :NameCo
                                WHERE IdCo = :IdCo';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->SiretCo = htmlspecialchars(strip_tags($this->SiretCo));
          $this->Localisation = htmlspecialchars(strip_tags($this->Localisation));
          $this->number_of_employeesCo = htmlspecialchars(strip_tags($this->number_of_employeesCo));
          $this->NameCo = htmlspecialchars(strip_tags($this->NameCo));
          $this->IdCo = htmlspecialchars(strip_tags($this->IdCo));

          // Bind data
          $stmt->bindParam(':SiretCo', $this->SiretCo);
          $stmt->bindParam(':Localisation', $this->Localisation);
          $stmt->bindParam(':number_of_employeesCo', $this->number_of_employeesCo);
          $stmt->bindParam(':NameCo', $this->NameCo);
          $stmt->bindParam(':IdCo', $this->IdCo);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }

    // Delete Companies
    public function delete() {
          // Create query
          $query = 'DELETE FROM ' . $this->table . ' WHERE IdCo = :IdCo';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->IdCo = htmlspecialchars(strip_tags($this->IdCo));

          // Bind data
          $stmt->bindParam(':IdCo', $this->IdCo);

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