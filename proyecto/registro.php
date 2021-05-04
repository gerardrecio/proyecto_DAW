<!doctype html>
<html lang="es">
  <head>
  	<title>Registro DataShare</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">

	<link rel="icon" type="image/png" href="images/data_share_noblanco.png">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	
	<link rel="stylesheet" href="css/style.css">

	<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>	<!--3.6.0 JQUERY-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>

	<script src="js/index_reg.js"></script>
  </head>

	<body class="imge">
	<section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center">
					<h2 class="heading-section"><img src="images/data_share_noblanco.png" alt="logo"></h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0 background rounded">
		      	<h3 class="mb-2 text-center pt-2">Registro</h3>
		      	<form action="index.php" onsubmit="return comprobacion()" class="signin-form" method="POST">
					<div class="form-group offset-lg-1 col-lg-10">
					  	<label>Email:</label>
		      			<input id="email-field" type="text" name="email" class="form-control center" placeholder="Email" required>
		      		</div>

					<div class="row">
						<div class="form-group offset-lg-1 col-lg-5">
								<label>Nombre:</label>
								<input id="nombre-field" type="text" name="nombre" class="form-control center" placeholder="Nombre" required>
						</div>
						<div class="form-group col-lg-5">
								<label>Sexo:</label>
								<select name="sexo" id="sexo" class="form-control center">
									<option value="0">Hombre</option>
									<option value="1">Mujer</option>
								</select>
  						</div>
					</div>

					<div class="form-group offset-lg-1 col-lg-10">
								<label>Nacimiento:</label>
								<input id="nacimiento-field" type="date" name="nacimiento" class="form-control center" placeholder="Fecha de Nacimiento" required>
						</div>
					<div class="row">
						<div class="form-group offset-lg-1 col-lg-5">
								<label>1 Apellido:</label>
								<input id="apellido-field" type="text" name="apellido_uno" class="form-control center" placeholder="Apellido" required>
						</div>
						<div class="form-group col-lg-5">
								<label>2 Apellido:</label>
								<input id="segundo-field" type="text" name="apellido_dos" class="form-control center" placeholder="Apellido" required>
						</div>
					</div>
					<div class="offset-lg-1 col-lg-10">
						<label>Contraseña:</label>
						<input id="password-field" type="password" name="password" class="form-control center" placeholder="Contraseña" required>
						<span toggle="#password-field" class="fa fa-fw fa-eye mr-2 mt-3 field-icon toggle-password"></span>
					</div>
				<br>
	            <div class="form-group offset-lg-1 col-lg-10">
					<div class="row">
						<button type="submit" class="form-control col-lg-5 btn btn-primary submit px-3 mb-4">Registrar</button>
						<button class="form-control offset-lg-2 col-lg-5 btn btn-primary px-3 mb-4 xacceso">Acceder</button>
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

