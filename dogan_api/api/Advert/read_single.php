<?php

  // Headers
  header('Access-Control-Allow-Origin: http://localhost/DogMann/dogan_api');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Advertisements.php';
  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();
  // Instantiate blog category object
  $Advert = new Advertisements($db);

  // Get ID
  $Advert->IdAd = isset($_GET['IdAd']) ? $_GET['IdAd'] : die();

  // Get post
  $Advert->read_single();

  // Create array
  $Advert_arr = array(
    'IdAd' => $Advert->IdAd,
    'NameAd' => $Advert->NameAd,
    'CreateAd'=> $Advert->CreateAd,
    'ContentAd'=> $Advert->ContentAd,
    'CompanyAd'=> $Advert->CompanyAd,
    'ContratAd'=> $Advert->ContratAd,
    'WhereAd'=> $Advert->WhereAd
  );

  // Make JSON
  print_r(json_encode($Advert_arr));
return json_encode($Advert_arr);
?>