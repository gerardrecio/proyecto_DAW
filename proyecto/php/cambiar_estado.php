<?php

    $xnombre = $_POST['archivo'];
    $xid = $_POST['id_user'];
    $xstatus = $_POST['status'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "UPDATE archivos INNER JOIN usuarios_archivos ON usuarios_archivos.ID_Archivos = archivos.ID SET Estado = '$xstatus' WHERE Nombre = '$xnombre' AND usuarios_archivos.ID_Usuarios = '$xid'";

    $res = mysqli_query($enlace, $query);

    mysqli_close($enlace);

?>