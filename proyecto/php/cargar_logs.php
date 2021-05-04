<?php

    $xuser = $_POST['usuario'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "SELECT * FROM logs WHERE Usuario = '$xuser' ORDER BY Fecha";

    $res = mysqli_query($enlace, $query);

    $myArr = array();

    while ($row = mysqli_fetch_assoc($res)) 
    {
        array_push($myArr, array('id' => $row["ID"], 'user' => $row["Usuario"], 'fecha' => $row["Fecha"], 'accion' => $row["Accion"]));
    }

    echo json_encode($myArr);

    mysqli_close($enlace);

?>