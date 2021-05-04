$(document).ready(function() {
//CARGAR LA TABLA PRINCIPAL

    function load_table(){
      $.post("../php/cargar_logs.php", {usuario: $("#idx").text().trim()}, function(data){

        let parsed = JSON.parse(data);

        let username = $("#nombre").text();

        for (i = 0; i < parsed.length; i++)
        {

          $(".xtbody").append(
            "<tr>"+

              "<td class='text-center'>"+parsed[i].id+"</td>"+
              "<td class='text-center'>"+username+" ["+parsed[i].user+"]</td>"+
              "<td class='text-center'>"+parsed[i].accion+"</td>"+
              "<td class='text-center'>"+parsed[i].fecha.split(" ")[1]+"</td>"+
              "<td class='text-center'>"+parsed[i].fecha.split(" ")[0].split("-")[2]+"/"+parsed[i].fecha.split(" ")[0].split("-")[1]+"/"+parsed[i].fecha.split(" ")[0].split("-")[0]+"</td>"+

            "</tr>"
          );

        }
      });
    };

    load_table(); //cargamos la tabla 
});