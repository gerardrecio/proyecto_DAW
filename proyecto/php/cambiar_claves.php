<?php

    $xnombre = $_POST['nombre'];
    $xclave_antigua = $_POST['clave_antigua'];
    $xclave_nueva = $_POST['clave_nueva'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "UPDATE archivos SET Clave = '$xclave_nueva' WHERE Clave = '$xclave_antigua' AND Nombre = '$xnombre'";

    $res = mysqli_query($enlace, $query);

?>