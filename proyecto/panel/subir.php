<?php
    session_start();    //iniciamos la sesion
    require_once("../php/functions.php");

    if ($_SESSION['email'] == ""){
        header('Location: ../index.php');
    }
?>

<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="es">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Panel de Gestion</title>
    <meta name="description" content="Sufee Admin - HTML5 Admin Template">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="apple-icon.png">
    <link rel="shortcut icon" href="favicon.ico">

    <link rel="stylesheet" href="vendors/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendors/themify-icons/css/themify-icons.css">
    <link rel="stylesheet" href="vendors/flag-icon-css/css/flag-icon.min.css">
    <link rel="stylesheet" href="vendors/selectFX/css/cs-skin-elastic.css">
    <link rel="stylesheet" href="vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
    

    <link rel="stylesheet" href="assets/css/style.css">

    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>

</head>

<body>


    <!-- Left Panel -->

    <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">

            <div class="navbar-header">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.php"><img src="images/logo.png" alt="Logo"></a>
                <a class="navbar-brand hidden" href="index.php"><img src="images/logo2.png" alt="Logo"></a>
            </div>

            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">
                <li id="li_nombre" class="text-center mt-3">
                        <span class="text-white"><?php get_sex($_SESSION['email'])?></span> <span class="text-white" id="nombre"><?php get_username($_SESSION['email'])?></span><span id="idx" class="d-none"><?php get_echo_id($_SESSION['email'])?></span>
                    </li>
                    <h3 class="menu-title"></h3><!-- /.menu-title -->
                    <li>
                        <a href="index.php"> <i class="menu-icon fa fa-dashboard"></i>Panel de Control</a>
                    </li>
                    <li class="active">
                        <a href="#"> <i class="menu-icon fa fa-share-square-o"></i>Subir Archivos</a>
                    </li>
                    <li>
                        <a href="actividad.php"> <i class="menu-icon fa fa-pencil-square-o"></i>Registro de Actividad</a>
                    </li>
                    <li>
                        <a href="graficos.php"> <i class="menu-icon fa fa-bar-chart-o"></i>Graficos</a>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </nav>
    </aside><!-- /#left-panel -->

    <!-- Left Panel -->

    <!-- Right Panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <header id="header" class="header">

            <div class="header-menu">

                <div class="col-sm-7">
                    <a id="menuToggle" class="menutoggle pull-left"><i class="fa fa fa-tasks"></i></a>
                </div>

                <div class="col-sm-5">
                    <div class="user-area dropdown float-right">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="user-avatar rounded-circle" src="images/unnamed.png" alt="User Avatar">
                        </a>

                        <div class="user-menu dropdown-menu">
                            <a class="nav-link" href="#"><i class="fa fa-user"></i> Mi perfil</a>

                            <a class="nav-link" href="../php/cerrar_sesion.php"><i class="fa fa-power-off"></i> Cerrar Sesión</a>
                        </div>
                    </div>

                </div>
            </div>

        </header>

        <div class="content mt-3">

            <div class="col-sm-6 col-lg-4">
                <div class="card text-white bg-flat-color-5">
                    <div class="card-body pb-0">
                        <div class="float-right">
                            <i class="fa fa-archive fa-3x"></i>
                        </div>
                        <h4 class="mb-0">
                            <span class="count xtotal"><?php get_files_user(get_id($_SESSION['email']))?></span>
                        </h4>
                        <p class="text-light">Archivos Subidos</p>
                    </div>
                </div>
            </div>
            <!--/.col-->

            <div class="col-sm-6 col-lg-4">
                <div class="card text-white bg-flat-color-4">
                    <div class="card-body pb-0">
                        <div class="float-right">
                            <i class="fa fa-eye-slash fa-3x"></i>
                        </div>
                        <h4 class="mb-0">
                            <span class="count xprivado"><?php get_files_private(get_id($_SESSION['email']))?></span>
                        </h4>
                        <p class="text-light">Archivos Privados</p>
                    </div>
                </div>
            </div>
            <!--/.col-->

            <div class="col-sm-6 col-lg-4">
                <div class="card text-white bg-flat-color-3">
                    <div class="card-body pb-0">
                        <div class="float-right">
                            <i class="fa fa-eye fa-3x"></i>
                        </div>
                        <h4 class="mb-0">
                            <span class="count xpublico"><?php get_files_public(get_id($_SESSION['email']))?></span>
                        </h4>
                        <p class="text-light">Archivos Publicos</p>
                    </div>
                </div>
            </div>

                <div class="col-md-12">
                    <div class="col-sm-4 col-lg-4 offset-4 alert xalerta text-center d-none" role="alert"></div>
                </div>


                <div class="offset-md-4 col-md-4">
                    <div class="card text-center">
                        <div class="card-header">
                            <strong class="card-title">Subir Archivos</strong>
                        </div>
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-12 col-form-label text-center">Todos los archivos que indiques aqui seran subidos como publicos, no obstante estaran bloqueados por defecto. Recuerda que puedes ajustar los parametros de cada archivo en el panel de control</label>
                            </div>

                            <iframe id="iframe" name="iframe" class="d-none"></iframe>
                            
                            <!-- El tipo de codificación de datos, enctype, DEBE especificarse como sigue -->
                            <form id="subida" enctype="multipart/form-data" action="../php/upload.php" method="POST" target="iframe">
                                <!-- MAX_FILE_SIZE debe preceder al campo de entrada del fichero -->
                                <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
                                <!-- El nombre del elemento de entrada determina el nombre en el array $_FILES -->
                                <input name="fichero_usuario" class="fichero" type="file" />
                                <input name="fichero_id" id="fichero_id" class="d-none" type="text" value=""/>
                                <br><br><button type="button" style="color: White;" class="btn col-sm-4 bg-flat-color-4 mr-3 rounded xsubir">Subir Archivo</button>
                            </form>
                        </div>
                    </div>
                </div>
            
            <!--/.col-->
        </div> <!-- .content -->
    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    
    <script src="vendors/jquery/dist/jquery.min.js"></script>
    <script src="vendors/popper.js/dist/umd/popper.min.js"></script>
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="vendors/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="vendors/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
    <script src="vendors/jszip/dist/jszip.min.js"></script>
    <script src="vendors/pdfmake/build/pdfmake.min.js"></script>
    <script src="vendors/pdfmake/build/vfs_fonts.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.colVis.min.js"></script>
    <script src="assets/js/init-scripts/data-table/datatables-init.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script src="vendors/proper/load_subir.js"></script>


</body>

</html>
