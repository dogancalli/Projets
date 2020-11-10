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

  // Get ID
  $utilisateurs->IdUt = isset($_GET['IdUt']) ? $_GET['IdUt'] : die();

  // Get utilisateurs
  $utilisateurs->read_single();

  // Create array
  $user_arr = array(
    'IdUt' => $utilisateurs->IdUt,
    'pseudoUt' => $utilisateurs->pseudoUt,
    'EmailUt' => $utilisateurs->EmailUt,
    'PasswordUt' => $utilisateurs->PasswordUt,
    'statutUt' => $utilisateurs->statutUt,
    'Date_inscription_Ut' => $utilisateurs->Date_inscription_Ut
  );

  // Make JSON
  print_r(json_encode($user_arr));
  ?>