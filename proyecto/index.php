<?php
	session_start();
?>
<!doctype html>
<html lang="es">
  <head>
  	<title>Acceso Web</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">

	<link rel="icon" type="image/png" href="images/data_share_noblanco.png">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	
	<link rel="stylesheet" href="css/style.css">

	<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>	<!--3.6.0 JQUERY-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>

	<script src="js/index.js"></script>
  </head>

	<body class="imge">
	<section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-3">
					<h2 class="heading-section"><img src="images/data_share_noblanco.png" alt="logo"></h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0 background rounded">
		      	<h3 class="mb-4 text-center pt-2">Login</h3>
		      	<form action="php/recibido.php" onsubmit="return comprobacion()" class="signin-form" method="POST">
		      		<div class="form-group offset-lg-1 col-lg-10">
		      			<input id="user-field" name="user" type="text" class="form-control center" placeholder="Email" required>
		      		</div>
	            <div class="form-group offset-lg-1 col-lg-10">
	              <input id="password-field" type="password" class="form-control center" placeholder="Contraseña" required>
	              <span toggle="#password-field" class="fa fa-fw fa-eye mr-2 field-icon toggle-password"></span>
	            </div>
				<br>
	            <div class="form-group offset-lg-1 col-lg-10">
					<div class="row">
						<button type="submit" class="form-control col-lg-5 btn btn-primary submit px-3">Acceder</button>
						<button class="form-control offset-lg-2 col-lg-5 btn btn-primary px-3 xregistro">Registrar</button>
					</div>
	            </div>
	            <div class="form-group d-md-flex">
	            	<div class="w-50">
		            	<label class="checkbox-wrap checkbox-primary ml-3">Recordarme
							<input id="recordarme" type="checkbox">
							<span class="checkmark"></span>
						</label>
					</div>
					<div class="w-50 text-md-right mr-3">
						<a href="#" style="color: #fff" class="xolvidada">¿ Contraseña olvidada ?</a>
					</div>
	            </div>
	            </form>
		    </div>
				</div>
			</div>
		</div>
	</section>

  <script src="js/jquery.min.js"></script>
  <script src="js/popper.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/main.js"></script>

	</body>
</html>

