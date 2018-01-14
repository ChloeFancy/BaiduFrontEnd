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
function deleteThis(node){
	node.parentNode.removeChild(node);
}
function addNode(parent,nodeValue){
	var child = document.createElement('div');
	child.appendChild(document.createTextNode(nodeValue));
	parent.appendChild(child);
}
(function(){
	var input = document.getElementsByTagName('input')[0];
	var area = document.body;
	var root1 = document.getElementById('root');
	var deleted;
	var lastChosen;
	addHandler(area,'click',function (event){
		var target = event.target||event.srcElement;
		var id = target.id;
		switch(id){
			case'DFS':DFS(root1,input.value);break;
			case'DFI':DFI(root1);break;
			case'WFS':WFS(root1,input.value);break;
			case'WFI':WFI(root1);break;
			case'delete':deleteThis(deleted);break;
			case'add':addNode(lastChosen,input.value);break;
			default:if(root1.contains(target)){
				if(lastChosen!=undefined)
					lastChosen.classList.toggle('chosen');
				target.classList.toggle('chosen');
				deleted = target;
				lastChosen = target;
			};break;
		}
		input.value=null;
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

