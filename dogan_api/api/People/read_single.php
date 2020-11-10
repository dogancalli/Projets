<?php 
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/People.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog people object
  $people = new People($db);

  // Get ID
  $people->IdPe = isset($_GET['IdPe']) ? $_GET['IdPe'] : die();

  // Get people
  $people->read_single();

  // Create array
  $post_arr = array(
    'IdPe' => $people->IdPe,
    'FirstNamePe' => $people->FirstNamePe,
    'LastNamePe' => $people->LastNamePe,
    'EmailPe' => $people->EmailPe,
    'PhonePe' => $people->PhonePe,
    'RolePe' => $people->RolePe,
    'statut' => $people->statut
  );

  // Make JSON
  print_r(json_encode($post_arr));
  ?>