<?php 
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Companies.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog companies object
  $companies = new Companies($db);

  // Get ID
  $companies->IdCo = isset($_GET['IdCo']) ? $_GET['IdCo'] : die();

  // Get companies
  $companies->read_single();
  
  // Create array
  $Companies_arr = array(
    'IdCo' => $companies->IdCo,
    'NameCo' => $companies->NameCo,
    'sector_of_activityCo' => $companies->sector_of_activityCo,
    'SiretCo' => $companies->SiretCo,
    'number_of_employeesCo' => $companies->number_of_employeesCo,
    'Localisation' => $companies->Localisation
  );

  // Make JSON
  print_r(json_encode($Companies_arr));
  ?>