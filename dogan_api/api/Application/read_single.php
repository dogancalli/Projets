<?php 
  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Application.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog application object
  $application = new Application($db);

  // Get IdAp
  $application->IdAp = isset($_GET['IdAp']) ? $_GET['IdAp'] : die();

  // Get application
  $application->read_single();

  // Create array
  $Application_arr = array(
    'IdAp' => $application->IdAp,
    'MailSentAp' => $application->MailSentAp,
    'PeopleAp' => $application->PeopleAp,
    'AdvertisementsAp' => $application->AdvertisementsAp,
  );

  // Make JSON
  print_r(json_encode($Application_arr));
  ?>