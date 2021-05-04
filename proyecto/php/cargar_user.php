<?php

    $xuser = $_POST['id_user'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "SELECT * FROM usuarios WHERE ID = '$xuser'";

    $res = mysqli_query($enlace, $query);

    $myArr = array();

    while ($row = mysqli_fetch_assoc($res)) 
    {
        array_push($myArr, array('email' => $row["Email"], 'password' => $row["Password"], 'nombre' => $row["Nombre"], 'primerape' => $row["Primer_Apellido"],
                    'segundoape' => $row["Segundo_Apellido"], 'sexo' => intval($row["Sexo"]), 'edad' => intval($row["Edad"]), 'fecha' => $row["Fecha_Nacimiento"]));
    }

    echo json_encode($myArr);

    mysqli_close($enlace);

?>