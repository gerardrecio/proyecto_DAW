<?php

    //archivo de configuracion
    $ini = parse_ini_file('config.ini');

    //valores por POST
    $usuario = $_POST['user'];
    $password = $_POST['password'];

    //echo password_hash("rasmuslerdorf", PASSWORD_BCRYPT);

    //cadena de conexion
    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);
    
    //query
    $query = "SELECT * FROM usuarios WHERE Email = '$usuario'";

    //ejecucion de la query
    if ($res = mysqli_query($enlace, $query)){

        $row = mysqli_fetch_assoc($res);

        if (password_verify($password, $row["Password"])){

            echo 0;
        }
        else
        {
            echo 1;
        }
    }
    else
    {
        echo 1;
    }

    mysqli_close($enlace);

?>