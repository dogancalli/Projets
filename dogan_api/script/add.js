$(document).ready(function() {

    $( "ul li:nth-child(2)" ).addClass( "active" );

    let searchParams = new URLSearchParams(window.location.search);

    let param = searchParams.get('IdAd');

    console.log(param);
    $.ajax({
        url: 'http://localhost/DogMann/dogan_api/api/Advert/read_single.php',

        type: 'GET',

        data:{IdAd:param},


        success: function(response) {
            console.log(response);
            var NAME = response.NameAd;
            var CONTENT = response.ContentAd;
            var COMPANY = response.CompanyAd;
            var CONTRAT = response.ContratAd;
            var WHERE = response.WhereAd;
            var DATE = response.CreateAd;


            $('#article').append(
                '<div class="jumbotron">'
                +'<h4 class="card-title">'+NAME+'</h4>'
                +'<h5 class="card-title">'+COMPANY+'</h5> '
                +'<p class="lead">'+CONTRAT+' à '+WHERE+'</p>'
                +'<p class="lead">publié le :'+DATE+'</p> '
                +'<p class="lead hidden">'+CONTENT+'</p>'
                +'<hr class="my-4">'
                +'<form class="formulaire" id="form1">'
                +'<div class="form-group">'
                +'<label class="col-form-label" for="Name" datatype="application/json">Name</label>'
                +'<input type="text" class="form-control" placeholder="Enter your name" id="Name" name="NAMECA">'
                +'<label class="col-form-label" for="LastName" datatype="application/json">Lastname</label>'
                +'<input type="text" class="form-control" placeholder="Enter your Lastname" id="LastName" name="LAST">'
                +'<label class="col-form-label" for="MAIL" datatype="application/json">Email</label>'
                +'<input type="text" class="form-control" placeholder="Enter your Email" id="MAIL" name="MAIL">'
                +'<label class="col-form-label" for="Phone" datatype="application/json">Phone number</label>'
                +'<input type="text" class="form-control" placeholder="Enter your phone number" id="Phone" name="Phone">'
                +'<label class="col-form-label" for="MOTIV" datatype="application/json">Your motivations</label>'
                +'<input type="text-area" class="form-control" placeholder="Enter your motivations" id="MOTIV" name="MOTIV">'
                +'<p class="lead"><button type="submit" class="btn btn-primary btn-lg savoir" >Postuler</button></p>'
                +'</form>'
                +'</div>'
                +'</div>');




            $('#form1').submit(function(){

                var NAMECA = $(this).find("input[name=NAMECA]").val();
                var LAST = $(this).find("input[name=LAST]").val();
                var MAIL = $(this).find("input[name=MAIL]").val();
                var PHONE = $(this).find("input[name=Phone]").val();
                var MOTIV = $(this).find("input[name=MOTIV]").val();
                var addnum = param;
                var DAT = {NameCa : NAMECA,
                             LastNameCa : LAST,
                             EmailCa : MAIL,
                             PhoneCa : PHONE,
                             MotivationsCa : MOTIV,
                             AddId : addnum};
                var DatJson = JSON.stringify(DAT);

                $.ajax({
                    url: 'http://localhost/DogMann/dogan_api/api/Candidatures/create.php',
                    type: 'POST',
                    data: DatJson,
                    success: function (Dat) {

                        console.log(Dat);


                    },
                    error: function (NoDat) {
                        console.log(NoDat);
                    }
                })

                alert("Vous avez postulé avec succès au poste de "+NAME+"\n Cliquez sur ok pour retourner à la page des annonces");
                location.href="Annonces.php";
                    return false;
                });



        },

        error:function(){
        console.log('error');
        },
    });



});