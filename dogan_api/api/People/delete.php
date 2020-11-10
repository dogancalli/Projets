<?php 
  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
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

  // Set ID to update
  $people->IdPe = $data->IdPe;

  // Delete people
  if($people->delete()) {
    echo json_encode(
      array('message' => 'People Deleted')
    );
  } else {
    echo json_encode(
      array('message' => 'People Not Deleted')
    );
  }
?>