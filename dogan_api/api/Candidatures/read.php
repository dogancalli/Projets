<?php 
  // Headers
  header('Access-Control-Allow-Origin: dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Candidatures.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate candidature object
  $candidature = new Candidatures($db);

  // Category read query
  $result = $candidature->read();
  
  // Get row count
  $num = $result->rowCount();

  // Check if any categories
  if($num > 0) {
        // Cat array
        $cat_arr = array();
        $cat_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);

          $cat_item = array(
            'IdCa' => $IdCa,
            'NameCa' => $NameCa,
            'LastNameCa' => $LastNameCa,
            'EmailCa'=> $EmailCa,
            'PhoneCa'=> $PhoneCa,
            'MotivationsCa'=> $MotivationsCa,
            'AddId'=> $AddId,
            'CvCa'=> $CvCa,
            'DateCa'=> $DateCa
          );

          // Push to "data"
          array_push($cat_arr['data'], $cat_item);
        }

        // Turn to JSON & output
        echo json_encode($cat_arr);

  } else {
        // No Categories
        echo json_encode(
          array('message' => 'No Candidate Found')
        );
  }
?>