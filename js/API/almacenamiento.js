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
			alert(" Error iniciar: ", ee.code);
		}, 
		function() {
			//alert("success iniciarBD!","iniciarDBE");
			window.locateStorage.setItem('Usuario',$('#regNombre').val());
			window.locateStorage.setItem('Id',dispositivo()['id']);
			pgAlert('Reservas','Ha sido registrado');
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

function leerReservas(){
 var db = window.openDatabase("Databasem", "1.0", "HotelV2", "2000000");
        db.transaction(
				function(tx) {
					tx.executeSql(
						'SELECT * FROM reserva', 
						[], 
						function(tx, results) { //querySuccess
							for (var i=0; i< results.rows.length; i++){
								alert(result.rows[i].hId);
							}
						}, 
						function(err) { //errorCB
							alert("Error reerva1 ", "Aceptar");
						}
					);
    			}, 
				function(err) {//errorCB
					alert("Error reerva2 ", "Aceptar");
					}
				);
}

function saveReserva(){
	var tipoHabitacion=$('#nr1').attr('th');
	var habit=$('#nr2 ul[data-role=listview] li:eq(1)').children('select').val();
	var pers=$('#nr2 ul[data-role=listview] li:eq(2)').children('select').val();
	var dias=$('#nr2 ul[data-role=listview] li:eq(3)').children('select').val();
	var fecha=new Date();

	var db = window.openDatabase("Databasem", "1.0", "HotelV2", "2000000");
	db.transaction(function (tx){
		tx.executeSql('INSERT INTO reserva (rId , fecha, habitaciones, personas, estancia) VALUES (2, "'+fecha.getDate() + "/" + meses[fecha.getMonth()] + "/" + fecha.getFullYear()+'", '+habit+','+pers+','+dias+')')
	}, function(err){
		pgAlert('Error', err.code);
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