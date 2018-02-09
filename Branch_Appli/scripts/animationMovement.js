var sheet = document.styleSheets[0];
var table = document.getElementsByTagName('table')[0];
var item = document.getElementById('item');
var sheet = document.styleSheets[0];
function init(){
	var buttons = document.getElementsByTagName('button');
	for(var i=0,len=buttons.length;i<len;i++){
		buttons[i].disabled = false;
	}

	item.style.transform='translate(46px,46px)';
}
var clickAgain=true;
function slowMove(offsetLeft,offsetTop){
	//1. get current margin
	if(!clickAgain) return;
	var tr = item.style.transform;

	var reg = /translate\((\d+)px, (\d+)px\)/gi;
	var matches = reg.exec(tr);
	var curL = parseInt(matches[1]);
	var curT = parseInt(matches[2]);
	if(curT+offsetTop<46||curT+offsetTop>460){
		return;
	}
	if(curL+offsetLeft<46||curL+offsetLeft>460){
		return;
	}
	var newTr = tr.replace(/translate\((\d+)px, (\d+)px\)/gi,'translate\('+(curL+offsetLeft)+'px,'+(curT+offsetTop)+'px)');

	if(arguments.callee.timeout){
		clearTimeout(arguments.callee.timeout);
	}

	sheet.deleteRule(0);
	sheet.insertRule("@-webkit-keyframes translateMove{from{transform:"+tr+";}to{transform:"+newTr+";}",0);

	item.classList.add("translate");
	clickAgain=false;
	arguments.callee.timeout=setTimeout(function(){
		item.classList.remove("translate");
		item.style.transform = newTr;
		clickAgain=true;
	},900);
}
var curAngle = 0;
var dstTrans;
function turnMove(dstAngle,offsetLeft,offsetTop){
	if(curAngle!=dstAngle){
		var curTrans = item.style.transform;
		if(/rotate/.test(curTrans)){
			dstTrans = curTrans.replace(/rotate\(\w+\)/ig,"rotate("+dstAngle+"deg)");
		}
		else{
			dstTrans = curTrans+" rotate("+dstAngle+"deg)";
		}
		sheet.deleteRule(sheet.rules.length-1);
		sheet.insertRule(
			"@-webkit-keyframes rotateMove{from{transform:"+curTrans+")}to{transform:"+dstTrans+"}}"
			,sheet.rules.length);
		item.classList.add("rotate");
		curAngle = dstAngle;
		setTimeout(function(){
			item.classList.remove("rotate");
			if(/rotate/.test(item.style.transform)){
				item.style.transform = item.style.transform.replace(/rotate\(\w+\)/ig,"rotate("+dstAngle+"deg)");
			}
			else{
				item.style.transform+=" rotate("+dstAngle+"deg)";
			}
			slowMove(offsetLeft,offsetTop);
		},900);
	}else{

		slowMove(offsetLeft,offsetTop);
	}
}


