<?php
    header('Location: ../index.php');

    session_start();    //iniciamos la sesion

    session_unset();    //borramos todos los datos de la sesion
    session_destroy();  //destruimos la sesion
?>