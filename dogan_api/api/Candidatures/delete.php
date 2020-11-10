<?php
  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Candidatures.php';
  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $candidatures = new Candidatures($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to UPDATE
  $candidatures->IdCa = $data->IdCa;

  // Delete post
  if($candidatures->delete()) {
    echo json_encode(
      array('message' => 'candidatures deleted')
    );
  } else {
    echo json_encode(
      array('message' => 'candidatures not deleted')
    );
  }
?>