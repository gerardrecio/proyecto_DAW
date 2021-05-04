<?php

    $xemail = $_POST['email'];
    $xage = $_POST['age'];
    $xnombre = $_POST['nombre'];
    $xnacimiento = $_POST['nacimiento'];
    $xprimerape = $_POST['primerape'];
    $xsegundoape = $_POST['segundoape'];
    $xpassword = $_POST['password'];
    $xsexo = $_POST['sexo'];

    $ini = parse_ini_file('config.ini');

    $enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

    $pwd = password_hash($xpassword, PASSWORD_BCRYPT);

    $query = "INSERT INTO usuarios (Email, Password, Nombre, Primer_Apellido, Segundo_Apellido, Sexo, Edad, Fecha_Nacimiento) VALUES ('$xemail', '$pwd', '$xnombre', '$xprimerape', '$xsegundoape', '$xsexo', '$xage', '$xnacimiento')";

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