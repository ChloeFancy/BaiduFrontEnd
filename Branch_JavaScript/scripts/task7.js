(function(){
	var bar1 = document.getElementById('bar');
	var root1 = document.getElementById('root');
	addHandler(
		bar1,
		'click',
		function(event){
			var target = event.target||event.srcElement;
			var content = target.id;
			switch(content){
				case 'DLR': DLR(root1);break;
				case 'LDR': LDR(root1);break;
				case 'LRD': LRD(root1);break;
			}
		}
	);

})();

function addHandler(element,type,func){
	if(element.addEventListener){
		element.addEventListener(type,func,false);
	}else if(element.attachEvent){
		element.attachEvent('on'+type,func);
	}else{
		element['on'+type]=func;
	}
}

function LDR(root1){
	if(root1!=null){
		LDR(root1.children[0]);
		animation(root1);
		LDR(root1.children[1]);
	}
}

function LRD(root1){
	if(root1!=null){
		LRD(root1.children[0]);
		LRD(root1.children[1]);
		animation(root1);
	}
}

function DLR(root1){
	if(root1!=null){
		animation(root1);
		//DLR(root1);
		DLR(root1.firstElementChild);
		DLR(root1.children[1]);
	}
}

var timer=0;
function animation(root1){
	root1.style.backgroundColor='white';
	setTimeout(function(){
		root1.style.backgroundColor='red';
	},timer+=500);
	setTimeout(function(){
		root1.style.backgroundColor='white';
	},timer+=500);
	setTimeout(function(){
		root1.style.backgroundColor='red';
	},timer+=500);
		setTimeout(function(){
		root1.style.backgroundColor='white';
	},timer+=500);
}

// function timer(num) {

//     console.log(num);
// }
// for (var i = 1;i <= 5;i ++) {

//   	setTimeout(function(){var num=i;return function(){
//   		console.log(num);
//   	};}(),i * 1000);

// }