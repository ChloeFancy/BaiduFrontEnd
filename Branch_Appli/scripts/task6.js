(function(){
	var pop = document.querySelector('button#pop');
	var popWindow = document.getElementById('window');

	document.body.addEventListener('click',function(event){
		var target = event.target;
		var id = target.id;
		switch(id){
			case'pop':showCover();break;
			case'valid':case'cancel':case'':case'cover':hideCover();break;
		}
	},false);
	var main = document.getElementsByTagName('main')[0];
	var cover = document.getElementById('cover');

	function showCover(){
		popWindow.style.display="block";
		cover.style.display='block';
		cover.style.width=window.innerWidth+'px';
		cover.style.height=window.innerHeight+'px';
		main.classList.add('blur');
	}
	function hideCover(){
		popWindow.style.display="none";
		cover.style.display='none';
		main.classList.remove('blur');
	}
}())