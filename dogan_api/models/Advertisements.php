<?php
  class Advertisements {
    // DB Stuff
    private $conn;
    private $table = 'advertisements';

    // Properties
    public $IdAd;
    public $NameAd;
    public $CreateAd;
    public $ContentAd;
    public $CompanyAd;
    public $ContratAd;
    public $WhereAd;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get categories
    public function read() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table . ' ORDER BY CreateAd DESC';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Get Single Category
  public function read_single(){
    // Create query
    $query = 'SELECT * FROM ' . $this->table . ' WHERE IdAd = ? LIMIT 0,1';

      //Prepare statement
      $stmt = $this->conn->prepare($query);

      // Bind ID
      $stmt->bindParam(1, $this->IdAd);

      // Execute query
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      // set properties
      $this->IdAd = $row['IdAd'];
      $this->NameAd = $row['NameAd'];
      $this->CreateAd = $row['CreateAd'];
      $this->ContentAd = $row['ContentAd'];
      $this->CompanyAd = $row['CompanyAd'];
      $this->ContratAd = $row['ContratAd'];
      $this->WhereAd = $row['WhereAd'];
  }

  // Create Category
  public function create() {
    // Create Query
    $query = 'INSERT INTO ' .
      $this->table . '
    SET
      NameAd = :NameAd,
      ContentAd = :ContentAd,
      CompanyAd = :CompanyAd,
      ContratAd = :ContratAd,
      WhereAd = :WhereAd'
      ;

  // Prepare Statement
  $stmt = $this->conn->prepare($query);

  // Clean data
  $this->NameAd = htmlspecialchars(strip_tags($this->NameAd));
  $this->ContentAd = htmlspecialchars(strip_tags($this->ContentAd));
  $this->CompanyAd = htmlspecialchars(strip_tags($this->CompanyAd));
  $this->ContratAd = htmlspecialchars(strip_tags($this->ContratAd));
  $this->WhereAd = htmlspecialchars(strip_tags($this->WhereAd));

  // Bind data
  $stmt-> bindParam(':NameAd', $this->NameAd);
  $stmt-> bindParam(':ContentAd', $this->ContentAd);
  $stmt-> bindParam(':CompanyAd', $this->CompanyAd);
  $stmt-> bindParam(':ContratAd', $this->ContratAd);
  $stmt-> bindParam(':WhereAd', $this->WhereAd);

  // Execute query
  if($stmt->execute()) {
    return true;
  }

  // Print error if something goes wrong
  printf("Error: $s.\n", $stmt->error);

  return false;
  }

  // Update Category
  public function update() {
    // Create Query
    $query = 'UPDATE ' .
      $this->table . '
    SET
      NameAd = :NameAd,
      ContentAd = :ContentAd,
      CompanyAd = :CompanyAd,
      ContratAd = :ContratAd,
      WhereAd = :WhereAd,
      WHERE
      IdAd = :IdAd';

  // Prepare Statement
  $stmt = $this->conn->prepare($query);

  // Clean data
  $this->NameAd = htmlspecialchars(strip_tags($this->NameAd));
  $this->ContentAd = htmlspecialchars(strip_tags($this->ContentAd));
  $this->CompanyAd = htmlspecialchars(strip_tags($this->CompanyAd));
  $this->ContratAd = htmlspecialchars(strip_tags($this->ContratAd));
  $this->WhereAd = htmlspecialchars(strip_tags($this->WhereAd));

  // Bind data
  $stmt-> bindParam(':NameAd', $this->NameAd);
  $stmt-> bindParam(':ContentAd', $this->ContentAd);
  $stmt-> bindParam(':CompanyAd', $this->CompanyAd);
  $stmt-> bindParam(':ContratAd', $this->ContratAd);
  $stmt-> bindParam(':WhereAd', $this->WhereAd);


  // Execute query
  if($stmt->execute()) {
    return true;
  }

  // Print error if something goes wrong
  printf("Error: $s.\n", $stmt->error);

  return false;
  }

  // Delete Category
  public function delete() {
    // Create query
    $query = 'DELETE FROM ' . $this->table . ' WHERE IdAd = :IdAd';

    // Prepare Statement
    $stmt = $this->conn->prepare($query);

    // clean data
    $this->IdAd = htmlspecialchars(strip_tags($this->IdAd));

    // Bind Data
    $stmt-> bindParam(':IdAd', $this->IdAd);

    // Execute query
    if($stmt->execute()) {
      return true;
    }

    // Print error if something goes wrong
    printf("Error: $s.\n", $stmt->error);

    return false;
    }
  }
?>