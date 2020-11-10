<?php
  class Candidatures {
    // DB Stuff
    private $conn;
    private $table = 'candidatures';
   
    // Properties
    public $IdCa;
    public $NameCa;
    public $LastNameCa;
    public $EmailCa;
    public $PhoneCa;
    public $MotivationsCa;
    public $AddId;
    public $CvCa;
    public $DateCa;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get categories
    public function read() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table . ' ORDER BY DateCa DESC';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Get Single Category
  public function read_single(){
    // Create query
    $query = 'SELECT * FROM ' . $this->table . ' WHERE IdCa = ?';

      //Prepare statement
      $stmt = $this->conn->prepare($query);

      // Bind ID
      $stmt->bindParam(1, $this->IdCa);

      // Execute query
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      // set properties
      $this->IdCa = $row['IdCa'];
      $this->NameCa = $row['NameCa'];
      $this->DateCa = $row['DateCa'];
      $this->LastNameCa = $row['LastNameCa'];
      $this->EmailCa = $row['EmailCa'];
      $this->PhoneCa = $row['PhoneCa'];
      $this->MotivationsCa = $row['MotivationsCa'];
      $this->CvCa = $row['CvCa'];
      $this->AddId = $row['AddId'];
  }
  
  // Create Category
  public function create() {
    // Create Query
    $query = 'INSERT INTO ' . $this->table . ' SET NameCa = :NameCa, LastNameCa = :LastNameCa, EmailCa = :EmailCa, PhoneCa = :PhoneCa, MotivationsCa = :MotivationsCa, AddId = :AddId, CvCa = :CvCa';

  // Prepare Statement
  $stmt = $this->conn->prepare($query);

  // Clean data
  $this->NameCa = htmlspecialchars(strip_tags($this->NameCa));
  $this->LastNameCa = htmlspecialchars(strip_tags($this->LastNameCa));
  $this->EmailCa = htmlspecialchars(strip_tags($this->EmailCa));
  $this->PhoneCa = htmlspecialchars(strip_tags($this->PhoneCa));
  $this->MotivationsCa = htmlspecialchars(strip_tags($this->MotivationsCa));
  $this->AddId = htmlspecialchars(strip_tags($this->AddId));
  $this->CvCa = htmlspecialchars(strip_tags($this->CvCa));

  // Bind data
  $stmt->bindParam(':NameCa', $this->NameCa);
  $stmt->bindParam(':LastNameCa', $this->LastNameCa);
  $stmt->bindParam(':EmailCa', $this->EmailCa);
  $stmt->bindParam(':PhoneCa', $this->PhoneCa);
  $stmt->bindParam(':MotivationsCa', $this->MotivationsCa);
  $stmt->bindParam(':AddId', $this->AddId);
  $stmt->bindParam(':CvCa', $this->CvCa);

  // Execute query
  if($stmt->execute()) {
    return true;
  }

  // Print error if something goes wrong
  printf($stmt->error);

  return false;
  }

  // Update Category
  public function update() {
    // Create Query
    $query = 'UPDATE ' .
      $this->table.' 
    SET
      NameCa = :NameCa,
      LastNameCa = :LastNameCa,
      EmailCa = :EmailCa,
      PhoneCa = :PhoneCa,
      MotivationsCa = :MotivationsCa,
      AddID = :AddId,
      CvCa = :CvCa,
      WHERE
      IdCa = :IdCa';

  // Prepare Statement
  $stmt = $this->conn->prepare($query);

  // Clean data
  $this->NameCa = htmlspecialchars(strip_tags($this->NameCa));
  $this->LastNameCa = htmlspecialchars(strip_tags($this->LastNameCa));
  $this->EmailCa = htmlspecialchars(strip_tags($this->EmailCa));
  $this->PhoneCa = htmlspecialchars(strip_tags($this->PhoneCa));
  $this->MotivationsCa = htmlspecialchars(strip_tags($this->MotivationsCa));
  $this->AddId = htmlspecialchars(strip_tags($this->AddId));
  $this->CvCa = htmlspecialchars(strip_tags($this->CvCa));

  // Bind data
  $stmt-> bindParam(':NameCa', $this->NameCa);
  $stmt-> bindParam(':LastNameCa', $this->LastNameCa);
  $stmt-> bindParam(':EmailCa', $this->EmailCa);
  $stmt-> bindParam(':PhoneCa', $this->PhoneCa);
  $stmt-> bindParam(':MotivationsCa', $this->MotivationsCa);
  $stmt-> bindParam(':AddId', $this->AddId);
  $stmt-> bindParam(':CvCA', $this->CvCa);


  // Execute query
  if($stmt->execute()) {
    return true;
  }

  // Print error if something goes wrong
  printf($stmt->error);

  return false;
  }

  // Delete Category
  public function delete() {
    // Create query
    $query = 'DELETE FROM ' . $this->table . ' WHERE IdCa = :IdCa';

    // Prepare Statement
    $stmt = $this->conn->prepare($query);

    // clean data
    $this->IdCa = htmlspecialchars(strip_tags($this->IdCa));

    // Bind Data
    $stmt-> bindParam(':IdCa', $this->IdCa);

    // Execute query
    if($stmt->execute()) {
      return true;
    }

    // Print error if something goes wrong
    printf($stmt->error);

    return false;
    }
  }
?>