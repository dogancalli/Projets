<?php
  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Advertisements.php';
  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $advertisements = new Advertisements($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  $advertisements->NameAd = $data->NameAd;
  $advertisements->ContentAd = $data->ContentAd;
  $advertisements->CompanyAd = $data->CompanyAd;
  $advertisements->ContratAd = $data->ContratAd;
  $advertisements->WhereAd = $data->WhereAd;

  // Create Advert
  if($advertisements->create()) {
    echo json_encode(
      array('message' => 'Advert Created')
    );
  } else {
    echo json_encode(
      array('message' => 'Advert Not Created')
    );
  }
?>