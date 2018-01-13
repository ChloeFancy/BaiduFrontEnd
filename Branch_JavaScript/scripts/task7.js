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
				case 'addNode': addNode(root1);break;
			}
		}
	);

})();

function addNode(r){
	var iterator = document.createNodeIterator(r,NodeFilter.SHOW_ELEMENT,null,false);
	var next=iterator.nextNode();
	do{
		if(next.children.length==0){
			var tmp = next;
			next = iterator.nextNode();
			var e = document.createElement('div');
			e.classList.add("newest");
			tmp.appendChild(e);
			var e1 = e.cloneNode(true);
			tmp.appendChild(e1);
		}else{
			next = iterator.nextNode();
		}
	}while(next!=null);
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
		//alert('task queue');
	},timer+=500);
	//alert('main thread');
}
/*
		在单线程上，先进行了定时器的设置，即将匿名函数放入任务队列。
		定时器的设置都设置完了之后，线程再运行任务队列上的任务。
		setTimeout和递归DLR(...)这些是排在了JS引擎单线程上的主要任务，
	主要任务完成了，引擎空闲了，再将定时器任务调来运行。
		结果：alert('main thread');连续地显示7次，再每个节点闪烁后出现alert('task queue');一共七次。
*/




// function timer(num) {

//     console.log(num);
// }
// for (var i = 1;i <= 5;i ++) {

//   	setTimeout(function(){var num=i;return function(){
//   		console.log(num);
//   	};}(),i * 1000);

// }