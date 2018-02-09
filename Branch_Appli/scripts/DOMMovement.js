var item = document.getElementById('item');
var curPos;
// setTimeout(
function init(){
	// alert(baseMarginLeft);
	var buttons = document.getElementsByTagName('button');
	for(var i=0,len=buttons.length;i<len;i++){
		buttons[i].disabled = false;
	}
	var tr1 = document.getElementsByTagName('tr')[1];
	var td1 = tr1.getElementsByTagName('td')[1];
	curPos = td1;

	item.style.marginLeft = getElementLeft(curPos)+'px';
	item.style.marginTop = getElementTop(curPos)+'px';
}
var timer = 0;
var m;
function moveItem(cur){

	var dstX = getElementLeft(cur);
	var dstY = getElementTop(cur);
	var srcX = getElementLeft(curPos);
	var srcY = getElementTop(curPos);

	if(m) clearTimeout(m);
	m = setTimeout(function move(){
		if(dstX==srcX&&dstY==srcY) return;
		if(dstX>srcX){
			item.style.marginLeft = (srcX+=2)+'px';
		}
		if(dstX<srcX){
			item.style.marginLeft = (srcX-=2)+'px';
		}
		if(dstY>srcY){
			item.style.marginTop = (srcY+=2)+'px';
		}
		if(dstY<srcY){
			item.style.marginTop = (srcY-=2)+'px';
		}
		m = setTimeout(move,30);
	},30);

}
function getElementLeft(element){
	var curEle = element;
	var actualLeft = 0;

	do{
		actualLeft += curEle.offsetLeft;
		//alert(curEle.offsetLeft);
		curEle = curEle.offsetParent;
	}while(curEle!=null);
	return actualLeft+1;//加上本来的border宽度1px
}
function getElementTop(element){
	var cur = element;
	var actualTop = 0;
	do{
		actualTop += cur.offsetTop;
		cur = cur.offsetParent;
	}while(cur);
	return actualTop+1;
}

function TRARIG(){
	if(curPos.nextElementSibling){
		moveItem(curPos.nextElementSibling);
		curPos = curPos.nextElementSibling;
	}
}
function TRALEF(){
	if(curPos.previousElementSibling.previousElementSibling){
		moveItem(curPos.previousElementSibling);
		curPos = curPos.previousElementSibling;
	}
}
function TRATOP(){
	var p = curPos.parentNode;
	if(p.previousElementSibling.previousElementSibling){
		for(var i=1,len=p.children.length;i<len;i++){
			if(p.children[i]==curPos){
				break;
			}
		}
		moveItem(p.previousElementSibling.children[i]);
		curPos = p.previousElementSibling.children[i];
	}
}
function TRABOT(){
	var p = curPos.parentNode;
	if(p.nextElementSibling){
		for(var i=1,len=p.children.length;i<len;i++){
			if(p.children[i]==curPos){
				break;
			}
		}
		moveItem(p.nextElementSibling.children[i]);
		curPos = p.nextElementSibling.children[i];
	}
}