$(document).ready(function() {
    $("ul li:nth-child(1)").addClass("active");
    $('.postuler').click(function () {
        window.location = 'Annonces.php';
    });
    $.ajax({
        url: 'http://localhost/DogMann/dogan_api/api/Advert/read.php',

        type: 'GET',


        dataType: 'json',

        success: function (response) {


            var data = response.data;
            var i = response.data[0];

            var ID = i.IdAd;
            var NAME = i.NameAd;
            var CONTENT = i.ContentAd;
            var COMPANY = i.CompanyAd;
            var CONTRAT = i.ContratAd;
            var WHERE = i.WhereAd;
            var DATE = i.CreateAd;


            console.log(i);


            $('.lastadd').append(
                '<div class="jumbotron">'
                + '<h4 class="card-title">' + NAME + '</h4>'
                + '<h5 class="card-title">' + COMPANY + '</h5> '
                + '<p class="lead">' + CONTRAT + ' à ' + WHERE + '</p>'
                + '<p class="lead">publié le :' + DATE + '</p> '
                + '<p class="lead hidden" id="content">' + CONTENT + '</p>'
                + '<hr class="my-4">'
                + '<p class="lead"><button class="btn btn-primary btn-lg postt" data-index="'+ID+'" id="post"  value="'+i+'" role="button" ></button></p>'
                + '</div>');


            $('.postt').html('En savoir plus');
            $('.postt').click(function () {
                console.log($(this).data("index"));
                var valeur = $(this).val();
                console.log(valeur);
                $('#content').css({"overflow": "visible", "white-space": "normal"});
                $('#post').html('Postuler').click(function () {
                    window.location = 'Annonce.php?IdAd=' + $(this).data("index") + '';
                });
            });

        },
        error: function () {
            console.log('Error in Database');

        }


    });
});