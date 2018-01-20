(function(){
	var form1 = document.forms[0];
	var stu = form1.elements[0];
	var notStu = form1.elements[1];
	var collegeInput = document.getElementById('collegeInput');
	var companyInput = document.getElementById('companyInput');
	var classListCollege = collegeInput.classList;
	var classListCompany = companyInput.classList;
	addHandler(form1,'click',function(event){
		var target = event.target||event.srcElement;
		var id = target.id;
		switch(id){
			case'student': classListCompany.add('hidden');classListCollege.remove('hidden');break;
			case'notStudent':classListCollege.add('hidden');classListCompany.remove('hidden');break;
		}
	});

})();

function addHandler(element,type,func){
	if(element.addEventListener){
		element.addEventListener(type,func,false);
	}else if(element.attachEvent){
		element.attachEvent('on'+type,func);
	}else{
		element['on'+type] = func;
	}
}