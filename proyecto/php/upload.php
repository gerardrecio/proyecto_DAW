<?php
// En versiones de PHP anteriores a la 4.1.0, debería utilizarse $HTTP_POST_FILES en lugar
// de $_FILES.

$xid = $_POST["fichero_id"];    //id de el usuario

$dir_subida = '../files/';
$dir_subida.= $xid;
$dir_subida.='/';
$fichero_subido = $dir_subida . basename($_FILES['fichero_usuario']['name']);


//variables para MYSQLI

$size = $_FILES['fichero_usuario']['size'] / 1000; //esta en KB
$name = $_FILES['fichero_usuario']['name']; //nombre con la extension correcta

//query para añadir el archivo a la tabla archivos

$ini = parse_ini_file('config.ini');

$enlace = mysqli_connect($ini["db_name"], $ini["db_user"], $ini["db_password"], $ini["db_database"]);

$query = "INSERT INTO archivos (ID, Nombre, Clave, Peso, Tipo, Estado, Fecha) VALUES (null, '$name', '', '$size', '1', '1', 'NOW()')";

$res = mysqli_query($enlace, $query);

//buscar el ultimo valor de la ID de la tabla archivos

$query = "SELECT MAX(ID) AS 'XS' from archivos";

$res = mysqli_query($enlace, $query);

$resultado = mysqli_fetch_assoc($res);

$test = $resultado["XS"];

//añadir a la tabla con el inner JOIN
$query = "INSERT INTO usuarios_archivos (ID_Usuarios, ID_Archivos) VALUES ('$xid', '$test')";

$res = mysqli_query($enlace, $query);

echo '<pre>';
if (move_uploaded_file($_FILES['fichero_usuario']['tmp_name'], $fichero_subido)) {
    echo "El fichero es válido y se subió con éxito.\n";
} else {
    echo "¡Posible ataque de subida de ficheros!\n";
}

print "</pre>";

?>