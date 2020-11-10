<?php 
  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Utilisateurs.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog utilisateurs object
  $utilisateurs = new Utilisateurs($db);

  // Blog utilisateurs query
  $result = $utilisateurs->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any posts
  if($num > 0) {
    // Utilisateurs array
    $user_arr = array();
    // $user_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $user_item = array(
        'IdUt' => $IdUt,
        'pseudoUt' => $pseudoUt,
        'EmailUt' => $EmailUt,
        'PasswordUt' => $PasswordUt,
        'statutUt' => $statutUt,
        'Date_inscription_Ut' => $Date_inscription_Ut
      );

      // Push to "data"
      array_push($user_arr, $user_item);
      // array_push($user_arr['data'], $user_item);
    }

    // Turn to JSON & output
    echo json_encode($user_arr);

  } else {
    // No user
    echo json_encode(
      array('message' => 'No user Found')
    );
  }
?>