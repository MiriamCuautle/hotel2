//Eventos
$(document).ready(function(e){
	document.addEventListener("deviceready", function(){
		if(!isLogin())
			window.location.href = "#login";
		//Funcionalidad de tomar foto
		$('#regFoto').tap(function(){
			capturaImg();
		});
		//Funcionalidad Login
		$('#regSubmit').tap(function(){
			if($('#regNombre').val()!='' && $('#regLugar').val()!='' && $('#regEmail').val()!='' && $('#regTel').val()!=''){
				var nom=$('#regNombre').val();
				var lug=$('#regLugar').val();
				var ema=$('#regEmail').val();
				var tel=$('#regTel').val();
				
				//pgAlert("Valores",nom+'\n'+lug+'\n'+ema+'\n'+tel);
				logSend(nom,lug,ema,tel);
			}else{
				pgAlert("Error",'Todos los campos son requeridos.');
			}
		});
		
		$('#prueSQL').tap(function()
		{
			leerReservas();
		});
	}, false);
});


function isLogin(){
	return false;
}

function syncRegs(){
	document.addEventListener("online", function(){
		leerHistorial();
	}, false);
}


function reservar(){
	$('#nr1 ul[data-role=listview] .opc').click(function(){
		switch($(this).index()){
			case 1:
					$('#nr1').attr('th','1');
				break;
			case 2:
					$('#nr1').attr('th','2');
				break;
			case 3:
					$('#nr1').attr('th','3');
				break;
				
		}
		
		window.location.href="#nr2";
	});
	$('#nr2 #enviar').tap(function(){
		if(!isConnected()){
			//Guardar en BD local
			saveReserva();
		}else{
			//Enviar al servidor
		}
		});
}