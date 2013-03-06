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
     tx.executeSql('CREATE TABLE IF NOT EXISTS historial (hId unique, fecha, habitaciones, personas, estancia)');
     tx.executeSql('CREATE TABLE IF NOT EXISTS reserva( rId unique, fecha, habitaciones, personas, estancia)');
}
, function(err) {
    alert("Error processing SQL: "+err.code);
}
, function() {
    alert("success!");
}
);


	
}


function getData(usuario){//obtSimpleBD
	window.localStorage.getItem(nombre);
}

function isLogin(){
		if(getData('nombre')!= 'undefined' && getData('dispId')!= 'undefined')
			return true;
		else
			false;
}