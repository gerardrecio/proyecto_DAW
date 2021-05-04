<?php

    //archivo de configuracion
    $ini = parse_ini_file('config.ini');

    //valores por POST
    $usuario = $_POST['email'];

    //cadena de conexion
    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);
    
    //query
    $query = "SELECT * FROM usuarios WHERE Email = '$usuario'";

    //ejecucion de la query
    if ($res = mysqli_query($enlace, $query)){

        $rowcount = mysqli_num_rows($res);
        
        if ($rowcount >= 1){

            echo 0;
        }
        else
        {
            echo 1;
        }
    }

    mysqli_close($enlace);

?>