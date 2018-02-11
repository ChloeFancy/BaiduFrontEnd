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

	var realLeft;
	var realTop;
	var deltaY,deltaX;
	popWindow.addEventListener('mousedown',function(event){
		var computedStyle = document.defaultView.getComputedStyle(popWindow);
		var width = parseInt(computedStyle.width);
		var height = parseInt(computedStyle.height);

		if(typeof realLeft!='number'){
			realLeft = parseInt(computedStyle.left)-0.5*width;
			realTop = parseInt(computedStyle.top)-0.5*height;
		}
		deltaY = event.clientY-realTop;
		deltaX = event.clientX-realLeft;

		function move(event){
			popWindow.style.top = event.clientY+'px';
			popWindow.style.left = event.clientX+'px';
			popWindow.style.transform = "translate(-"+deltaX+"px, -"+deltaY+"px)";
			realTop = event.clientY-deltaY;
			realLeft = event.clientX-deltaX;
			first=false;

		}
		popWindow.addEventListener('mousemove',move,false);
		popWindow.addEventListener('mouseup',function(event){
			popWindow.removeEventListener('mousemove',move);
		},false);
	},false);

	var main = document.getElementsByTagName('main')[0];
	var cover = document.getElementById('cover');

	function showCover(){
		popWindow.style.display="block";
		cover.style.display='block';
		cover.style.width=window.innerWidth+'px';
		cover.style.height=window.innerHeight+'px';
		popWindow.style.top=0.5*window.innerHeight+'px';
		popWindow.style.left=0.5*window.innerWidth+'px';
		popWindow.style.transform="translate(-"+0.5*popWindow.clientWidth+'px,-'+0.5*popWindow.clientHeight+'px)';
		document.body.classList.add('banScroll');
		main.classList.add('blur');
		window.addEventListener('resize',showCover,false);
	}
	function hideCover(){
		popWindow.style.display="none";
		cover.style.display='none';
		main.classList.remove('blur');
		document.body.classList.remove('banScroll');
		window.removeEventListener('resize',showCover);
	}
}())