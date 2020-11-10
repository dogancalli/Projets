<?php 
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Application.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog application object
  $application = new Application($db);

  // Get raw Applicationed data
  $data = json_decode(file_get_contents("php://input"));

  // Set IdAp to update
  $application->IdAp = $data->IdAp;

  // Delete application
  if($application->delete()) {
    echo json_encode(
      array('message' => 'application Deleted')
    );
  } else {
    echo json_encode(
      array('message' => 'application Not Deleted')
    );
  }
?>