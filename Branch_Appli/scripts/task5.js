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
			case'TRARIG':TRARIG();break;
			case'TRALEF':TRALEF();break;
			case'TRABOT':TRABOT();break;
			case'TRATOP':TRATOP();break;

			case'TRARIG_a':slowMove(46,0);break;
			case'TRALEF_a':slowMove(-46,0);break;
			case'TRABOT_a':slowMove(0,46);break;
			case'TRATOP_a':slowMove(0,-46);break;

			case'MOVLEF':turnMove(0,-46,0);break;
			case'MOVRIG':turnMove(180,46,0);break;
			case'MOVBOT':turnMove(270,0,46);break;
			case'MOVTOP':turnMove(90,0,-46);break;
		}
	},false);
})();