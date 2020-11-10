<?php 
  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
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

  // Blog companies query
  $result = $companies->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any posts
  if($num > 0) {
    // companies array
    $Companies_arr = array();
    // $Companies_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $Companies_item = array(
        'IdCo' => $IdCo,
        'NameCo' => $NameCo,
        'sector_of_activityCo' => html_entity_decode($sector_of_activityCo),
        'SiretCo' => $SiretCo,
        'numer_of_employeesCo' => $numer_of_employeesCo,
        'Localisation' => $Localisation
      );

      // Push to "data"
      array_push($Companies_arr, $Companies_item);
      // array_push($Companies_arr['data'], $Companies_item);
    }

    // Turn to JSON & output
    echo json_encode($Companies_arr);

  } else {
    // No Company
    echo json_encode(
      array('message' => 'No Company Found')
    );
  }
?>