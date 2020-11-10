<?php
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
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

  $candidatures->NameCa = $data->NameCa;
  $candidatures->LastNameCa = $data->LastNameCa;
  $candidatures->EmailCa = $data->EmailCa;
  $candidatures->PhoneCa = $data->PhoneCa;
  $candidatures->MotivationsCa = $data->MotivationsCa;
  $candidatures->AddId = $data->AddId;
  $candidatures->CvCa = $data->CvCa;
  // Update post
  if($candidatures->update()) {
    echo json_encode(
      array('message' => 'candidatures Updated')
    );
  } else {
    echo json_encode(
      array('message' => 'candidatures not updated')
    );
  }
?>