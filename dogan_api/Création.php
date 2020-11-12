<!DOCTYPE html>
<html lang="en">

<head>
    <title>JobBoard</title>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="">
<link rel="stylesheet" type="text/css" href="style/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="script/création.js"></script>
</head>
<body>
<header>
    <?php
    include 'template/header.php'
    ?>
</header>
<main>
    <form id="publier">
        <fieldset>
            <legend>Publier une offre d'emploi</legend>
                <div class="form-group">
            <label class="col-form-label" for="adname" datatype="application/json">Nom du poste</label>
            <input type="text" class="form-control" placeholder="Entrez l'intitulé de l'offre" id="adname" name="adname">
                </div>
                <div class="form-group">
            <label class="col-form-label" for="company" datatype="application/json">Nom de l'entreprise</label>
            <input type="text" class="form-control" placeholder="Entrez le nom de l'entreprise" id="company" name="company">
                </div>
                <div class="form-group">
            <label class="col-form-label" for="location" datatype="application/json">Localisation de l'offre</label>
            <input type="text" class="form-control" placeholder="Entrez la localisation" id="location" name="location">
                </div>
            <div class="form-group">
                <label for="adcontrat">Type de contrat</label>
                <select class="form-control" id="adcontrat" name="adcontrat">
                    <option>CDI</option>
                    <option>CDD</option>
                    <option>Intérim</option>
                    <option>Temps plein</option>
                    <option>Temps partiel</option>
                    <option>Alternance</option>
                    <option>Stage</option>
                    <option>Contrat pro</option>
                    <option>Freelance/Indépendant</option>
                </select>
            </div>

            <div class="form-group">
                <label for="adcontent">Description du poste</label>
                <textarea class="form-control" id="adcontent" name="adcontent" rows="3"></textarea>
            </div>
            <div>
                <button type="submit" class="btn btn-primary btn-lg btn-block publier">Publier</button>
            </div>
    </form>
</main>
<footer>
    <?php
    include 'template/footer.php'
    ?>
</footer>
</body>
</html>