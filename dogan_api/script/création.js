$(document).ready(function() {
    $("ul li:nth-child(3)").addClass("active");

    $("#publier").submit(function () {

        var NAMEAD = $(this).find("input[name=adname]").val();
        var COMPANY = $(this).find("input[name=company]").val();
        var CONTENT = $(this).find("input[name=adcontent]").val();
        var CONTRAT = $(this).find("select[name=adcontrat]").val();
        var LOCATION = $(this).find("input[name=location]").val();

        var DATA = {NameAd : NAMEAD,
                    CompanyAd : COMPANY,
                    ContentAd : CONTENT,
                    ContratAd : CONTRAT,
                    WhereAd : LOCATION};
        var DataJson = JSON.stringify(DATA);

        $.ajax({
            url : 'api/Advert/create.php',
            type : 'POST',
            data : DataJson,

            success : function (send) {
                console.log(send);
            },
            error : function (erreur) {
                console.log(erreur);
            }
        })
        alert("Votre offre d'emploi pour le poste de "+NAMEAD+" a été publier avec succès\n Cliquez sur ok pour retourner à l'acuueil");
        location.href="Accueil.php";
        return false;

    })



});