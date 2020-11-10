<?php 
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
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

  $utilisateurs->pseudoUt = $data->pseudoUt;
  $utilisateurs->EmailUt = $data->EmailUt;
  $utilisateurs->PasswordUt = $data->PasswordUt;
  $utilisateurs->statutUt = $data->statutUt;
  $utilisateurs->Date_inscription_Ut = $data->Date_inscription_Ut;

  // Create utilisateurs
  if($utilisateurs->create()) {
    echo json_encode(
      array('message' => 'Utilisateurs Created')
    );
  } else {
    echo json_encode(
      array('message' => 'Utilisateurs Not Created')
    );
  }
?>