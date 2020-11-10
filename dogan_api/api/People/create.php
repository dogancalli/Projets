<?php 
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/People.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog people object
  $people = new People($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  $people->FirstNamePe = $data->FirstNamePe;
  $people->LastNamePe = $data->LastNamePe;
  $people->EmailPe = $data->EmailPe;
  $people->PhonePe = $data->PhonePe;
  $people->RolePe = $data->RolePe;
  $people->statut = $data->statut;


  // Create people
  if($people->create()) {
    echo json_encode(
      array('message' => 'People Created')
    );
  } else {
    echo json_encode(
      array('message' => 'People Not Created')
    );
  }
?>