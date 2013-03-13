// Almacenamiento

function accesoBD(nombre, tamaño){
	//Acceso a la base de datos
	var db = window.openDatabase(nombre, //Nombre BD
	"1.0", //Version
	nombre, //Nombre a mostrar
	tamaño); //Tamaño
	
	return db;
}

function transacciones(db,ejecuciones, error, ok){
	db.transaction(ejecuciones, error, ok);
}


function crearTabla(tx,nombre,campos){	//campos vairable por comas
	//Que cree la tabla nombres
	tx.executeSql('CREATE TABLE IF NOT EXISTS'+ nombre+'('+campos+')');		
}


function eliminarTabla(tx,nombre){	//campos vairable por comas
	//Que elimina la tabla nombres
	tx.executeSql('drop table IF EXISTS'+ nombre);		
}


function setData(nombre, valor){ //simpleBD
	window.localStorage.setItem(nombre, valor);
}

function iniciarBD(){
	var db = window.openDatabase("Databasem", "1.0", "HotelV2", "1000000");
	db.transaction( function(tx) {
		
		 tx.executeSql('DROP TABLE IF EXISTS reserva');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS historial (hId unique, fecha, habitaciones, personas, estancia)');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS reserva( rId unique, fecha, habitaciones, personas, estancia)');
		/* tx.executeSql('INSERT INTO reserva (rId unique, fecha, habitaciones, personas, estancia) VALUES (1, "2013-02-05", 1,2,3)');*/
		}, 
		function(err) {
			alert(" Error iniciar: ", err.code);
		}, 
		function() {
			//alert("success iniciarBD!","iniciarDBE");
			window.localStorage.setItem('Usuario',$('#regNombre').val());
			window.localStorage.setItem('Id',dispositivo()['id']);
			alert('Reservas','Ha sido registrado');
			window.location.href='#page';
		}
	);
}

function leerHistorial(){
 var db = window.openDatabase("Databasem", "1.0", "HotelV2", "2000000");
        db.transaction(
				function(tx) {
					tx.executeSql(
						'SELECT * FROM historial', 
						[], 
						function(tx, results) { //querySuccess
							for (var i=0; i< results.rows.length; i++){
								alert(result.rows[i].hId);
							}
						}, 
						function(err) { //errorCB
							alert("Error historial1 ", "Aceptar");
						}
					);
    			}, 
				function(err) {//errorCB
					alert("Error historia2: ", "Aceptar");
					}
				);
}


function getId(tab){
	var regreso=0;
 var db = window.openDatabase("Databasem", "1.0", "HotelV2", "2000000");
        db.transaction(function(tx) {
					tx.executeSql('SELECT * FROM '+tab, [],	function(tx1, resultado) { //querySuccess
							regreso=resultado.rows.length;
						}, function(err) { //errorCB
							//alert("Error historial1 ", "Aceptar");
						});
    			}, function(err) {//errorCB
					alert("otra cosa");
				},function(){
				});
				return regreso+1;
}

function leerReservas(){
 var db = window.openDatabase("Databasem", "1.0", "HotelV2", "2000000");
        db.transaction(
				function(tx) {
					tx.executeSql(
						'SELECT * FROM reserva', 
						[], 
						function(tx, results) { //querySuccess
							for (var i=0; i< results.rows.length; i++){
								//alert(result.rows[i].hId);
								$('#prueSQL').text(results.rows.item(i).hId);
							}
						}, 
						function(err) { //errorCB
							alert("Error reerva1 ", err.code);
						}
					);
    			}, 
				function(err) {//errorCB
					alert("Error reerva2 ", err.code);
					}
				);
}

function saveReserva(){
	var id_reserva=getId('reserva');
	var id_historial=getId('historial');
	var tipoHabitacion=$('#nr1').attr('th');
	var habit=$('#nr2 ul[data-role=listview] li:eq(1)').children('select').val();
	var pers=$('#nr2 ul[data-role=listview] li:eq(2)').children('select').val();
	var dias=$('#nr2 ul[data-role=listview] li:eq(3)').children('select').val();
	var fecha=new Date();

	var db = window.openDatabase("Databasem", "1.0", "HotelV2", "2000000");
	db.transaction(function (tx){
		tx.executeSql('INSERT INTO reserva (rId , fecha, habitaciones, personas, estancia) VALUES ('+id_reserva+', "'+fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear()+'", "'+habit+'","'+pers+'","'+dias+'")');
		tx.executeSql('INSERT INTO historial (hId , fecha, habitaciones, personas, estancia) VALUES ('+id_historial+', "'+fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear()+'", "'+habit+'","'+pers+'","'+dias+'")');

	}, function(err){
		pgAlert('Error save', err.code);
	},function(){
		pgAlert('Guardado Localmente', 'Esperando por conexion al servidor');
	});
}


function getData(usuario){//obtSimpleBD
	window.localStorage.getItem(nombre);
}


/*
function isLogin(){
		if(getData('nombre')!= 'undefined' && getData('dispId')!= 'undefined')
			return true;
		else
			false;
}*/