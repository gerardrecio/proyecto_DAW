function desaparecer_alerta(){
      //para hacer desaparecer la alerta
      window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(".xalerta").addClass("d-none");
        });

        $(".alert").fadeTo(500, 1).slideDown(500);
        
      }, 2000);
}

//esta funcion es para guardar logs
function guardar_logs(xuser, texto){

  $.post("../php/guardar_log.php", {user: xuser, text: texto});

}

//para crear la palabra aleatoria para usar en el HASH en SHA256
function makeid(length) {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
 }
 return result.join('');
}

//esta funcion copia texto al portapapeles
function copiar_portapapeles(xtext){

  var aux = document.createElement("input");
  aux.setAttribute("value", xtext);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}

//esta funcion sirve para hacer las alertas dinamicas sin usar tantas veces el mismo codigo
function alerta_dinamica(xborrado, xtexto, xclasebuena){

  $(".xalerta").html(xtexto).removeClass(xborrado).addClass(xclasebuena).removeClass("d-none");;

  desaparecer_alerta();
}

//encripta a nivel de cliente el hash
function encrypt(){

  let word = makeid(15);

  let hash = CryptoJS.SHA256(word);

  return hash.toString(CryptoJS.enc.Hex);
}

//resetea los tooltips en proper.js
function enable_tooltips(){

  $(".tooltip").remove();

  $('[data-toggle="tooltip"]').tooltip(); //para refrescar el tooltip generado
}


