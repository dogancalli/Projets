$(document).ready(function() {

    $( "ul li:nth-child(2)" ).addClass( "active" );

    let searchParams = new URLSearchParams(window.location.search);

    let param = searchParams.get('IdAd');

    console.log(param);
    $.ajax({
        url: 'api/Advert/read_single.php',

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
                +'<label class="col-form-label" for="Name" datatype="application/json">Prénom</label>'
                +'<input type="text" class="form-control" placeholder="Entrez votre Prénom" id="Name" name="NAMECA">'
                +'<label class="col-form-label" for="LastName" datatype="application/json">Nom</label>'
                +'<input type="text" class="form-control" placeholder="Entrez votre Nom" id="LastName" name="LAST">'
                +'<label class="col-form-label" for="MAIL" datatype="application/json">Email</label>'
                +'<input type="text" class="form-control" placeholder="Entrez votre Email" id="MAIL" name="MAIL">'
                +'<label class="col-form-label" for="Phone" datatype="application/json">Portable</label>'
                +'<input type="text" class="form-control" placeholder="Entrez votre numéro de portable" id="Phone" name="Phone">'
                +'<label for="cv_file">Choisir CV</label>'
                +'<input type="file" class="form-control-file" id="cv_file" aria-describedby="fileHelp">'
                +'<label class="col-form-label" for="MOTIV" datatype="application/json">Vos motivations</label>'
                +'<input type="text-area" class="form-control" placeholder="Entrez vos motivations" id="MOTIV" name="MOTIV">'
                +'<p class="lead"><button type="submit" class="btn btn-primary btn-lg savoir" >Postuler</button></p>'
                +'</form>'
                +'</div>'
                +'</div>');




            $('#form1').submit(function(){

                var file = $('#cv_file')[0].files[0]
                if (file){
                    console.log(file.name);
                }
                var formData = new FormData();
                formData.append('file', file);

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
                             CvCa : "dogan_api/CV/"+file.name,
                             AddId : addnum};
                var DatJson = JSON.stringify(DAT);

                $.ajax({
                    url: 'api/Candidatures/create.php',
                    type: 'POST',
                    data: DatJson,
                    success: function (Dat) {

                        $.ajax({
                            url: 'http://localhost/DogMann/dogan_api/api/Candidatures/upload_file.php',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            enctype: 'multipart/form-data',

                            success:function (cv) {

                                console.log(cv);

                            }
                        });

                    },
                    error: function (NoDat) {
                        console.log(NoDat);
                    }
                })


                    return false;
                });



        },

        error:function(){
        console.log('error');
        },
    });



});




