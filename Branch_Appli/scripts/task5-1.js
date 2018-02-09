(function(){
	var tabel = document.getElementsByTagName('table')[0];
	var baseMarginLeft;
	var form = document.forms[0];
	var buttons = document.getElementsByTagName('button');
	for(var i=0,len=buttons.length;i<len;i++){
		buttons[i].disabled = true;
	}
	var beginbtn = document.getElementById('BEGIN');
	beginbtn.disabled = false;
	form.addEventListener('click',function(event){
		var target = event.target;
		var id = target.id;
		switch(id){
			case'BEGIN':init();break;

			case'TRARIG_a':TRARIG_a();break;
			case'TRALEF_a':TRALEF_a();break;
			case'TRABOT_a':TRABOT_a();break;
			case'TRATOP_a':TRATOP_a();break;
		}
	},false);
})();