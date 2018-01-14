function DFI(root){
	var nodeIterator = document.createNodeIterator(root,NodeFilter.SHOW_ELEMENT,null,false);
	var cur;
	while((cur = nodeIterator.nextNode())!=null){
		highlight(cur);
	}
}
function DFS(root,input){
	var nodeIterator = document.createNodeIterator(root,NodeFilter.SHOW_ELEMENT,null,false);
	var cur;
	while((cur = nodeIterator.nextNode())!=null){
		highlight(cur);
		if(cur.firstChild.nodeValue==input){
			highlight(cur);
			setTimeout(function(){alert("找到了！");},timer+=500);
			return;
		}
	}
	setTimeout(function(){alert("不存在的~");},timer+=500);
}
function WFI(root){
	var treewalker = document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT,null,false);
	var cur=root;
	var arr=[];
	arr.push(cur);

	while(arr.length!=0){
		cur = arr.shift();
		highlight(cur);
		var children = Array.prototype.slice.call(cur.children);
		Array.prototype.push.apply(arr,children);
	}
}
function WFS(root,input){
	var treewalker = document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT,null,false);
	var cur=root;
	var arr=[];
	arr.push(cur);

	while(arr.length!=0){
		cur = arr.shift();
		highlight(cur);
		if(cur.firstChild.nodeValue==input){
			highlight(cur);
			setTimeout(function(){alert("找到了！");},timer+=500);
			return;
		}
		var children = Array.prototype.slice.call(cur.children);
		Array.prototype.push.apply(arr,children);
	}
	setTimeout(function(){alert("不存在的~");},timer+=500);
}
function toggle(node){
	node.classList.toggle('highlight');//classList是动态集合
}
var timer=0;
function highlight(node){
	setTimeout(function(){toggle(node);},timer+=500);
	setTimeout(function(){toggle(node);},timer+=500);
	setTimeout(function(){toggle(node);},timer+=500);
	setTimeout(function(){toggle(node);},timer+=500);
	// setTimeout(function(){node.classList.add('highlight');},timer+=500);
	// setTimeout(function(){node.classList.remove('highlight');},timer+=500);
	// setTimeout(function(){node.classList.add('highlight');},timer+=500);
	// setTimeout(function(){node.classList.remove('highlight');},timer+=500);
}


(function(){
	var input = document.getElementsByTagName('input')[0];
	var buttons = document.getElementById('buttons');
	var root1 = document.getElementById('root');
	addHandler(buttons,'click',function (event){
		var target = event.target||event.srcElement;
		var id = target.id;
		switch(id){
			case'DFS':DFS(root1,input.value);break;
			case'DFI':DFI(root1);break;
			case'WFS':WFS(root1,input.value);break;
			case'WFI':WFI(root1);break;
		}
	});
})();

function addHandler(element,type,func){
	if(element.addEventListener){
		element.addEventListener(type,func,false);
	}else if(element.attachEvent){
		element,attachEvent('on'+type,func);
	}else{
		element['on'+type]=func;
	}
}