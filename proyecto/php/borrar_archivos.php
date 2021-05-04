<?php
    $xid = $_POST['id_user'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "DELETE archivos, usuarios_archivos FROM archivos INNER JOIN usuarios_archivos ON archivos.ID = usuarios_archivos.ID_Archivos WHERE usuarios_archivos.ID_Usuarios = '$xid'";

    $res = mysqli_query($enlace, $query);

    mysqli_close($enlace);

?>