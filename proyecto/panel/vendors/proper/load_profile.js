$(document).ready(function() {

  //aqui hara la carga de datos del usuario

  $.post("../php/cargar_user.php", {id_user: $("#idx").text()}, function(data){

    var parsed = JSON.parse(data);

    console.log(parsed);

    //aqui cargamos todos los datos de el usuario
    $("#inputUser").attr("placeholder", parsed[0].email);
    $("#inputNombre").attr("placeholder", parsed[0].nombre);
    $("#inputApellido").attr("placeholder", parsed[0].primerape);
    $("#inputNacimiento").val(parsed[0].fecha);
  });
    
    $(".xborrado").on("click", function(data){

      Swal.fire({
        title: 'Borrado de archivos',
        text: "Estas seguro de que quieres borrar todos los archivos, esta accion es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Borrado de archivos',
            text: 'Archivos borrados con exito',
            icon: 'success'
          });

          $.post("../php/borrar_archivos.php", {id_user: $("#idx").text()});

          $(".xprivado").text(0);
          $(".xpublico").text(0);
          $(".xtotal").text(0);
        }
      });
    });

    $(".xreinicializado").on("click", function(data){

      Swal.fire({
        title: 'Reinicialización de Claves',
        text: "Estas seguro de que quieres reinicializar todas las claves de tus archivos privados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Reinicialización de Claves',
            text: 'Claves reinicializadas con exito',
            icon: 'success'
          });

          $.post("../php/reinicializar_archivos.php", {id_user: $("#idx").text()});
        }
      });
    });


    $(".xpassword").on("click", function(data){

      let password_old = $("#inputPassword").val().trim();
      let password_new = $("#inputPasswordx").val().trim();
      let xuser = $("#idx").text();

      if (password_old != "" && password_new != ""){
        
        $.post("../php/modificar_password.php", {id_user: xuser, xold: password_old, xnew: password_new}, function(data){

          console.log(data);

          if (data == 0){

            Swal.fire({
              icon: 'success',
              title: 'Modificar Perfil',
              text: 'Contraseña cambiada correctamente'
            });
          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'Modificar Perfil',
              text: 'La contraseña actual no es correcta'
            });
          }
        });
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Modificar Perfil',
          text: 'Faltan campos por rellenar'
        });
      }

    });
});