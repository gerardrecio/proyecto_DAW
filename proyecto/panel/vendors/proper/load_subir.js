$(document).ready(function() {

    $("#fichero_id").val($("#idx").text());

    $("#subida").on("click", ".xsubir", function(){

        if ($('.fichero').get(0).files.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Subida de Archivos',
                text: 'No hay ningun archivo seleccionado para subir'
              });
        }
        else
        {
            $("#subida").submit();
            //una vez hace el submit tiene que salir el mensaje de que se ha subido un archivo
    
            Swal.fire({
                icon: 'success',
                title: 'Subida de Archivos',
                text: 'Si el archivo no esta repetido, se subira al sistema, puedes obtener mas detalles en el apartado Panel de Control'
              });

              //para reinicializar el archivo
              $(".fichero").val("");
        }
      });
});