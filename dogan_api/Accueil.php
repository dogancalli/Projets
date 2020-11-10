<!DOCTYPE html>
<html lang="en">
<head>

    <title>JobBoard</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="style/accueil.css">
    <link rel="stylesheet" type="text/css" href="style/advert.css">
    <link rel="stylesheet" type="text/css" href="style/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="script/accueil.js"></script>
</head>

<body>
<header>
    <?php
    include 'template/header.php'
    ?>
</header>
<main>
<div>
    <img class="bg1" src="style/medias/bg-homepage.jpg">
</div>
    <div class="wJob">
        <center>
        <h3>Bienvenue chez</h3>
        <br>
        <h1>JobBoard</h1>
        </center>
    </div>

    <section class="clique">
        <center>
        <div class="text-bg">
            <h4>Vous êtes à la recherche de votre futur emploi ?</h4>
            <p>Alors vous êtes au bon endroit, JobBoard va vous permettre d'accéder rapidement à de nombreuses offres en ligne !
                <br>Comment faire ? C'est simple ! Accédez aux offres les plus récentes mises en ligne par de nombreux employeurs
                <br>faisaent confiance à JobBoard. Pour cela il vous suffit de cliquez :
            </p>
            <button class="btn btn-primary btn-lg postuler" role="button">Postuler</button>
            </center>
        </div>
        <div>
            <img class="CV" src="style/medias/saisie.jpg">
        </div>
    </section>
    <br>
    <div class="lastadd1"><center><h3>Dernière publication</h3></center></div>
    <div class="lastadd"></div>
</main>
<footer>
    <?php
    include 'template/footer.php'
    ?>
</footer>
</body>
</html>