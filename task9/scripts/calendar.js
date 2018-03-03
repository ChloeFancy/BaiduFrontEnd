var can = document.getElementById('genCalendar');
// can.style.backgroundColor = 'pink';/
for(let i=1;i<=30;i++){
	let item = document.createElement('div');
	item.appendChild(document.createTextNode(i));
	item.className = 'calendarItem';
	can.appendChild(item);
}