$(document).ready(function() {
    
    enable_tooltips();

    $(".xtbody").on("click", ".xcopiar", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Clave</strong> copiada correctamente", "alert-secondary");

      copiar_portapapeles($(this).parent().parent().children()[0].innerHTML);

      let valor = $(this).parent().parent().parent().children()[1].innerText;

      guardar_logs($("#idx").text(), "Clave de seguridad copiada ["+valor+"]");


    });

    $(".xtbody").on("click", ".xvisibilidad", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Visibilidad</strong> cambiada correctamente", "alert-success");

      //aqui hara el cambio de boton

      let valor = $(this).parent().parent().children()[1].innerText;

      if ($(this).parent().parent().children()[3].outerHTML.includes("fa fa-eye-slash"))
      {
        $(this).parent().parent().children()[3].innerHTML = "<i class='fa fa-eye' data-toggle='tooltip' data-placement='top' title='Publico'></i>";
        $(this).parent().parent().children().find('.xcopr')[0].innerHTML = "No tiene clave actualmente";

        //el generar clave tiene que pasar a bloqueado

        $(this).parent().parent().children().find('.xclave')[0].outerHTML = "<button type='button' style='color: White;' class='btn bg-flat-color-3 mr-3 rounded xclave' data-toggle='tooltip' data-placement='top' title='Generar clave' disabled><i class='fa fa-key'></i></button>";

        $.post("../php/cambiar_visibilidad.php", {archivo: valor, id_user: $("#idx").text(), visibilidad: 1});
        $.post("../php/insertar_clave.php", {archivo: valor, id_user: $("#idx").text(), key: ""});

        //actualizamos el contador de arriba

        let valor_privado = parseInt($(".xprivado").text())-1;
        let valor_publico = parseInt($(".xpublico").text())+1;

        $(".xprivado").text(valor_privado);
        $(".xpublico").text(valor_publico);

        guardar_logs($("#idx").text(), "Visibilidad cambiada a PUBLICO en archivo ["+valor+"]");

      }
      else
      {
        $(this).parent().parent().children()[3].innerHTML = "<i class='fa fa-eye-slash' data-toggle='tooltip' data-placement='top' title='Privado'></i>";

        let test = encrypt();

        $(this).parent().parent().children().find('.xcopiada')[0].innerHTML = test; //la clave se guarda oculta
        $(this).parent().parent().children().find('.xcopr')[0].innerHTML = "Clave oculta por seguridad<button type='button' style='color: White;' class='btn bg-secondary ml-2 rounded xcopiar' data-toggle='tooltip' data-placement='top' title='Copiar Clave'><i class='fa fa-copy'></i></button>";
      
        $(this).parent().parent().children().find('.xclave')[0].outerHTML = "<button type='button' style='color: White;' class='btn bg-flat-color-3 mr-3 rounded xclave' data-toggle='tooltip' data-placement='top' title='Generar clave'><i class='fa fa-key'></i></button>";

        $.post("../php/cambiar_visibilidad.php", {archivo: valor, id_user: $("#idx").text(), visibilidad: 0});
        $.post("../php/insertar_clave.php", {archivo: valor, id_user: $("#idx").text(), key: test});

        let valor_privado = parseInt($(".xprivado").text())+1;
        let valor_publico = parseInt($(".xpublico").text())-1;

        $(".xprivado").text(valor_privado);
        $(".xpublico").text(valor_publico);

        guardar_logs($("#idx").text(), "Visibilidad cambiada a PRIVADO en archivo ["+valor+"]");

      }

      enable_tooltips();

    });

    $(".xtbody").on("click", ".xclave", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Clave</strong> generada correctamente", "alert-warning");

      let test = encrypt();

      $.post("../php/cambiar_claves.php", {nombre: $(this).parent().parent().children()[1].innerText, clave_antigua: $(this).parent().parent().children().find('.xcopiada')[0].innerHTML, clave_nueva: test});

      $(this).parent().parent().children().find('.xcopiada')[0].innerHTML = test;
      
      enable_tooltips();

      let valor = $(this).parent().parent().children()[1].innerText;

      guardar_logs($("#idx").text(), "Clave generada en archivo ["+valor+"]");

    });

    $(".xtbody").on("click", ".xbloqueo", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Archivo</strong> bloqueado correctamente", "alert-danger");

      //cambiamos el boton de descargar
      $(this).parent().parent().children().find('.xdescarga')[0].outerHTML = "<button type='button' style='color: White;' class='btn bg-flat-color-1 rounded xdescarga' data-toggle='tooltip' data-placement='top' title='Descargar' disabled><i class='fa fa-external-link'></i></button>";

      let valor = $(this).parent().parent().children()[1].innerText;

      $(this).parent().parent().children()[4].innerHTML = "<i class='fa fa-lock' data-toggle='tooltip' data-placement='top' title='Bloqueado'></i>";

      let outer = $(this).parent().parent().children()[6].outerHTML;

      let test = outer.replace("xbloqueo", "xdesbloqueo");
      
      let prueba = test.replace("Bloquear", "Desbloquear");

      let xp = prueba.replace("fa-lock", "fa-unlock");

      $(this).parent().parent().children()[6].innerHTML = xp;
      
      enable_tooltips();

      $.post("../php/cambiar_estado.php", {archivo: valor, id_user: $("#idx").text(), status: 1});

      guardar_logs($("#idx").text(), "Archivo bloqueado ["+valor+"]");

    });

    //para desbloquear el archivo
    $(".xtbody").on("click", ".xdesbloqueo", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Archivo</strong> desbloqueado correctamente", "alert-danger");

      $(this).parent().parent().children().find('.xdescarga')[0].outerHTML = "<button type='button' style='color: White;' class='btn bg-flat-color-1 rounded xdescarga' data-toggle='tooltip' data-placement='top' title='Descargar'><i class='fa fa-external-link'></i></button>";

      let valor = $(this).parent().parent().children()[1].innerText;

      $(this).parent().parent().children()[4].innerHTML = "<i class='fa fa-unlock' data-toggle='tooltip' data-placement='top' title='Desbloqueado'></i>";

      let outer = $(this).parent().parent().children()[6].outerHTML;

      let test = outer.replace("xdesbloqueo", "xbloqueo");
      
      let prueba = test.replace("Desbloquear", "Bloquear");

      let xp = prueba.replace("fa-unlock", "fa-lock");

      $(this).parent().parent().children()[6].innerHTML = xp;

      enable_tooltips();

      //cambiara los datos en la base de datos
      $.post("../php/cambiar_estado.php", {archivo: valor, id_user: $("#idx").text(), status: 0});

      guardar_logs($("#idx").text(), "Archivo desbloqueado ["+valor+"]");

    });

    //cuando pulsamos un checkbox

    $(".xtbody").on("click", "#checkbox", function(){
      let countchecked = $(".xtbody input[type=checkbox]:checked").length;

      if (countchecked > 0)
      {
        $(".xeliminar").removeClass("d-none");
      }
      else
      {
        $(".xeliminar").addClass("d-none");
      }
    });


    //boton para eliminar los seleccionados

    $(".xeliminar").on("click", function(){

      //let countchecked = $(".xtbody input[type=checkbox]:checked").length;

      let alltd = $(".xtbody input[type=checkbox]:checked").parent().parent().parent().children();

      Swal.fire({
        icon: 'success',
        title: 'Eliminar Archivos',
        text: 'Archivos seleccionados eliminados exitosamente'
      });

      //bucle para sacar los nombres de todos los archivos, solo selecciona los que tienen check, los demas no
      for (i = 1; i < alltd.length; i++){
        if (i % 6){
          
          let name = alltd[i].innerText;
          //aqui se debera borrar el archivo de la base de datos y refrescar
          $.post("../php/borrar_seleccionado.php", {archivo: name, id_user: $("#idx").text()});

          guardar_logs($("#idx").text(), "Archivo eliminado ["+name+"]");
          //sumamos 5 al contador para ir al siguiente nombre
          i = i+5;
        }
      }

      $(".xeliminar").addClass("d-none");

      $(".xtbody").children().remove();

      //para arreglar el bug de el load_table
      setTimeout(function(){ load_table(); }, 100);

    });

    //boton de descarga
    $(".xtbody").on("click", ".xdescarga", function(){

      let valor = $(this).parent().parent().children()[1].innerText;  //nombre del archivo a descargar
      let user = $("#nombre").text(); //nombre de el usuario propietario
      let clave = $(this).parent().parent().children().find(".xcopiada")[0].innerText;  //la clave de el archivo [Si es que tiene]
      let peso = $(this).parent().parent().children()[2].innerText;

      Swal.fire({
        title: 'Descargar Archivo',
        icon: "question",
        showDenyButton: true,
        text: 'Como deseas ir al panel de descarga ?',
        confirmButtonText: 'Con Clave',
        denyButtonText: 'Sin Clave',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href = "../download.php?archivo="+valor+"&usuario="+user+"&clave="+clave+"&peso="+peso+"&id="+$("#idx").text()+"";
        } else if (result.isDenied) {
            window.location.href = "../download.php?archivo="+valor+"&usuario="+user+"&clave=&peso="+peso+"&id="+$("#idx").text()+"";
        }
      })

    });

    function conversion(xval){

      let string = ["KB", "MB", "GB"]; //para pasar de un valor a otro siempre dividimos entre 1000

      //1 gb = 1000000 KB
      //1 MB = 1000 KB

      let ok = "";

      if (xval.length == 7 || xval.length == 8 || xval.length == 9){
        //ESTO SON GIGAS
        let operacion = xval / 1000;
        let oper = operacion / 1000;
        ok = oper+" "+string[2];
      }

      if (xval.length == 4 || xval.length == 5 || xval.length == 6){

        let operacion = xval / 1000;
        ok = operacion+" "+string[1];
      }

      if (xval.length == 1 || xval.length == 2 || xval.length == 3){

        ok = xval+" "+string[0];
      }

      return ok;

    }

    //CARGAR LA TABLA PRINCIPAL

    function load_table(){
      $.post("../php/cargar_tabla.php", {usuario: $("#idx").text().trim()}, function(data){
        var parsed = JSON.parse(data);
  
        let tipo = ["<i class='fa fa-eye-slash' data-toggle='tooltip' data-placement='top' title='Privado'></i>", "<i class='fa fa-eye' data-toggle='tooltip' data-placement='top' title='Publico'></i>"];
        let estado = ["<i class='fa fa-unlock' data-toggle='tooltip' data-placement='top' title='Desbloqueado'></i>", "<i class='fa fa-lock' data-toggle='tooltip' data-placement='top' title='Bloqueado'></i>"];
        let xclave = "";
  
        if (parsed.length == 0){
          $(".xtbody").append("<tr><td colspan='7' class='text-center'>No hay archivos subidos</td></tr>");
        }
        else
        {
          for (let i = 0; i < parsed.length; i++){
  
            let prueba = [
                          { estado: "enabled", linea: "<button type='button' style='color: White;' class='btn bg-flat-color-4 mr-3 rounded xbloqueo' data-toggle='tooltip' data-placement='top' title='Bloquear'><i class='fa fa-lock'></i></button>"}, 
                          { estado: "disabled", linea: "<button type='button' style='color: White;' class='btn bg-flat-color-4 mr-3 rounded xdesbloqueo' data-toggle='tooltip' data-placement='top' title='Desbloquear'><i class='fa fa-unlock'></i></button>"}
                         ];
    
            //estado de las claves
            if (parsed[i].clave == ""){
              xclav = "";
              xgenerado = "disabled";
              xclave = "No tiene clave actualmente";
            }
            else
            {
              xclav = parsed[i].clave;
              xclave= "Clave oculta por seguridad<button type='button' style='color: White;' class='btn bg-secondary ml-2 rounded xcopiar' data-toggle='tooltip' data-placement='top' title='Copiar Clave'><i class='fa fa-copy'></i></button>";
              xgenerado = "enabled";
            }

            let convertido = conversion(parsed[i].peso);
    
            $(".xtbody").append(
              "<tr>"+
    
                "<td class='text-center'><div class='form-check'><input class='form-check-input' type='checkbox' value='' id='checkbox'></div></td>"+
                "<td class='text-center'>"+parsed[i].nombre+"</td>"+
                "<td class='text-center'>"+convertido+"</td>"+
                "<td class='text-center'>"+tipo[parsed[i].tipo]+"</td>"+
                "<td class='text-center'>"+estado[parsed[i].estado]+"</td>"+
                "<td class='text-center'><span class='d-none xcopiada'>"+xclav+"</span><span class='xcopr'>"+xclave+"</span></td>"+
                
                "<td class='text-center'>"+
                    "<button type='button' style='color: White;' class='btn bg-flat-color-5 mr-3 rounded xvisibilidad' data-toggle='tooltip' data-placement='top' title='Cambiar visibilidad'><i class='fa fa-exchange'></i></button>"+
                    "<button type='button' style='color: White;' class='btn bg-flat-color-3 mr-3 rounded xclave' data-toggle='tooltip' data-placement='top' title='Generar clave' "+xgenerado+"><i class='fa fa-key'></i></button>"+prueba[parsed[i].estado].linea+
                    "<button type='button' style='color: White;' class='btn bg-flat-color-1 rounded xdescarga' data-toggle='tooltip' data-placement='top' title='Descargar' "+prueba[parsed[i].estado].estado+"><i class='fa fa-external-link'></i></button>"+
                "</td>"+
    
              "</tr>"
            );
          }
    
          enable_tooltips();
        }
      });
    };

    load_table(); //cargamos la tabla 
});