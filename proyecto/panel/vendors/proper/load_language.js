function desaparecer_alerta(){
      //para hacer desaparecer la alerta
      window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(".xalerta").addClass("d-none");
        });

        $(".alert").fadeTo(500, 1).slideDown(500);
        
      }, 2000);
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

      copiar_portapapeles($(this).parent()[0].innerText);

    });

    $(".xtbody").on("click", ".xvisibilidad", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Visibilidad</strong> cambiada correctamente", "alert-success");

      //aqui hara el cambio de boton

      let valor = $(this).parent().parent().children()[0].innerText;

      if ($(this).parent().parent().children()[1].outerHTML.includes("fa fa-eye-slash"))
      {
        $(this).parent().parent().children()[1].innerHTML = "<i class='fa fa-eye' data-toggle='tooltip' data-placement='top' title='Publico'></i>";
        $(this).parent().parent().children()[3].innerHTML = "No tiene clave actualmente";

        //el generar clave tiene que pasar a bloqueado

        $(this).parent().parent().children().find('.xclave')[0].outerHTML = "<button type='button' style='color: White;' class='btn bg-flat-color-3 mr-3 rounded xclave' data-toggle='tooltip' data-placement='top' title='Generar clave' disabled><i class='fa fa-key'></i></button>";

        $.post("../php/cambiar_visibilidad.php", {archivo: valor, id_user: $("#idx").text(), visibilidad: 1});
        $.post("../php/insertar_clave.php", {archivo: valor, id_user: $("#idx").text(), key: ""});

      }
      else
      {
        $(this).parent().parent().children()[1].innerHTML = "<i class='fa fa-eye-slash' data-toggle='tooltip' data-placement='top' title='Privado'></i>";

        let test = encrypt();

        $(this).parent().parent().children()[3].innerHTML = test+"<button type='button' style='color: White;' class='btn bg-secondary ml-2 rounded xcopiar' data-toggle='tooltip' data-placement='top' title='Copiar Clave'><i class='fa fa-copy'></i></button>";
      
        $(this).parent().parent().children().find('.xclave')[0].outerHTML = "<button type='button' style='color: White;' class='btn bg-flat-color-3 mr-3 rounded xclave' data-toggle='tooltip' data-placement='top' title='Generar clave'><i class='fa fa-key'></i></button>";

        $.post("../php/cambiar_visibilidad.php", {archivo: valor, id_user: $("#idx").text(), visibilidad: 0});
        $.post("../php/insertar_clave.php", {archivo: valor, id_user: $("#idx").text(), key: test});

      }

      enable_tooltips();

    });

    $(".xtbody").on("click", ".xclave", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Clave</strong> generada correctamente", "alert-warning");

      let test = encrypt();

      $.post("../php/cambiar_claves.php", {nombre: $(this).parent().parent().children()[0].innerText, clave_antigua: $(this).parent().parent().children()[3].innerText, clave_nueva: test});

      $(this).parent().parent().children()[3].innerHTML = test+"<button type='button' style='color: White;' class='btn bg-secondary ml-2 rounded xcopiar' data-toggle='tooltip' data-placement='top' title='Copiar Clave'><i class='fa fa-copy'></i></button>";
      
      enable_tooltips();

    });

    $(".xtbody").on("click", ".xbloqueo", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Archivo</strong> bloqueado correctamente", "alert-danger");

      //cambiamos el boton de descargar
      $(this).parent().parent().children().find('.xdescarga')[0].outerHTML = "<button type='button' style='color: White;' class='btn bg-flat-color-1 rounded xdescarga' data-toggle='tooltip' data-placement='top' title='Descargar' disabled><i class='fa fa-external-link'></i></button>";

      let valor = $(this).parent().parent().children()[0].innerText;

      $(this).parent().parent().children()[2].innerHTML = "<i class='fa fa-lock' data-toggle='tooltip' data-placement='top' title='Bloqueado'></i>";

      let outer = $(this).parent().parent().children()[4].outerHTML;

      let test = outer.replace("xbloqueo", "xdesbloqueo");
      
      let prueba = test.replace("Bloquear", "Desbloquear");

      let xp = prueba.replace("fa-lock", "fa-unlock");

      $(this).parent().parent().children()[4].innerHTML = xp;
      
      enable_tooltips();

      $.post("../php/cambiar_estado.php", {archivo: valor, id_user: $("#idx").text(), status: 1});

    });

    //para desbloquear el archivo
    $(".xtbody").on("click", ".xdesbloqueo", function(data){

      alerta_dinamica("alert-warning alert-danger alert-success alert-secondary", "<strong>Archivo</strong> desbloqueado correctamente", "alert-danger");

      $(this).parent().parent().children().find('.xdescarga')[0].outerHTML = "<button type='button' style='color: White;' class='btn bg-flat-color-1 rounded xdescarga' data-toggle='tooltip' data-placement='top' title='Descargar'><i class='fa fa-external-link'></i></button>";

      let valor = $(this).parent().parent().children()[0].innerText;

      $(this).parent().parent().children()[2].innerHTML = "<i class='fa fa-unlock' data-toggle='tooltip' data-placement='top' title='Desbloqueado'></i>";

      let outer = $(this).parent().parent().children()[4].outerHTML;

      let test = outer.replace("xdesbloqueo", "xbloqueo");
      
      let prueba = test.replace("Desbloquear", "Bloquear");

      let xp = prueba.replace("fa-unlock", "fa-lock");

      $(this).parent().parent().children()[4].innerHTML = xp;

      enable_tooltips();

      //cambiara los datos en la base de datos
      $.post("../php/cambiar_estado.php", {archivo: valor, id_user: $("#idx").text(), status: 0});

    });

    //CARGAR LA TABLA PRINCIPAL

    $.post("../php/cargar_tabla.php", {usuario: $("#idx").text().trim()}, function(data){
      var parsed = JSON.parse(data);

      let tipo = ["<i class='fa fa-eye-slash' data-toggle='tooltip' data-placement='top' title='Privado'></i>", "<i class='fa fa-eye' data-toggle='tooltip' data-placement='top' title='Publico'></i>"];
      let estado = ["<i class='fa fa-unlock' data-toggle='tooltip' data-placement='top' title='Desbloqueado'></i>", "<i class='fa fa-lock' data-toggle='tooltip' data-placement='top' title='Bloqueado'></i>"];
      let xclave = "";

      for (let i = 0; i < parsed.length; i++){

        let prueba = [
                      { estado: "enabled", linea: "<button type='button' style='color: White;' class='btn bg-flat-color-4 mr-3 rounded xbloqueo' data-toggle='tooltip' data-placement='top' title='Bloquear'><i class='fa fa-lock'></i></button>"}, 
                      { estado: "disabled", linea: "<button type='button' style='color: White;' class='btn bg-flat-color-4 mr-3 rounded xdesbloqueo' data-toggle='tooltip' data-placement='top' title='Desbloquear'><i class='fa fa-unlock'></i></button>"}
                     ];

        //estado de las claves
        if (parsed[i].clave == ""){
          xclave = "No tiene clave actualmente";
          xgenerado = "disabled";
        }
        else
        {
          xclave = parsed[i].clave;
          xclave+= "<button type='button' style='color: White;' class='btn bg-secondary ml-2 rounded xcopiar' data-toggle='tooltip' data-placement='top' title='Copiar Clave'><i class='fa fa-copy'></i></button>";
          xgenerado = "enabled";
        }


        $(".xtbody").append(
          "<tr>"+

            "<td class='text-center'>"+parsed[i].nombre+"</td>"+
            "<td class='text-center'>"+tipo[parsed[i].tipo]+"</td>"+
            "<td class='text-center'>"+estado[parsed[i].estado]+"</td>"+
            "<td class='text-center'>"+xclave+"</td>"+
            
            "<td class='text-center'>"+
                "<button type='button' style='color: White;' class='btn bg-flat-color-5 mr-3 rounded xvisibilidad' data-toggle='tooltip' data-placement='top' title='Cambiar visibilidad'><i class='fa fa-exchange'></i></button>"+
                "<button type='button' style='color: White;' class='btn bg-flat-color-3 mr-3 rounded xclave' data-toggle='tooltip' data-placement='top' title='Generar clave' "+xgenerado+"><i class='fa fa-key'></i></button>"+prueba[parsed[i].estado].linea+
                "<button type='button' style='color: White;' class='btn bg-flat-color-1 rounded xdescarga' data-toggle='tooltip' data-placement='top' title='Descargar' "+prueba[parsed[i].estado].estado+"><i class='fa fa-external-link'></i></button>"+
            "</td>"+

          "</tr>"
        );
      }

      enable_tooltips();

    });
});