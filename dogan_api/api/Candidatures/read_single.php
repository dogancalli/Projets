<?php

  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Candidatures.php';
  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();
  // Instantiate blog category object
  $candidature = new Candidatures($db);

  // Get ID
  $candidature->IdCa = isset($_GET['IdCa']) ? $_GET['IdCa'] : die();

  // Get post
  $candidature->read_single();

  // Create array
  $Candidatures_arr = array(
    'IdCa' => $candidature->IdCa,
    'NameCa' => $candidature->NameCa,
    'EmailCa'=> $candidature->EmailCa,
    'PhoneCa'=> $candidature->PhoneCa,
    'MotvationsCa'=> $candidature->MotvationsCa,
    'AddId'=> $candidature->AddId,
    'CvCa'=> $candidature->CvCa,
    'DateCa'=> $candidature->DateCa
  );

  // Make JSON
  print_r(json_encode($Candidatures_arr));
?>