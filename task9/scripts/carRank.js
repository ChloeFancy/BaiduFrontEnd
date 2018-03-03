var table = document.querySelector("#carRank table");
var trs = table.getElementsByTagName('tr');

var brands = [{name:"大众"},{name:"丰田"},{name:"奥迪"},{name:"本田"},{name:"大众"},{name:"丰田"},{name:"奥迪"},{name:"本田"},{name:"大众"},{name:"丰田"},{name:"奥迪"},{name:"本田"}];
var no_1 = 45912001;
for(let i=1,len=10;i<len;i++){
	var tr = document.createElement('tr');
	table.appendChild(tr);
	var td0 = document.createElement('td');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	tr.appendChild(td0);
	tr.appendChild(td1);
	tr.appendChild(td2);
	td0.appendChild(document.createTextNode(i));
	td1.appendChild(document.createTextNode(brands[i-1].name));
	var number = document.createElement('div');
	number.style.display = 'inline-block';
	number.appendChild(document.createTextNode(no_1-=3000000));
	td2.appendChild(number);
	var bar = document.createElement('div');
	bar.className = 'bar';
	bar.style.height = '4px';
	bar.style.borderLeftWidth = no_1/48912001*166+'px';
	td2.appendChild(bar);
}
