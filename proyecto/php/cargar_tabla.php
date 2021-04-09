<?php

    $xuser = $_POST['usuario'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "SELECT ID, Nombre, Clave, Tipo, Estado FROM archivos INNER JOIN usuarios_archivos ON archivos.ID = usuarios_archivos.ID_Archivos WHERE usuarios_archivos.ID_Usuarios = '$xuser'";

    $res = mysqli_query($enlace, $query);

    $myArr = array();

    while ($row = mysqli_fetch_assoc($res)) 
    {
        array_push($myArr, array('id' => $row["ID"], 'nombre' => $row["Nombre"], 'clave' => $row["Clave"], 'tipo' => $row["Tipo"], 'estado' => $row["Estado"]));
    }

    echo json_encode($myArr);

?>