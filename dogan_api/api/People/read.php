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

  // Blog people query
  $result = $people->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any posts
  if($num > 0) {
    // People array
    $posts_arr = array();
    // $posts_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $people_item = array(
        'IdPe' => $IdPe,
        'FirstNamePe' => $FirstNamePe,
        'LastNamePe' => $LastNamePe,
        'EmailPe' => $EmailPe,
        'PhonePe' => $PhonePe,
        'RolePe' => $RolePe,
        'statut' => $statut
      );

      // Push to "data"
      array_push($posts_arr, $people_item);
      // array_push($posts_arr['data'], $people_item);
    }

    // Turn to JSON & output
    echo json_encode($posts_arr);

  } else {
    // No one
    echo json_encode(
      array('message' => 'No one Found')
    );
  }
?>