<?php
    $xid = $_POST['id_user'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "UPDATE archivos INNER JOIN usuarios_archivos ON archivos.ID = usuarios_archivos.ID_Archivos SET Clave = '82d1ed38bc3df0e52901f04eeb8f9dc40109e4514d33d5cfe71fb503ac4cf61e' WHERE usuarios_archivos.ID_Usuarios = '$xid'";

    $res = mysqli_query($enlace, $query);

    mysqli_close($enlace);

?>