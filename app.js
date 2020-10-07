'use strict';
var form = document.getElementById('form');
var table = document.getElementById('table');
var divices = [];
var header = ['Device name', 'Quantity', 'unitPrice ', 'Category'];

if(localStorage.getItem('mydivice')){
    var addstorage =JSON.parse(localStorage.getItem('mydivice'));
    for(var e =0; e<addstorage.length; e++){
        var saveDivice = new Divice( addstorage[e].name , addstorage[e].category , addstorage[e].quantity);
    }
}

var tr = document.createElement('tr');
table.appendChild(tr);

for (var i = 0; i < header.length; i++) {
    var td = document.createElement('td');
    td.textContent = header[i];
    tr.appendChild(td);
}





function Divice(name, category, quantity) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.max= 750;
    this.min =350;
    this.unitPrice = 0;
    divices.push(this);
}
Divice.prototype.getUnitPrice = function () {
    this.unitPrice = Math.random();
    this.unitPrice = (this.unitPrice * (this.max- this.min + 1) +this.min);
    this.unitPrice = Math.floor(  this.unitPrice);
  
    console.log(this.unitPrice);
}

Divice.prototype.render = function () {
    var tr = document.createElement('tr');
    table.appendChild(tr);

    var td = document.createElement('td');
    td.textContent = this.name;
    tr.appendChild(td);


    var td = document.createElement('td');
    td.textContent = this.category;
    tr.appendChild(td);


    var td = document.createElement('td');
    td.textContent = this.unitPrice;
    tr.appendChild(td);

    var td = document.createElement('td');
    td.textContent = this.quantity;
    tr.appendChild(td);


   


}


form.addEventListener('submit', addDevice);
function addDevice(event) {
    event.preventDefault();

    var addname = event.target.name.value;
    var addquantity = Number(event.target.quantity.value);
    var addcategory = event.target.category.value;
    

    var addDevice = new Divice(addname, addquantity, addcategory);
    addDevice.getUnitPrice();
    addDevice.render();
    total();
localStorage.setItem('mydivice', JSON.stringify(divices));
}

function total(){
    var totaly =0;
    for(var x=0; x <divices.length; x++){
        totaly+=divices[x].unitPrice;
    }
        var p = document.getElementById('totalPrice');
        p.textContent = 'Total : ' +totaly;
}



for (var a = 0; a < divices.length; a++) {
    divices[a].getUnitPrice();
    divices[a].render();
}

total();