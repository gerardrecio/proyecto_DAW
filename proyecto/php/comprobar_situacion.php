<?php

    $xuser = $_POST['id_user']; //id del usuario
    $xfile = $_POST['archivo']; //nombre del archivo

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "SELECT * FROM archivos INNER JOIN usuarios_archivos ON ID = ID_Archivos WHERE Nombre = '$xfile' AND ID_Usuarios = '$xuser'";
    
    $res = mysqli_query($enlace, $query);

    $prueba = mysqli_fetch_assoc($res);

    if ($prueba["Estado"] == 0){

        echo 0;
    }
    else
    {
        echo 1;
    }

    mysqli_close($enlace);

?>