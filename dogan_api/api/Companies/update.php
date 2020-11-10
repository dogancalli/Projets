<?php 
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Companies.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog companies object
  $companies = new Companies($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to update
  $companies->IdCo = $data->IdCo;

  $companies->NameCo = $data->NameCo;
  $companies->sector_of_activityCo = $data->sector_of_activityCo;
  $companies->SiretCo = $data->SiretCo;
  $companies->number_of_empoyeesCo = $data->number_of_empoyeesCo;
  $companies->Localisation = $data->Localisation;

  // Update companies
  if($companies->update()) {
    echo json_encode(
      array('message' => 'companies Updated')
    );
  } else {
    echo json_encode(
      array('message' => 'companies Not Updated')
    );
  }
?>