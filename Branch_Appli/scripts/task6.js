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
	var width,height;
	function getMouseLocation(event){
		var computedStyle = document.defaultView.getComputedStyle(popWindow);
		width = parseInt(computedStyle.width);
		height = parseInt(computedStyle.height);

		if(typeof realLeft!='number'){
			realLeft = parseInt(computedStyle.left)-0.5*width;
			realTop = parseInt(computedStyle.top)-0.5*height;
		}

		deltaY = event.clientY-realTop;
		deltaX = event.clientX-realLeft;
		return [deltaX,deltaY];
	}
	popWindow.addEventListener('mousedown',function(event){
		var x = getMouseLocation(event)[0];
		var y = getMouseLocation(event)[1];

		function move(event){
			if(width-x>5&&height-y>5){
				popWindow.style.top = event.clientY+'px';
				popWindow.style.left = event.clientX+'px';
				popWindow.style.transform = "translate(-"+x+"px, -"+y+"px)";
				realTop = event.clientY-y;
				realLeft = event.clientX-x;
				popWindow.style.cursor = "default";
			}
		}
		popWindow.addEventListener('mousemove',move,false);
		popWindow.addEventListener('mouseup',function(event){
			popWindow.removeEventListener('mousemove',move);
		},false);
	},false);

	popWindow.addEventListener('mousemove',function(event){
		var x = getMouseLocation(event)[0];
		var y = getMouseLocation(event)[1];
		if(width-x<5&&height-y<5){
			popWindow.style.cursor = "se-resize";

			function scale(e){
				var Px = e.clientX;
				var Py = e.clientY;
				popWindow.style.width = (Px-realLeft+5)+'px';
				popWindow.style.height = (Py-realTop+5)+'px';
			}
			popWindow.addEventListener('mousedown',function(e){
				popWindow.addEventListener('mousemove',scale,false);
			},false);

		}else{
			popWindow.style.cursor = "default";
		}
		popWindow.addEventListener('mouseup',function(){
			popWindow.removeEventListener('mousemove',scale);
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