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

  // Blog application query
  $result = $application->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any Applies
  if($num > 0) {
    // application array
    $Applies_arr = array();
    // $Applies_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $post_item = array(
        'IdAp' => $IdAp,
        'MailSentAp' => $MailSentAp,
        'PeopleAp' => $PeopleAp,
        'AdvertisementsAp' => $AdvertisementsAp
      );

      // Push to "data"
      array_push($Applies_arr, $post_item);
      // array_push($Applies_arr['data'], $post_item);
    }

    // Turn to JSON & output
    echo json_encode($Applies_arr);

  } else {
    // No Applies
    echo json_encode(
      array('message' => 'No Applies Found')
    );
  }
?>