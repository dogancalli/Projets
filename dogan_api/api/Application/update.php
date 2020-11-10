<?php 
  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Application.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog application object
  $application = new Application($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to update
  $application->IdAp = $data->IdAp;

  $application->MailSentAp = $data->MailSentAp;
  $application->PeopleAp = $data->PeopleAp;
  $application->AdvertisementsAp = $data->AdvertisementsAp;

  // Update application
  if($application->update()) {
    echo json_encode(
      array('message' => 'application Updated')
    );
  } else {
    echo json_encode(
      array('message' => 'application Not Updated')
    );
  }
?>