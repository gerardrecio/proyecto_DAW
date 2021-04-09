<?php

//para obtener los archivos de el usuario totales
    function get_files_user($xuser){

        $ini = parse_ini_file('config.ini');

        $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

        $query = "SELECT COUNT(*) AS 'contador' FROM usuarios_archivos WHERE ID_Usuarios = '$xuser'";

        $res = mysqli_query($enlace, $query);

        $row = mysqli_fetch_array($res);

        extract($row);

        echo $contador;   
    }

    function get_id($xemail){

        $ini = parse_ini_file('config.ini');

        $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

        $query = "SELECT ID FROM usuarios WHERE Email = '$xemail'";

        $res = mysqli_query($enlace, $query);

        $row = mysqli_fetch_array($res);

        extract($row);

        return $ID;
    }

    function get_echo_id($xemail){

        $ini = parse_ini_file('config.ini');

        $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

        $query = "SELECT ID FROM usuarios WHERE Email = '$xemail'";

        $res = mysqli_query($enlace, $query);

        $row = mysqli_fetch_array($res);

        extract($row);

        echo $ID;
    }



    function get_sex($xemail){

        $ini = parse_ini_file('config.ini');

        $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

        $query = "SELECT Sexo FROM usuarios WHERE Email = '$xemail'";

        $res = mysqli_query($enlace, $query);

        $row = mysqli_fetch_array($res);

        extract($row);

        if ($Sexo == 0){
            echo "Bienvenido";
        }
        else
        {
            echo "Bienvenida";
        }
    }

//para obtener el nombre y el primer apellido de el usuario
    function get_username($xemail){

        $ini = parse_ini_file('config.ini');

        $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

        $query = "SELECT Nombre, Primer_Apellido FROM usuarios WHERE Email = '$xemail'";

        $res = mysqli_query($enlace, $query);

        $row = mysqli_fetch_array($res);

        extract($row);
        
        echo $Nombre." ".$Primer_Apellido;
    }

//para obtener los archivos de el usuario privados

    function get_files_private($xuser){

        $ini = parse_ini_file('config.ini');

        $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

        $query = "SELECT COUNT(*) AS 'contador' FROM archivos INNER JOIN usuarios_archivos ON archivos.ID = usuarios_archivos.ID_Archivos WHERE usuarios_archivos.ID_Usuarios = '$xuser' AND Tipo = '0'";

        $res = mysqli_query($enlace, $query);

        $row = mysqli_fetch_array($res);

        extract($row);

        echo $contador;   
    }

    function get_files_public($xuser){

        $ini = parse_ini_file('config.ini');

        $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

        $query = "SELECT COUNT(*) AS 'contador' FROM archivos INNER JOIN usuarios_archivos ON archivos.ID = usuarios_archivos.ID_Archivos WHERE usuarios_archivos.ID_Usuarios = '$xuser' AND Tipo = '1'";

        $res = mysqli_query($enlace, $query);

        $row = mysqli_fetch_array($res);

        extract($row);

        echo $contador;   
    }
?>