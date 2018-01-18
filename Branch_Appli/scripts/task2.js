(function(){
	var hints = {
		tel:'必填，填入11位手机号',
		name:'必填，长度为4-16个字符',
		password:'必填，长度为4-16个字符，不允许有空格',
		passwordCheck:'必填，再次输入相同密码',
		email:'必填，填入xxxx@xxx.com格式的正确格式',

	};
	function focusAction(event){
		var target = event.target||event.srcElement;
		if(target.nodeName.toLowerCase()=='input'){
			var hint = target.nextElementSibling;
			hint.firstChild.nodeValue = hints[target.id];
			hint.style.color='green';
			hint.classList.add('displayHint');
			target.style.borderColor='green';
		}
	}
	var vali;
	function blurAction(event){
		var target = event.target||event.srcElement;
		if(target.nodeName.toLowerCase()=='input'){
			var value = target.value;
			var id = target.id;
			var hint = target.nextElementSibling.firstChild;
			if(target.validity.valueMissing){
				switch(id){
					case'name':hint.nodeValue="名称不能为空";break;
					case'password':hint.nodeValue="密码不能为空";break;
					case'passwordCheck':hint.nodeValue="密码不能为空";break;
					case'email':hint.nodeValue="邮箱不能为空";break;
					case'tel':hint.nodeValue="手机号码不能为空";break;
				}
				vali=false;
			}else if(target.validity.patternMismatch){
				switch(id){
					case'email': hint.nodeValue="邮箱格式错误";break;
					case'tel':hint.nodeValue="手机号码格式错误";break;
				}
				vali=false;
			}else{
				switch(id){
					case'name':vali=checkName(value,hint);break;
					case'password':vali=checkPwd(value,hint);break;
					case'passwordCheck':vali=checkPwdTwice(value,hint);break;
					case'email':vali=checkEmail(value,hint);break;
					case'tel':vali=checkTel(value,hint);break;
				};
			}

			if(vali){
				target.style.borderColor='green';
				hint.parentNode.style.color = 'green';
			}else{
				target.style.borderColor='red';
				hint.parentNode.style.color = 'red';
			}
		}
	}

	function checkName(value,target){
		var len=0;
		var reg = /[\x00-\xff]/ig;
		if(match = value.match(reg))
			len = match.length + 2*(value.length-match.length);
		else{
			len = 2*value.length;
		}
		if(len>=4&&len<=15){
			target.nodeValue='名称可用';
			return true;
		}else{
			target.nodeValue='名称长度错误';
			return false;
		}
	}
	function checkPwd(value,target){
		var reg = /[ ]/g;
		if(value.match(reg)){
			target.nodeValue='密码不能包含空格';
		}else{
			var len=0;
			var reg = /[\x00-\xff]/ig;
			var match = value.match(reg).length;
			len = match + 2*(value.length-match);
			if(len>=4&&len<=15){
				target.nodeValue='密码可用';
				return true;
			}else{
				target.nodeValue='密码长度错误';
				return false;
			}
		}
	}
	function checkPwdTwice(value,target){
		var pwd = elements[1].value;
		if(pwd==value){
			target.nodeValue='密码输入一致';
			return true;
		}else{
			target.nodeValue='密码输入不一致';
			return false;
		}
	}
	function checkEmail(value,target){
		var emailReg = /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+.com$/;
		if(emailReg.test(value)){
			target.nodeValue='邮箱格式正确';
			return true;
		}else{
			target.nodeValue='邮箱格式不正确';
			return false;
		}
	}
	function checkTel(value,target){
		var telReg = /^1[0-9]{10}$/;
		if(telReg.test(value)){
			target.nodeValue='手机号码格式正确';
			return true;
		}else{
			target.nodeValue='手机号码格式不正确';
			return false;
		}
	}
	function submitAction(event){
		event.preventDefault();
		if(vali){
			alert('表单信息已提交');
		}else{
			alert('表单提交失败');
		}
	}
	function addHandler(element,type,func){
		if(element.addEventListener){
			element.addEventListener(type,func,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,func);
		}else{
			element['on'+type]=func;
		}
	}

	var form = document.forms[0];
	var elements = form.elements;
	// addHandler(form,'focus',focusAction);
	// addHandler(form,'blur',blurAction);
	// focus事件不冒泡
	// blur事件不冒泡

	// 因此若要委托事件则要使用‘focusin’‘focusout’
	addHandler(form,'focusin',focusAction);
	addHandler(form,'focusout',blurAction);
	addHandler(form,'submit',submitAction);
	// for(var i=0,len=elements.length-1;i<len;i++){
	// 	addHandler(elements[i],'focus',focusAction);
	// 	addHandler(elements[i],'blur',blurAction);
	// }
	// 或者分别给除button以外的所有字段添加事件处理程序
})();