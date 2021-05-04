//el passphrase para encriptar / desencriptar los datos
var passphrase = "gladly deceptive ladder stowaway stingily deputy contrite borrower lively chloride mold squirt";  //passphrase generada aleatoriamente

$( document ).ready(function() {

    //si al cargar detecta que hay datos guardados y encriptados los carga conforme el recordarme
    if (localStorage.getItem("user") != null){

        Desencriptado_datos(localStorage.getItem("user"), localStorage.getItem("password"));
    }
    
    //el boton de recordarme
    $("#recordarme").on("click", function(){
        if ( $("#recordarme").prop("checked")){
            //aqui realizaremos las funciones de data Storage basandonos en el sistema de encriptado de CryptoJS
            let usuario = $("#user-field").val().trim();
            let password = $("#password-field").val().trim();
            Encriptado_datos(usuario, password);
        }
    });

    $(".xregistro").on("click", function(){
        event.preventDefault();
        window.location.href = "registro.php";
    });
});

//esta funcion valida si el formulario es apto o no para acceder al panel comprobando previamente los datos

function comprobacion(){

    var ok = false;

    let x_user = $("#user-field").val().trim();
    let x_password = $("#password-field").val().trim();

    if (x_user != "" && x_password != ""){

        //setea el ajax asyncronamente para que haga el callback bien Tiene que especificarse en los siguientes callbacks para que vuelva a la normalidad (async: true);
        $.ajaxSetup({async: false});

        //hace el callback de $.post
        $.post("php/comprobar_datos.php", {user: x_user, password: x_password}, function(data){

                if (data == 1){

                    Swal.fire({
                        icon: 'error',
                        title: 'Login',
                        text: 'Los datos son incorrectos'
                    });
                }
                else
                {
                    ok = true;
                }
            }
        )
    }

    return ok;
}

//esta funcion encriptara los datos tanto del usuario como de la password y los guardara en un LocalStorage encriptados usando CryptoJS
function Encriptado_datos(xuser, xpassword){

    var hash_xuser = CryptoJS.Rabbit.encrypt(xuser, passphrase).toString(CryptoJS.enc.hex);
    var hash_xpassword = CryptoJS.Rabbit.encrypt(xpassword, passphrase).toString(CryptoJS.enc.hex);

    localStorage.setItem("user", hash_xuser);
    localStorage.setItem("password", hash_xpassword);
}

//esta funcion Desencriptara los datos tanto del usuario como de la password y los guardara en sus respectivos espacios
function Desencriptado_datos(xuser, xpassword){

    var hash_xuser = CryptoJS.Rabbit.decrypt(xuser, passphrase).toString(CryptoJS.enc.Latin1);
    var hash_xpassword = CryptoJS.Rabbit.decrypt(xpassword, passphrase).toString(CryptoJS.enc.Latin1);

    //aqui va la parte de colocar los respectivos datos en sus respectivos campos

    $("#user-field").val(hash_xuser);
    $("#password-field").val(hash_xpassword);
}

