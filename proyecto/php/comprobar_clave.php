<?php

    //archivo de configuracion
    $ini = parse_ini_file('config.ini');

    //valores por POST
    $key = $_POST['clave'];
    $archivo = $_POST['archivo'];
    $xid = $_POST['id_user'];

    //cadena de conexion
    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);
    
    //query
    $query = "SELECT * FROM archivos INNER JOIN usuarios_archivos ON ID = ID_Archivos WHERE Nombre = '$archivo' AND ID_Usuarios = '$xid'";

    $res = mysqli_query($enlace, $query);

    $prueba = mysqli_fetch_assoc($res);

    if ($prueba["Clave"] == $key){

        echo 0;
    }
    else
    {
        echo 1;
    }

    mysqli_close($enlace);

?>