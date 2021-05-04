<?php

    $xp_old = $_POST['xold'];
    $xid = $_POST['id_user'];
    $xp_new = $_POST['xnew'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $new = password_hash($xp_new, PASSWORD_BCRYPT);

    $query = "SELECT Password FROM usuarios WHERE ID = '$xid'";

    $res = mysqli_query($enlace, $query);

    $row = mysqli_fetch_assoc($res);

    if (password_verify($xp_old, $row["Password"])){
     
        $query = "UPDATE usuarios SET Password = '$new' WHERE ID = '$xid'";

        $res = mysqli_query($enlace, $query);
        
        echo 0;
    }
    else
    {
        echo 1;
    }

    mysqli_close($enlace);

?>