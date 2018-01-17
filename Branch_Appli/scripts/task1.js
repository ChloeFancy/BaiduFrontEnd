(function(){
	function addEventHandler(element,type,func){
		if(element.addEventListener){
			element.addEventListener(type,func,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,func);
		}else{
			element['on'+type]=func;
		}
	}
	function byteLengthOf(value){
		var reg = /[^\x00-\xff]/ig;
		//ASCII编码 \x
		//匹配非在0-128（ASCII）范围内的编码（中文）
		var length=0;
		for(var i=0;i<value.length;i++){
			var char = value.charAt(i);
			if(char.match(reg)!=null){
				length+=2;
			}else{
				length+=1;
			}
		}
		return length;
	}
	function byteLength(value){
		var length=0;
		for(var i=0;i<value.length;i++){
			var charCode = value.charCodeAt(i);
			if(charCode<128&&charCode>=0){
				length+=1;
			}else{
				length+=2;
			}
		}
		return length;
	}
	var validateBtn = document.forms[0].elements['vali'];
	var textBox = document.forms[0].elements['name'];
	var hint = document.getElementById('hint');
	addEventHandler(textBox,'blur',function(){
		textBox.style.borderColor = 'grey';
	});
	addEventHandler(validateBtn,'click',function(){
		var value = textBox.value;
		//alert((byteLengthOf(value)==byteLength(value)));
		//true
		var length = byteLength(value);
		if(length<16&&length>4){
			hint.style.color = 'green';
			textBox.style.borderColor = 'green';
			hint.firstChild.nodeValue = "名称格式正确";
		}else{
			hint.style.color = 'red';
			textBox.style.borderColor = 'red';
			if(length==0){
				hint.firstChild.nodeValue = "名称不能为空";
			}else{
				hint.firstChild.nodeValue = "长度为4~16个字符";
			}
		}
	});

})();