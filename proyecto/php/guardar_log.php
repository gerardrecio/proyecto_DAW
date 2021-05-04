<?php

    $xtexto = $_POST['text'];
    $xid = $_POST['user'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "INSERT INTO logs (ID, Usuario, Accion, Fecha) VALUES (null, '$xid', '$xtexto', NOW())";

    $res = mysqli_query($enlace, $query);

    mysqli_close($enlace);

?>