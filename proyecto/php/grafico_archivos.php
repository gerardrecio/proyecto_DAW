<?php

    $xid = $_POST['id_user'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $query = "SELECT COUNT(*) AS 'Mensual', MONTH(Fecha) AS 'Mes' FROM archivos INNER JOIN usuarios_archivos ON archivos.ID = usuarios_archivos.ID_Archivos WHERE ID_Usuarios = '$xid' GROUP BY MONTH(Fecha) ORDER BY MONTH(Fecha)";

    $res = mysqli_query($enlace, $query);

    $myArr = ['0' => 0, '1' => 0, '2' => 0, '3' => 0, '4' => 0, '5' => 0, '6' => 0, '7' => 0, '8' => 0, '9' => 0, '10' => 0, '11' => 0];

    while ($row = mysqli_fetch_assoc($res)) 
    {
        $myArr[$row["Mes"]-1] = intval($row["Mensual"]);
    }

    echo json_encode($myArr);

    mysqli_close($enlace);

?>