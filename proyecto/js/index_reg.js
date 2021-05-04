//el passphrase para encriptar / desencriptar los datos
var passphrase = "gladly deceptive ladder stowaway stingily deputy contrite borrower lively chloride mold squirt";  //passphrase generada aleatoriamente

$( document ).ready(function() {
    
    //el boton de recordarme
    $("#recordarme").on("click", function(){
        if ( $("#recordarme").prop("checked")){
            //aqui realizaremos las funciones de data Storage basandonos en el sistema de encriptado de CryptoJS
            let usuario = $("#user-field").val().trim();
            let password = $("#password-field").val().trim();
            Encriptado_datos(usuario, password);
        }
    });

    //para ir al login
    $(".xacceso").on("click", function(){
        window.location.href = "index.php";
    });
});

//esta funcion calcula la edad entregando la fecha de nacimiento

function calculateAge(fecha){
    let dp = new Date(fecha);   //la fecha impuesta

    let month_diff = Date.now() - dp.getTime();  
      
    //convert the calculated difference in date format  
    let age_dt = new Date(month_diff);   
      
    //extract year from date      
    let year = age_dt.getUTCFullYear();  
      
    //now calculate the age of the user  
    let age = Math.abs(year - 1970);

    return age;
}

//esta funcion valida si el formulario es apto o no para acceder al panel comprobando previamente los datos

function comprobacion(){

    var ok = false;

    let x_email = $("#email-field").val().trim();
    let x_nombre = $("#nombre-field").val().trim();
    let x_sexo = $("#sexo").val().trim();
    let x_nacimiento = $("#nacimiento-field").val().trim();
    let x_primerape = $("#apellido-field").val().trim();
    let x_segundoape = $("#segundo-field").val().trim();
    let x_password = $("#password-field").val().trim();

    if (x_email != "" && x_nombre != "" && x_nacimiento != "" && x_primerape != "" && x_segundoape != "" && x_password != ""){

        //setea el ajax asyncronamente para que haga el callback bien Tiene que especificarse en los siguientes callbacks para que vuelva a la normalidad (async: true);
        $.ajaxSetup({async: false});

        //hace el callback de $.post
        $.post("php/comprobar_registro.php", {email: x_email}, function(data){

                if (data == 0){

                    Swal.fire({
                        icon: 'error',
                        title: 'Registro',
                        text: 'Ya hay un usuario registrado con este email'
                    });

                    return ok;
                }
                else
                {
                    let edad = calculateAge(x_nacimiento);
                    //aqui debe hacer el registro
                    $.post("php/registrar.php", {email: x_email, age: edad, nombre: x_nombre, nacimiento: x_nacimiento, primerape: x_primerape, segundoape: x_segundoape, password: x_password, sexo: x_sexo}, 
                        function(data){
                            
                            if (data == 0){

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registro',
                                    text: 'Registro realizado con exito, seras redirigido en unos segundos'
                                });

                                setTimeout(function(){ 
                                    ok = true;
                                    return ok;
                                }, 3000);
                            }
                        }
                    );
                }
            }
        )
    }
}
