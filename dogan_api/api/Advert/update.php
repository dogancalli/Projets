<?php
  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Advertisements.php';
  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $Advert = new Advertisements($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to UPDATE
  $Advert->IdAd = $data->IdAd;

  $Advert->NameAd = $data->NameAd;
  $Advert->ContentAd = $data->ContentAd;
  $Advert->CompanyAd = $data->CompanyAd;
  $Advert->ContratAd = $data->ContratAd;
  $Advert->WhereAd = $data->WhereAd;
  // Update post
  if($Advert->update()) {
    echo json_encode(
      array('message' => 'Advert Updated')
    );
  } else {
    echo json_encode(
      array('message' => 'Advert not updated')
    );
  }
?>