<?php
    session_start();

    $_SESSION['email'] = $_POST['user'];

    if ($_SESSION['email'] == ""){
        header('Location: ../index.php');
    }
    else
    {
        header('Location: ../panel/index.php');
    }
?>