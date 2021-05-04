function findGetParameter(parameterName) {

    var result = null,tmp = [];

    location.search.substr(1).split("&").forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

//para descargar un archivo
function downloadURI(uri, name) 
{
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
    link.remove();
}

$(document).ready(function() {

    $.post("php/comprobar_situacion.php", {archivo: findGetParameter("archivo"), id_user: findGetParameter("id")}, function(data){

        $("#file").text("Archivo: "+findGetParameter("archivo")+"");
        $("#subido").text("Subido por: "+findGetParameter("usuario")+"");


        if (data == 1){
            //aqui el archivo esta bloqueado conforme que ponemos el visualizado avisando de que el archivo esta bloqueado
            $("#key").addClass("d-none");
            $("#accept_key").addClass("d-none");

            //el texto indicado
            $("#peso").text("El archivo actualmente esta bloqueado");
        }
        else
        {
            $.post("php/comprobar_tipo.php", {archivo: findGetParameter("archivo"), id_user: findGetParameter("id")}, function(data){

                $("#peso").text("Peso: "+findGetParameter("peso")+"");

                //es privado
                if (data == 0){
                
                    if (findGetParameter("clave") != ""){   //si tiene clave de seguridad el archivo
                
                        $("#clave").val(findGetParameter("clave")); //asignamos la clave al input
                        $(".submit").prop("disabled", false);
                        $("#clave").prop("disabled", true);
                    }
                }
                else //es publico
                {
                    $("#key").addClass("d-none");
                    $(".submit").prop("disabled", false);
                }

            });
        }
    })

     //al presionar dentro de el input
     $("#clave").on("keydown", function(){
        
        if ($("#clave").val().length >= 10){
            $(".submit").prop("disabled", false);
        }
        else
        {
            $(".submit").prop("disabled", true);
        }
    });

    $("#clave").on("focusout", function(){

        if ($("#clave").val().length == 0){
            $(".submit").prop("disabled", true);
        }
    });

    $("#xdescargar").on("click", function(){
        $.post("php/comprobar_clave.php", {clave: $("#clave").val().trim(), archivo: findGetParameter("archivo"), id_user: findGetParameter("id")}, function(data){

            console.log(data);

            if (data == 1){

                Swal.fire({
                    icon: 'error',
                    title: 'Verificacion Claves',
                    text: 'La clave no es correcta'
                  });
            }
            else
            {
                downloadURI("files/"+findGetParameter("id")+"/"+findGetParameter("archivo")+"", findGetParameter("archivo"));
            }
        });
    });

});

