(function(){
	var moveInput = document.querySelector('[name=moveInput]');
	var form = document.forms[0];
	var item = document.getElementById('item');
	var deg = 0;
	var sheet = document.styleSheets[0];
	form.addEventListener('click',function(event){
		var info = event.target.id;
		switch(info){
			case'GO':go();break;
			//anticlockwise 90
			case'TUNLEF':newRule(-90);break;
			//clockwise 90
			case'TUNRIG':newRule(90);break;
			//clockwise 180
			case'TUNBAC':newRule(180);break;
		}
	},false);
	function newRule(deltaDeg){
		//alert('from '+deg0+' to '+deg1);
		sheet.removeRule(0);
		sheet.insertRule("@-webkit-keyframes mymove{from{-webkit-transform:rotate("+deg
			+"deg)}to{-webkit-transform:rotate("+(deg+=deltaDeg)+"deg)}}",0);
		// var wrapper = document.createElement('div');
		// wrapper.className = 'anim';
		// item.parentNode.appendChild(wrapper);
		// wrapper.appendChild(item);
		item.classList.add('anim');
		setTimeout(function(){
			// item.parentNode.parentNode.appendChild(item);
			// item.parentNode.removeChild(item.parentNode.firstChild);
			item.classList.remove('anim');
			var rules = sheet.rules;
			// alert(rules[rules.length-1]);
			// sheet.deleteRule(rules.length-1);
			item.style.transform="rotate("+deg+"deg)";
			// sheet.insertRule("#item{transform:rotate("+deg+"deg)}", rules.length);
		},1000);
	}
	function go(){
		while(deg<0||deg>=360){
			if(deg<0)
				deg+=360;
			else if(deg>=360) deg-=360;
		}
		//0 90 180 270
		var direction = Math.floor(deg/90);
		switch(direction){
			case 0:goleft();break;
			case 1:goup();break;
			case 2:goright();break;
			case 3:godown();break;
		}
	}
	function goleft(){
		var p = item.parentNode.previousElementSibling.previousElementSibling;
		if(p){
			p.nextElementSibling.appendChild(item);
		}
	}
	function goup(){
		var p = item.parentNode.parentNode.previousElementSibling.previousElementSibling;
		if(p){
			var index;
			var children = item.parentNode.parentNode.children;
			for(var i=1;i<children.length;i++){
				if(children[i].contains(item)){
					index = i;
				}
			}
			p.nextElementSibling.children[index].appendChild(item);
		}
	}
	function godown(){
		var p = item.parentNode.parentNode.nextElementSibling;
		if(p){
			var index;
			var children = item.parentNode.parentNode.children;
			for(var i=1;i<children.length;i++){
				if(children[i].contains(item)){
					index = i;
				}
			}
			p.children[index].appendChild(item);
		}
	}
	function goright(){
		var p = item.parentNode.nextElementSibling;
		if(p){
			p.appendChild(item);
		}
	}


})();
