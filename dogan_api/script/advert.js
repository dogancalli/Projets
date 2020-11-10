$(document).ready(function() {
    $( "ul li:nth-child(2)" ).addClass( "active" );

    $.ajax({
        url: 'api/Advert/read.php',

        type: 'GET',


        dataType: 'json',

        success: function(response) {


            for (let i = 0; i<response.data.length;i++){

                var ID = response.data[i].IdAd;
                var NAME = response.data[i].NameAd;
                var CONTENT = response.data[i].ContentAd;
                var COMPANY = response.data[i].CompanyAd;
                var CONTRAT = response.data[i].ContratAd;
                var WHERE = response.data[i].WhereAd;
                var DATE = response.data[i].CreateAd;


                $('#articles').append(
                '<div class="jumbotron">'
                +'<h4 class="card-title">'+NAME+'</h4>'
                +'<h5 class="card-title">'+COMPANY+'</h5> '
                +'<p class="lead">'+CONTRAT+' à '+WHERE+'</p>'
                +'<p class="lead">publié le :'+DATE+'</p> '
                +'<p class="lead hidden" id="content'+i+'">'+CONTENT+'</p>'
                +`<hr class="my-4">`
                +`<p class="lead"><button class="btn btn-primary btn-lg savoir" data-index="${ID}" id="post-${i}"  value="${i}" role="button" ></button></p>`
                +'</div>');

            };
            $('.savoir').html('En savoir plus');
            $('.savoir').click(function() {
                console.log($(this).data("index"));
                var valeur = $(this).val();
                console.log(valeur);
                $('#content'+valeur).css({"overflow" : "visible","white-space" : "normal"});
                $('#post-'+valeur).html('Postuler').click(function(){
                    window.location = `Annonce.php?IdAd=`+$(this).data("index")+``;
                });
            });

        },
        error: function() {
            console.log('Error in Database');

        }



    });

});