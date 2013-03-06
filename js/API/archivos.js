//Archivos
function subirArchivo(ruta){
	var ft = new FileTransfer();

	ft.upload(ruta,
		"http://igitsoft.com/pgtest.php",
		function(result) {
			pgAlert('Imagen subida',result.responseCode+'\n'+result.bytesSent);
		},
		function(error) {
			pgAlert('Error al subir imagen',error.code);
		},
		{ fileKey:'archivo', fileName:'cliente.jpg' }
	);   
}