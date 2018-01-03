function addHandler(obj,event,func){
	if(obj.addEventListener){ //DOM2
		obj.addEventListener(event,func,false);
	}else if(obj.attachEvent){ //IE
		obj.attachEvent('on'+event,func);
	}else { //DOM0 Level
		obj['on'+event] = func;
	}
}

function removeHandler(obj,type,handler){
	if(obj.removeEventListener){
		obj.removeEventListener(type,handler,false);
	}else if(obj.detachEvent){
		obj.detachEvent('on'+type,handler);
	}else{
		obj['on'+type] = handler;
	}
}
