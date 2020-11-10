<?php 
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Utilisateurs.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog utilisateurs object
  $utilisateurs = new Utilisateurs($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to update
  $utilisateurs->IdUt = $data->IdUt;

  // Delete utilisateurs
  if($utilisateurs->delete()) {
    echo json_encode(
      array('message' => 'Utilisateurs Deleted')
    );
  } else {
    echo json_encode(
      array('message' => 'Utilisateurs Not Deleted')
    );
  }
?>