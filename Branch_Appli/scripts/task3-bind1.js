(function(){

	var selectCity = document.getElementById('city');
	var selectCollege = document.getElementById('college');
	var optgroups = selectCollege.getElementsByTagName('optgroup');

	addHandler(selectCity,'change',function(event){
		var target = event.target||event.srcElement;
		var value = target.value;
		var correspondingCollegeList = optgroups[value];
		correspondingCollegeList.children[0].selected=true;
	});
	addHandler(selectCollege,'change',function(event){
		var target = event.target||event.srcElement;
		var value = target.value.split('_')[0];
		selectCity.options.namedItem(value).selected = true;
	});
})();